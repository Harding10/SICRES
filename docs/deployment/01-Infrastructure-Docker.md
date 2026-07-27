# Infrastructure Docker — SICRES

> **Projet :** Système de Recensement des Établissements Scolaires  
> **Maintainer :** BEH DEGRY JEREMIE HARDING  
> **Dernière mise à jour :** Juillet 2026  
> **Stack :** PHP 8.4 · Laravel 13 · Next.js · PostgreSQL 17 · Redis 7 · Nginx 1.27

---

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Prérequis](#2-prérequis)
3. [Architecture des services](#3-architecture-des-services)
4. [Structure des fichiers Docker](#4-structure-des-fichiers-docker)
5. [Description détaillée de chaque service](#5-description-détaillée-de-chaque-service)
6. [Variables d'environnement](#6-variables-denvironnement)
7. [Volumes et persistance des données](#7-volumes-et-persistance-des-données)
8. [Réseau Docker](#8-réseau-docker)
9. [Health Checks](#9-health-checks)
10. [Commandes Makefile](#10-commandes-makefile)
11. [Sécurité](#11-sécurité)

---

## 1. Vue d'ensemble

L'infrastructure SICRES repose sur **Docker Compose** pour orchestrer un ensemble de services conteneurisés formant un environnement de développement et de production cohérent, reproductible et isolé.

```
┌─────────────────────────────────────────────────────────────────┐
│                     RÉSEAU: sicres_network                      │
│                      (172.20.0.0/16)                            │
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  Nginx   │   │ PHP-FPM  │   │ Queue    │   │ Next.js  │    │
│  │  :80/443 │──▶│  :9000   │   │ Worker   │   │  :3000   │    │
│  └──────────┘   └────┬─────┘   └────┬─────┘   └──────────┘    │
│                      │              │                           │
│          ┌───────────┼──────────────┘                          │
│          │           │                                          │
│  ┌───────▼──┐  ┌─────▼────┐  ┌──────────┐  ┌──────────────┐  │
│  │PostgreSQL│  │  Redis   │  │ Mailpit  │  │   pgAdmin    │  │
│  │  :5432   │  │  :6379   │  │:8025/1025│  │    :5050     │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Ports exposés à l'hôte

| Port | Service | URL |
|------|---------|-----|
| **80** | Nginx → Laravel API | `http://localhost` |
| **3000** | Next.js Frontend | `http://localhost:3000` |
| **8025** | Mailpit (UI emails dev) | `http://localhost:8025` |
| **5432** | PostgreSQL (accès direct) | `localhost:5432` |
| **6379** | Redis (accès direct) | `localhost:6379` |
| **5050** | pgAdmin *(profil tools)* | `http://localhost:5050` |

---

## 2. Prérequis

### Logiciels requis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Docker Engine | 24.x | `docker --version` |
| Docker Compose | 2.x (plugin) | `docker compose version` |
| GNU Make | 4.x | `make --version` |
| Git | 2.x | `git --version` |

### Ressources système recommandées

| Ressource | Développement | Production |
|-----------|--------------|-----------|
| RAM | 4 Go minimum | 8 Go recommandé |
| CPU | 2 cœurs | 4+ cœurs |
| Disque | 10 Go libres | 50 Go recommandé |

### Vérifier que Docker est fonctionnel

```bash
docker run --rm hello-world
```

---

## 3. Architecture des services

### Services et leurs rôles

| Service | Image de base | Rôle | Dépend de |
|---------|--------------|------|-----------|
| `php` | `php:8.4-fpm` (custom) | Backend Laravel + PHP-FPM | postgres, redis |
| `queue` | même image PHP | Worker de files d'attente | php, redis |
| `nginx` | `nginx:1.27-alpine` (custom) | Reverse proxy HTTP | php |
| `frontend` | `node:22-alpine` (custom) | Application Next.js | nginx |
| `postgres` | `postgres:17-alpine` | Base de données principale | — |
| `redis` | `redis:7-alpine` | Cache · Sessions · Queues | — |
| `mailpit` | `axllent/mailpit:latest` | Serveur mail de développement | — |
| `pgadmin` | `dpage/pgadmin4:latest` | Interface graphique PostgreSQL | postgres |

> **Note :** `pgadmin` est désactivé par défaut. Il s'active avec le profil `tools` : `docker compose --profile tools up -d pgadmin`

### Flux de données

```
Requête HTTP
     │
     ▼
  [Nginx :80]
     │
     ├── /api/* ──────────────────▶ [PHP-FPM :9000]
     │                                    │
     │                              ┌─────┴──────┐
     │                              │            │
     │                        [PostgreSQL]    [Redis]
     │                              │            │
     │                         (données)    (cache/session/queue)
     │
     └── /*  ──▶ [Next.js :3000] ──▶ (assets statiques)
```

---

## 4. Structure des fichiers Docker

```
SICRES/
├── compose.yaml                    # Orchestration principale
├── .env                            # Variables Docker Compose (ne pas commiter)
├── Makefile                        # Raccourcis de commandes
│
└── docker/
    ├── nginx/
    │   ├── Dockerfile              # Image Nginx personnalisée
    │   ├── nginx.conf              # Configuration principale Nginx
    │   └── default.conf            # Virtual host SICRES
    │
    ├── php/
    │   ├── Dockerfile              # Multi-stage : base → dev → prod
    │   ├── entrypoint.sh           # Script de démarrage automatisé
    │   ├── php.ini                 # Configuration PHP
    │   └── www.conf                # Pool PHP-FPM
    │
    ├── postgres/
    │   ├── init.sql                # Initialisation BDD (extensions, ENUMs)
    │   ├── conf/                   # Configurations PostgreSQL avancées
    │   └── backups/                # Sauvegardes de la base de données
    │
    └── mailpit/                    # (répertoire réservé)
```

---

## 5. Description détaillée de chaque service

### 5.1 Service `php` — Backend Laravel

**Image :** `php:8.4-fpm` personnalisée avec multi-stage build.

**Stages disponibles :**
- `base` — Extensions PHP communes (pdo_pgsql, redis, gd, opcache...)
- `development` — Ajout de **Xdebug** (port 9003), hot-reload via volumes
- `production` — Dépendances Composer sans devDependencies, cache optimisé

**Extensions PHP installées :**

| Extension | Rôle |
|-----------|------|
| `pdo_pgsql` | Connexion PostgreSQL |
| `redis` | Client Redis (PECL) |
| `mbstring` | Encodage multi-byte (UTF-8) |
| `intl` | Internationalisation |
| `gd` | Manipulation d'images |
| `opcache` | Cache bytecode PHP |
| `bcmath` | Calculs arithmétiques précis |
| `pcntl` | Contrôle de processus (queues) |
| `zip` | Gestion des archives |
| `xml` | Traitement XML |
| `xdebug` | Débogage *(dev uniquement)* |

**Volumes montés :**
```yaml
- ./backend:/var/www/html          # Code source (développement)
- ./docker/php/php.ini:/usr/local/etc/php/conf.d/custom.ini
- ./docker/php/www.conf:/usr/local/etc/php-fpm.d/www.conf
- php_storage:/var/www/html/storage
```

---

### 5.2 Service `queue` — Worker Laravel

Service dédié à l'exécution des jobs Laravel en arrière-plan.

**Commande exécutée :**
```bash
php artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
```

**Paramètres :**
- `--sleep=3` : attend 3s si la file est vide (économise les ressources)
- `--tries=3` : 3 tentatives avant de marquer un job comme échoué
- `--max-time=3600` : le worker se recycle toutes les heures (anti-fuite mémoire)

---

### 5.3 Service `nginx` — Reverse Proxy

**Fonctionnalités configurées :**

| Fonctionnalité | Configuration |
|---------------|--------------|
| **Rate limiting API** | 60 requêtes/minute par IP |
| **Rate limiting Auth** | 10 requêtes/minute sur `/api/login`, `/api/register` |
| **Gzip** | Activé, niveau 6, pour JS/CSS/JSON/SVG/fonts |
| **Headers sécurité** | X-Frame-Options, CSP, HSTS, X-XSS-Protection |
| **Cache navigateur** | 30 jours pour les assets statiques |
| **CORS** | Géré par headers Nginx + Laravel Sanctum |
| **Timeout FastCGI** | 180s (pour les imports longs) |
| **Upload max** | 100 Mo |

**Routes Nginx :**
```
/health          → Healthcheck (retourne 200 OK)
/api/*           → FastCGI → PHP-FPM (rate limited: 60/min)
/api/login       → FastCGI → PHP-FPM (rate limited: 10/min)
/api/register    → FastCGI → PHP-FPM (rate limited: 10/min)
/*.php           → FastCGI → PHP-FPM
/assets/*        → Fichiers statiques (cache 30j)
/*               → Fallback Laravel (try_files)
```

---

### 5.4 Service `postgres` — Base de données

**Image :** `postgres:17-alpine` (version LTS, image minimale).

**Extensions PostgreSQL activées (via `init.sql`) :**

| Extension | Utilisation |
|-----------|-------------|
| `uuid-ossp` | Génération d'UUID (clés primaires Laravel) |
| `unaccent` | Recherche textuelle sans accents (noms d'établissements) |
| `pgcrypto` | Chiffrement et génération de tokens sécurisés |
| `pg_stat_statements` | Analyse des performances des requêtes |

**Types ENUM personnalisés :**

```sql
declaration_status  -- brouillon, soumis, en_revision, validé, rejeté, archivé
etablissement_type  -- primaire, secondaire_général, technique, supérieur...
etablissement_secteur -- public, privé_laïc, privé_confessionnel
user_status         -- actif, inactif, suspendu, en_attente
```

**Configuration :**
- Encodage : `UTF8`
- Locale : `fr_FR.UTF-8`
- Volume persistant : `postgres_data`
- Sauvegardes : `docker/postgres/backups/`

---

### 5.5 Service `redis` — Cache & Queues & Sessions

**Commande Redis :**
```
redis-server --requirepass <PASSWORD> --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
```

**Paramètres :**
- `--appendonly yes` : persistance des données (AOF)
- `--maxmemory 256mb` : limite mémoire Redis
- `--maxmemory-policy allkeys-lru` : éviction LRU (Least Recently Used) quand la mémoire est pleine

**Usages dans Laravel :**
- `CACHE_STORE=redis` → Cache applicatif
- `SESSION_DRIVER=redis` → Sessions utilisateurs (scalable)
- `QUEUE_CONNECTION=redis` → Files d'attente des jobs

---

### 5.6 Service `mailpit` — Mail de développement

**Interface web :** `http://localhost:8025`  
**SMTP :** `mailpit:1025` (depuis les conteneurs)

Mailpit intercepte tous les emails envoyés par Laravel et les affiche dans une interface web. **Aucun email n'est envoyé réellement vers l'extérieur.**

---

### 5.7 Service `php` — entrypoint.sh

Le script `entrypoint.sh` automatise le démarrage du backend en séquence :

```
1. Vérification du fichier .env
2. Attente de PostgreSQL (30 tentatives, 2s d'intervalle)
3. Installation Composer si /vendor absent
4. Génération APP_KEY si absente
5. Exécution des migrations (php artisan migrate --force)
6. Génération des caches (config, routes, views)
7. Création du lien symbolique storage
8. Configuration des permissions (www-data)
9. Démarrage PHP-FPM
```

---

## 6. Variables d'environnement

### Fichier `.env` racine (Docker Compose)

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `NGINX_HTTP_PORT` | `80` | Port HTTP Nginx sur l'hôte |
| `NGINX_HTTPS_PORT` | `443` | Port HTTPS Nginx sur l'hôte |
| `FRONTEND_PORT` | `3000` | Port Next.js sur l'hôte |
| `DB_PORT_EXPOSED` | `5432` | Port PostgreSQL sur l'hôte |
| `REDIS_PORT_EXPOSED` | `6379` | Port Redis sur l'hôte |
| `MAILPIT_UI_PORT` | `8025` | Port interface Mailpit |
| `MAILPIT_SMTP_PORT` | `1025` | Port SMTP Mailpit |
| `PGADMIN_PORT` | `5050` | Port pgAdmin |
| `DB_DATABASE` | `sicres_db` | Nom de la base de données |
| `DB_USERNAME` | `sicres_user` | Utilisateur PostgreSQL |
| `DB_PASSWORD` | *(à définir)* | Mot de passe PostgreSQL |
| `REDIS_PASSWORD` | *(à définir)* | Mot de passe Redis |

### Fichier `backend/.env` (Laravel)

> Identique au `.env` standard Laravel, mais les **hostnames** pointent vers les services Docker :

| Variable Laravel | Valeur Docker | Explication |
|-----------------|---------------|-------------|
| `DB_HOST` | `postgres` | Nom du service Docker |
| `REDIS_HOST` | `redis` | Nom du service Docker |
| `MAIL_HOST` | `mailpit` | Nom du service Docker |
| `MAIL_PORT` | `1025` | Port SMTP Mailpit |
| `SESSION_DRIVER` | `redis` | Sessions via Redis |
| `CACHE_STORE` | `redis` | Cache via Redis |
| `QUEUE_CONNECTION` | `redis` | Queues via Redis |

> ⚠️ **Si vous exécutez Artisan en dehors de Docker** (depuis votre machine locale), remplacez temporairement `DB_HOST=postgres` par `DB_HOST=127.0.0.1`.

---

## 7. Volumes et persistance des données

```yaml
volumes:
  postgres_data:    # Données PostgreSQL (persistantes même après down)
  redis_data:       # Données Redis (AOF activé)
  php_storage:      # Storage Laravel (uploads, logs, cache framework)
  nginx_logs:       # Logs d'accès et d'erreurs Nginx
  pgadmin_data:     # Configuration pgAdmin
```

### Sauvegardes PostgreSQL

```bash
# Sauvegarder
make backup
# → docker/postgres/backups/backup_YYYYMMDD_HHMMSS.sql

# Restaurer
make restore FILE=backup_20260726_120000.sql
```

---

## 8. Réseau Docker

Tous les services partagent le réseau bridge `sicres_network` avec le sous-réseau `172.20.0.0/16`.

**Avantages :**
- Les services communiquent par **nom de service** (ex: `postgres`, `redis`, `php`)
- Isolation complète du réseau hôte
- Pas de collision avec d'autres réseaux Docker

**Communication entre services :**
```
nginx     → php      : FastCGI (port 9000)
php       → postgres : TCP (port 5432)
php       → redis    : TCP (port 6379)
php       → mailpit  : SMTP (port 1025)
queue     → redis    : TCP (port 6379)
pgadmin   → postgres : TCP (port 5432)
```

---

## 9. Health Checks

Chaque service critique dispose d'un health check Docker :

| Service | Commande de vérification | Intervalle | Retries |
|---------|--------------------------|-----------|---------|
| `postgres` | `pg_isready -U <user> -d <db>` | 10s | 5 |
| `redis` | `redis-cli ping` | 10s | 5 |
| `php` | `php-fpm -t` | 30s | 3 |
| `nginx` | `nginx -t` | 30s | 3 |
| `frontend` | `wget http://localhost:3000` | 30s | 3 |

**Vérifier la santé des services :**
```bash
docker compose ps
# Colonne STATUS → "healthy" = OK, "unhealthy" = problème
```

---

## 10. Commandes Makefile

```bash
# ── SERVICES ──────────────────────────────────────────────────────
make up               # Démarrer tous les services
make down             # Arrêter tous les services
make restart          # Redémarrer
make build            # Construire les images
make rebuild          # Reconstruire sans cache
make ps               # Voir l'état des conteneurs

# ── LOGS ──────────────────────────────────────────────────────────
make logs             # Logs de tous les services (temps réel)
make logs-php         # Logs PHP uniquement
make logs-nginx       # Logs Nginx uniquement
make logs-postgres    # Logs PostgreSQL uniquement

# ── ACCÈS SHELL ───────────────────────────────────────────────────
make shell-php        # Ouvrir bash dans le conteneur PHP
make shell-postgres   # Ouvrir psql
make shell-redis      # Ouvrir redis-cli
make shell-frontend   # Ouvrir sh dans Next.js

# ── LARAVEL ───────────────────────────────────────────────────────
make migrate          # php artisan migrate
make migrate-fresh    # php artisan migrate:fresh --seed (⚠ supprime données)
make seed             # php artisan db:seed
make test             # php artisan test
make test-coverage    # php artisan test --coverage
make cache-clear      # Vider config + route + view cache
make cache-warm       # Regénérer config + route + view cache
make artisan CMD="route:list"     # Commande Artisan custom
make composer CMD="require pkg"   # Commande Composer custom

# ── BASE DE DONNÉES ───────────────────────────────────────────────
make backup           # Sauvegarder PostgreSQL → docker/postgres/backups/
make restore FILE=x   # Restaurer depuis une sauvegarde

# ── OUTILS ────────────────────────────────────────────────────────
make pgadmin          # Démarrer pgAdmin (http://localhost:5050)
make clean            # ⚠ Tout supprimer (volumes inclus)
make prune            # Nettoyer les ressources Docker inutilisées
```

---

## 11. Sécurité

### En développement ✅

- Les secrets sont dans `.env` (non commité)
- Rate limiting activé sur l'API
- Headers de sécurité HTTP configurés dans Nginx
- Les fonctions PHP dangereuses désactivées dans `www.conf`
- Réseau Docker isolé

### Avant de passer en production ⚠️

- [ ] Changer **tous** les mots de passe du `.env`
- [ ] Générer une nouvelle `APP_KEY` : `make artisan CMD="key:generate"`
- [ ] Passer `APP_DEBUG=false` et `APP_ENV=production`
- [ ] Configurer SSL/TLS (Let's Encrypt ou certificat d'entreprise) dans Nginx
- [ ] Passer `opcache.validate_timestamps=0` dans `php.ini`
- [ ] Désactiver Xdebug (automatique avec le stage `production`)
- [ ] Restreindre les ports exposés (ne pas exposer 5432 et 6379 en prod)
- [ ] Configurer les sauvegardes automatiques PostgreSQL
- [ ] Mettre en place la rotation des logs Nginx

### Fichiers à ne jamais commiter

```
.env                    # Variables Docker Compose
backend/.env            # Variables Laravel
docker/postgres/backups/  # Données sensibles
```

---

*Documentation générée par l'équipe technique SICRES — Juillet 2026*
