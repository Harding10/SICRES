# 04 — Architecture Docker

> **Mise a jour :** Juillet 2026
> **Fichier principal :** `compose.yaml` a la racine du projet

---

## Vue d'ensemble

L'environnement SICRES repose sur **8 services Docker** orchestres par Docker Compose.
Cette architecture garantit une isolation, une reproductibilite et une parité parfaite entre
les environnements de developpement, de recette et de production.

---

## Cartographie des services

```
                        RESEAU INTERNE Docker (sicres_network)
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌──────────┐   :9000   ┌──────────┐              ┌─────────────┐ │
│   │  Nginx   │◄─────────►│  PHP-FPM │◄────────────►│ PostgreSQL  │ │
│   │  :80/443 │           │ (Laravel) │              │  (sicresdb) │ │
│   └──────────┘           └──────────┘              └─────────────┘ │
│        │                      │                                     │
│        │                      ▼                                     │
│        │               ┌──────────┐              ┌─────────────┐   │
│        │               │  Redis   │◄─────────────│Queue Worker │   │
│        │               │  :6379   │              │  (Laravel)  │   │
│        │               └──────────┘              └─────────────┘   │
│        │                                                            │
│        ▼               ┌──────────┐              ┌─────────────┐   │
│   ┌──────────┐         │ Mailpit  │              │  Frontend   │   │
│   │ Frontend │         │  :8025   │              │  (Next.js)  │   │
│   │ (Next.js)│         └──────────┘              │  :3000      │   │
│   └──────────┘                                   └─────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

PORTS EXPOSES SUR L'HOTE:
  :80    → Nginx (HTTP)
  :443   → Nginx (HTTPS)
  :3000  → Next.js (dev direct)
  :5433  → PostgreSQL (dev — hote:5433 → conteneur:5432)
  :6379  → Redis
  :8025  → Mailpit (interface web)
```

---

## Description des services

### 1. `nginx` — Reverse Proxy
| Parametre | Valeur |
|-----------|--------|
| Image | `nginx:1.25-alpine` |
| Ports | `80:80`, `443:443` |
| Volumes | `docker/nginx/nginx.conf`, `docker/nginx/default.conf` |
| Role | Point d'entree unique. Route `/api/*` vers PHP-FPM, `/*` vers Next.js |
| Config | Voir `docker/nginx/default.conf` (ASCII pur obligatoire) |

### 2. `php` — Backend Laravel
| Parametre | Valeur |
|-----------|--------|
| Image | `docker/php/Dockerfile` (multi-stage: base / dev) |
| Port interne | `9000` (PHP-FPM) |
| Volumes | `./backend:/var/www/html` |
| Role | Moteur PHP, traite les requetes API via FastCGI |
| Entrypoint | `docker/php/entrypoint.sh` (migrations auto, permissions) |
| Config | `php.ini`, `www.conf` (ASCII pur obligatoire) |

### 3. `postgres` — Base de donnees
| Parametre | Valeur |
|-----------|--------|
| Image | `postgres:17-alpine` |
| Port expose | `5433:5432` (5433 pour eviter conflit avec PostgreSQL local) |
| Volume | `postgres_data` (persistance) |
| Variables | `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` (depuis `.env`) |

### 4. `redis` — Cache / Sessions / Queues
| Parametre | Valeur |
|-----------|--------|
| Image | `redis:7-alpine` |
| Port | `6379:6379` |
| Role | Cache applicatif, sessions Laravel, driver des queues |
| Persistence | `redis_data` (RDB + AOF) |

### 5. `queue` — Worker de files d'attente
| Parametre | Valeur |
|-----------|--------|
| Image | Meme que `php` |
| Commande | `php artisan queue:work --sleep=3 --tries=3` |
| Role | Traite les jobs asynchrones (emails, exports, notifications) |
| Dependance | Demarre apres `php` et `redis` |

### 6. `mailpit` — Serveur de mails de developpement
| Parametre | Valeur |
|-----------|--------|
| Image | `axllent/mailpit:latest` |
| Ports | `8025:8025` (UI web), `1025:1025` (SMTP) |
| Role | Capture tous les emails Laravel. Interface web sur `:8025` |

### 7. `frontend` — Interface Next.js
| Parametre | Valeur |
|-----------|--------|
| Image | `frontend/Dockerfile` |
| Port | `3000:3000` |
| Volumes | `./frontend:/app` (hot reload en dev) |
| Variables | `NEXT_PUBLIC_API_URL`, `WATCHPACK_POLLING=true` |

### 8. `scheduler` (optionnel)
| Parametre | Valeur |
|-----------|--------|
| Image | Meme que `php` |
| Commande | `php artisan schedule:work` |
| Role | Execute les taches planifiees Laravel (cron interne) |

---

## Volumes persistants

```yaml
volumes:
  postgres_data:    # Donnees PostgreSQL
  redis_data:       # Donnees Redis
  vendor_data:      # Dependances Composer (optimisation)
  node_modules:     # Dependances npm (optimisation)
```

---

## Reseaux

```yaml
networks:
  sicres_network:
    driver: bridge
```

Tous les services sont sur le meme reseau interne `sicres_network`.
La communication se fait par **nom de service** (ex: PHP se connecte a `postgres:5432`).

---

## Dockerfile — Multi-stage (PHP)

```
docker/php/Dockerfile
┌─────────────────────────────────────────┐
│  STAGE: base                            │
│  - php:8.3-fpm-alpine                   │
│  - Extensions PHP (pdo_pgsql, redis...) │
│  - Composer                             │
│  - Permissions utilisateur              │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  STAGE: dev (default)                   │
│  - Installe Xdebug                      │
│  - php.ini developpement                │
│  - Toutes les dependances Composer      │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  STAGE: prod (Dockerfile.prod)          │
│  - Pas de Xdebug                        │
│  - OPcache optimise (preload)           │
│  - Dependances prod uniquement          │
│  - Image minimale                       │
└─────────────────────────────────────────┘
```

---

## Variables d'environnement cles

```bash
# Fichier racine: .env (copie de .env.example)
COMPOSE_PROJECT_NAME=sicres

# PostgreSQL
POSTGRES_DB=sicres_db
POSTGRES_USER=sicres
POSTGRES_PASSWORD=secret
DB_PORT=5433          # Port expose sur l'hote

# Laravel
APP_KEY=base64:...
APP_ENV=local
APP_DEBUG=true

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Mail (Mailpit)
MAIL_HOST=mailpit
MAIL_PORT=1025
```

---

## Regles absolues — ASCII dans les configs

> **AVERTISSEMENT CRITIQUE**
>
> Les fichiers de configuration `docker/php/www.conf`, `docker/php/php.ini`,
> `docker/nginx/nginx.conf` et `docker/nginx/default.conf` doivent etre
> **en ASCII pur** (pas de caracteres accentues, pas de tirets speciaux).
>
> - PHP-FPM crash au demarrage si un caractere UTF-8 est present.
> - Nginx retourne `unexpected ";"` si les commentaires ne sont pas `#`.

---

## Commandes de gestion (via Makefile)

```bash
make up              # Demarrer tous les services
make down            # Arreter tous les services
make ps              # Voir l'etat des conteneurs
make logs            # Voir tous les logs
make logs-php        # Logs PHP uniquement
make logs-nginx      # Logs Nginx uniquement
make logs-queue      # Logs Queue worker
make build           # Rebuilder les images
make rebuild         # Arreter + Rebuilder + Demarrer
make shell           # Shell dans le conteneur PHP
make artisan CMD=... # Executer une commande Artisan
```

---

*Architecture Docker SICRES — 8 services — Juillet 2026*
