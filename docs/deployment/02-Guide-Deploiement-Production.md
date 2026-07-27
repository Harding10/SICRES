# Guide de déploiement production — SICRES

> **Audience :** DevOps, Tech Lead  
> **Prérequis :** Maîtrise de Docker, d'un serveur Linux, et de la CI/CD

---

## Table des matières

1. [Environnements cibles](#1-environnements-cibles)
2. [Checklist pré-déploiement](#2-checklist-pré-déploiement)
3. [Configuration production](#3-configuration-production)
4. [Build des images de production](#4-build-des-images-de-production)
5. [SSL/TLS avec Nginx](#5-ssltls-avec-nginx)
6. [CI/CD GitHub Actions](#6-cicd-github-actions)
7. [Monitoring et logs](#7-monitoring-et-logs)
8. [Sauvegardes automatiques](#8-sauvegardes-automatiques)
9. [Procédure de mise à jour](#9-procédure-de-mise-à-jour)
10. [Rollback](#10-rollback)

---

## 1. Environnements cibles

| Environnement | Branche Git | URL | Déclencheur |
|--------------|-------------|-----|-------------|
| **Développement** | `develop` | `http://localhost` | Manuel |
| **Staging** | `staging` | `https://staging.sicres.gouv.cm` | Push sur `staging` |
| **Production** | `main` | `https://sicres.gouv.cm` | Tag `v*.*.*` |

---

## 2. Checklist pré-déploiement

### Sécurité obligatoire

- [ ] `APP_ENV=production`
- [ ] `APP_DEBUG=false`
- [ ] `APP_KEY` — nouvelle clé unique (jamais celle de dev)
- [ ] `DB_PASSWORD` — mot de passe fort (16+ caractères, mixte)
- [ ] `REDIS_PASSWORD` — mot de passe fort
- [ ] `SESSION_ENCRYPT=true`
- [ ] SSL/TLS configuré (HTTPS obligatoire)
- [ ] `SANCTUM_STATEFUL_DOMAINS` — domaines de production uniquement

### Performance

- [ ] `opcache.validate_timestamps=0` dans `php.ini`
- [ ] Image PHP stage `production` (sans Xdebug)
- [ ] `composer install --no-dev --optimize-autoloader`
- [ ] `php artisan config:cache && route:cache && view:cache`
- [ ] Redis configuré pour la persistance (AOF)

### Réseau

- [ ] Ports 5432 (PostgreSQL) et 6379 (Redis) **non exposés** à l'extérieur
- [ ] Pare-feu configuré (UFW ou iptables)
- [ ] Port 443 ouvert
- [ ] Port 80 redirige vers 443

---

## 3. Configuration production

### `.env` racine (Docker Compose — production)

```dotenv
# APPLICATION
APP_NAME=SICRES
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:<NOUVELLE_CLE_GENEREE>
APP_URL=https://sicres.gouv.cm
FRONTEND_URL=https://sicres.gouv.cm

# PORTS (pas d'exposition directe de BDD en prod)
NGINX_HTTP_PORT=80
NGINX_HTTPS_PORT=443
FRONTEND_PORT=3000
# DB_PORT_EXPOSED=        # ← NE PAS EXPOSER EN PROD
# REDIS_PORT_EXPOSED=     # ← NE PAS EXPOSER EN PROD
MAILPIT_UI_PORT=8025      # ← Bloquer avec pare-feu en prod

# BASE DE DONNÉES
DB_DATABASE=sicres_db
DB_USERNAME=sicres_user
DB_PASSWORD=<MOT_DE_PASSE_FORT_PROD>

# REDIS
REDIS_PASSWORD=<MOT_DE_PASSE_REDIS_PROD>
```

### `backend/.env` production

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:<MEME_CLE_QUE_CI_DESSUS>
APP_URL=https://sicres.gouv.cm
FRONTEND_URL=https://sicres.gouv.cm

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=sicres_db
DB_USERNAME=sicres_user
DB_PASSWORD=<MOT_DE_PASSE_FORT_PROD>

SESSION_DRIVER=redis
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true

CACHE_STORE=redis
QUEUE_CONNECTION=redis

REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PASSWORD=<MOT_DE_PASSE_REDIS_PROD>
REDIS_PORT=6379

# Mail production (remplacer Mailpit par un vrai SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.votrefournisseur.cm
MAIL_PORT=587
MAIL_USERNAME=noreply@sicres.gouv.cm
MAIL_PASSWORD=<MOT_DE_PASSE_SMTP>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@sicres.gouv.cm
MAIL_FROM_NAME="SICRES"

SANCTUM_STATEFUL_DOMAINS=sicres.gouv.cm
```

---

## 4. Build des images de production

### Build manuel

```bash
# Image PHP production (sans Xdebug, avec OPcache optimisé)
docker build \
  --target production \
  -t sicres/php:production \
  -f docker/php/Dockerfile \
  .

# Image Frontend production (standalone Next.js)
docker build \
  --target production \
  --build-arg NEXT_PUBLIC_API_URL=https://sicres.gouv.cm/api \
  -t sicres/frontend:production \
  ./frontend
```

### Build via GitHub Actions (recommandé)

Les workflows sont dans `.github/workflows/`. Voir la section [CI/CD](#6-cicd-github-actions).

---

## 5. SSL/TLS avec Nginx

### Option A — Let's Encrypt (Certbot)

```bash
# Sur le serveur de production
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d sicres.gouv.cm -d www.sicres.gouv.cm \
  --email admin@sicres.gouv.cm --agree-tos --non-interactive

# Renouvellement automatique (déjà configuré par certbot)
sudo certbot renew --dry-run
```

### Option B — Certificat d'entreprise

```bash
# Copier les certificats
cp sicres.gouv.cm.crt docker/nginx/certs/
cp sicres.gouv.cm.key docker/nginx/certs/

# Modifier docker/nginx/default.conf :
```

**Ajouter dans `default.conf` pour HTTPS :**

```nginx
# Redirection HTTP → HTTPS
server {
    listen 80;
    server_name sicres.gouv.cm www.sicres.gouv.cm;
    return 301 https://$server_name$request_uri;
}

# Serveur HTTPS
server {
    listen 443 ssl http2;
    server_name sicres.gouv.cm www.sicres.gouv.cm;

    ssl_certificate     /etc/nginx/certs/sicres.gouv.cm.crt;
    ssl_certificate_key /etc/nginx/certs/sicres.gouv.cm.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # ... reste de la configuration (même que default.conf)
}
```

---

## 6. CI/CD GitHub Actions

### Workflows disponibles

| Fichier | Déclencheur | Action |
|---------|------------|--------|
| `backend-ci.yml` | Push toutes branches | Tests PHPUnit, lint |
| `frontend-ci.yml` | Push toutes branches | Tests Jest, build Next.js |
| `docker.yml` | Push `main`, tags `v*` | Build et push des images Docker |
| `deploy.yml` | Tag `v*.*.*` | Déploiement sur le serveur de prod |

### Secrets GitHub à configurer

Dans `Settings → Secrets and variables → Actions` :

| Secret | Valeur |
|--------|--------|
| `DOCKER_USERNAME` | Nom d'utilisateur Docker Hub / Registry |
| `DOCKER_PASSWORD` | Token Docker Hub / Registry |
| `SSH_PRIVATE_KEY` | Clé SSH pour accéder au serveur de prod |
| `PROD_SERVER_HOST` | IP ou domaine du serveur de production |
| `PROD_SERVER_USER` | Utilisateur SSH |
| `APP_KEY_PROD` | Clé Laravel de production |
| `DB_PASSWORD_PROD` | Mot de passe BDD de production |
| `REDIS_PASSWORD_PROD` | Mot de passe Redis de production |

---

## 7. Monitoring et logs

### Logs applicatifs

```bash
# Logs Laravel (depuis le conteneur PHP)
make shell-php
tail -f storage/logs/laravel.log

# Logs Nginx
make logs-nginx

# Logs PostgreSQL
make logs-postgres

# Tous les logs en temps réel
make logs
```

### Logs PHP-FPM

Les logs PHP-FPM sont dans `/var/log/php-fpm/` dans le conteneur.

```bash
make shell-php
tail -f /var/log/php-fpm/www.access.log
tail -f /var/log/php-fpm/www-slow.log  # Requêtes > 10s
```

### Monitoring avec Docker stats

```bash
# Ressources en temps réel
docker stats

# Résumé par service SICRES
docker stats sicres_php sicres_postgres sicres_redis sicres_nginx
```

### Recommandations outils de monitoring

| Outil | Usage | Coût |
|-------|-------|------|
| **Uptime Kuma** | Monitoring des URLs (self-hosted) | Gratuit |
| **Portainer** | Interface graphique Docker | Gratuit (Community) |
| **Grafana + Prometheus** | Métriques avancées | Gratuit |
| **Sentry** | Suivi des erreurs applicatives | Freemium |

---

## 8. Sauvegardes automatiques

### Script de sauvegarde automatique

Créer `/etc/cron.d/sicres-backup` sur le serveur :

```cron
# Sauvegarde quotidienne à 2h du matin
0 2 * * * root cd /opt/sicres && make backup && \
  find docker/postgres/backups/ -name "backup_*.sql" -mtime +30 -delete

# Sauvegarde hebdomadaire vers stockage distant (S3, FTP, etc.)
0 3 * * 0 root cd /opt/sicres && \
  aws s3 cp docker/postgres/backups/$(ls -t docker/postgres/backups/ | head -1) \
  s3://sicres-backups/weekly/
```

### Politique de rétention recommandée

| Fréquence | Rétention |
|-----------|----------|
| Quotidienne | 30 jours |
| Hebdomadaire | 3 mois |
| Mensuelle | 1 an |

---

## 9. Procédure de mise à jour

### Mise à jour standard (zero-downtime)

```bash
# Sur le serveur de production
cd /opt/sicres

# 1. Tirer la dernière version
git pull origin main

# 2. Construire les nouvelles images
make rebuild

# 3. Appliquer les migrations (sans interrompre les requêtes)
make migrate

# 4. Redémarrer les services un par un
docker compose up -d --no-deps --build php
docker compose up -d --no-deps --build queue
docker compose up -d --no-deps --build nginx
docker compose up -d --no-deps --build frontend

# 5. Vérifier la santé
make ps
```

### Mise à jour avec interruption (si nécessaire)

```bash
# Activer le mode maintenance Laravel
make artisan CMD="down --secret=sicres_maintenance_token"

# Mettre à jour et migrer
git pull && make rebuild && make migrate

# Désactiver le mode maintenance
make artisan CMD="up"
```

---

## 10. Rollback

### Rollback rapide (code)

```bash
# Revenir au commit précédent
git log --oneline -10  # Voir l'historique
git checkout <COMMIT_SHA>

# Reconstruire et redémarrer
make rebuild
docker compose up -d
```

### Rollback de migration

```bash
# Annuler la dernière migration
make artisan CMD="migrate:rollback"

# Annuler N migrations
make artisan CMD="migrate:rollback --step=3"
```

### Rollback de base de données (depuis sauvegarde)

```bash
# ⚠ Arrêter l'application d'abord
make artisan CMD="down"

# Restaurer la sauvegarde
make restore FILE=backup_20260726_020000.sql

# Redémarrer
make artisan CMD="up"
```

---

## Annexe — Commandes Docker utiles en production

```bash
# Voir les ressources consommées
docker stats --no-stream

# Inspecter un conteneur
docker inspect sicres_php

# Exécuter une commande ponctuellement
docker compose exec php php artisan about

# Forcer le recalcul du cache Laravel
docker compose exec php php artisan optimize:clear
docker compose exec php php artisan optimize

# Voir les queues en attente
docker compose exec php php artisan queue:monitor redis:default

# Vider les queues échouées
docker compose exec php php artisan queue:flush
```

---

*Document maintenu par l'équipe DevOps SICRES — Juillet 2026*
