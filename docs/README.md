# Documentation SICRES

> **Systeme d'Information de Collecte et de Reporting des Etablissements de Sante**
> Stack : Laravel 13 (PHP 8.3) + Next.js 14 + PostgreSQL 17 + Docker

---

## Demarrage rapide

```bash
# 1. Cloner le depot
git clone <url_du_depot> && cd SICRES

# 2. Configurer l'environnement
cp .env.example .env
# Editer .env avec vos valeurs

# 3. Lancer l'environnement complet
make setup              # Build + Migrations + Seeders

# 4. Verifier que tout tourne
make ps                 # Tous les services doivent etre "healthy"
```

**Acces locaux :**
| Service | URL |
|---------|-----|
| Application web | http://localhost |
| API Laravel | http://localhost/api |
| Mailpit (emails) | http://localhost:8025 |
| Frontend direct | http://localhost:3000 |

---

## Index de la documentation

### Guides developpeur

| Fichier | Description |
|---------|-------------|
| [01 — Guide Developpeur](guides/01-Guide-Developpeur.md) | Onboarding complet : installation, workflow, commandes |
| [02 — Guide Makefile](guides/02-Guide-Makefile.md) | Reference de toutes les commandes `make` disponibles |
| [03 — Guide Sanctum](guides/03-Guide-API-Sanctum.md) | Authentification SPA avec Laravel Sanctum (CSRF + sessions) |
| [04 — Guide Tests](guides/04-Guide-Tests.md) | Tests PHPUnit (backend) et Jest/Testing Library (frontend) |

---

### Architecture technique

| Fichier | Description |
|---------|-------------|
| [01 — Vue d'ensemble](architecture/01-Vue-d-ensemble.md) | Architecture globale, flux de requetes, decisions cles |
| [02 — Backend Laravel](architecture/02-Architecture-backend.md) | Modules, Service/Repository/DTO, securite, queues |
| [03 — Frontend Next.js](architecture/03-Architecture-frontend.md) | Structure features, client HTTP, gestion etat, SSR |
| [04 — Infrastructure Docker](architecture/04-Architecture-docker.md) | 8 services, reseaux, volumes, variables d'env |
| [05 — Structure dossiers](architecture/05-Structure-des-dossiers.md) | Arborescence complete du projet |
| [06 — Conventions dev](architecture/06-Conventions-de-developpement.md) | Nommage, git flow, standards de code |
| [07 — Decisions techniques](architecture/07-Decisions-techniques.md) | Tableau recapitulatif des choix technologiques |

---

### Base de donnees

| Fichier | Description |
|---------|-------------|
| [03 — MCD](03-MCD.md) | Modele Conceptuel de Donnees (entites, attributs, relations) |
| [04 — Schema Relationnel](04-SchemaRelationnel.md) | Schema SQL PostgreSQL complet (tables, index, contraintes) |

---

### API

| Fichier | Description |
|---------|-------------|
| [06 — Reference API](06-API.md) | Endpoints REST : Auth, Etablissements, Declarations |
| [api/](api/) | Documentation OpenAPI / Swagger (a venir) |

---

### Decisions d'architecture (ADR)

| Fichier | Decision |
|---------|---------|
| [ADR-001 Laravel](adr/ADR-001-Laravel.md) | Choix de Laravel comme framework backend |
| [ADR-002 Next.js](adr/ADR-002-NextJS.md) | Choix de Next.js comme framework frontend |
| [ADR-003 PostgreSQL](adr/ADR-003-PostgreSQL.md) | Choix de PostgreSQL comme SGBD |
| [ADR-004 Docker](adr/ADR-004-Docker.md) | Containerisation avec Docker Compose |
| [ADR-005 REST](adr/ADR-005-REST.md) | Architecture API REST |
| [ADR-006 Modulaire](adr/ADR-006-Architecture-Modulaire.md) | Architecture modulaire feature-based |

---

### Deploiement

| Fichier | Description |
|---------|-------------|
| [01 — Infrastructure Docker](deployment/01-Infrastructure-Docker.md) | Specification complete de l'infrastructure |
| [02 — Guide Production](deployment/02-Guide-Deploiement-Production.md) | Checklist et guide de mise en production |

---

### Standards

| Fichier | Description |
|---------|-------------|
| [CODING-STANDARDS.md](CODING-STANDARDS.md) | Regles de code (SOLID, DRY, conventions) |

---

### Journal & Suivi

| Fichier | Description |
|---------|-------------|
| [07 — Journal du jour](07-TODAY.md) | Etat operationnel, bugs corriges, prochaines etapes |
| [meeting-notes/](meeting-notes/) | Comptes-rendus de reunions |
| [reports/](reports/) | Rapports de sprint |

---

## Etat de la stack

| Service | Statut | Port |
|---------|--------|------|
| Nginx | Healthy | :80 / :443 |
| PHP-FPM (Laravel) | Healthy | :9000 |
| PostgreSQL 17 | Healthy | :5433 |
| Redis 7 | Healthy | :6379 |
| Queue Worker | Up | — |
| Mailpit | Healthy | :8025 |
| Next.js Frontend | Up | :3000 |

```bash
make ps   # Verifier l'etat en temps reel
```

---

## Architecture en un coup d'oeil

```
                     INTERNET
                        │
                   [ Nginx :80 ]
                   /           \
          /api/*               /*
            │                   │
     [ PHP-FPM :9000 ]    [ Next.js :3000 ]
     ( Laravel 13 )
            │
    ┌───────┼───────┐
    │       │       │
[PostgreSQL] [Redis] [Mailpit]
```

---

## Regles critiques

> **Ne JAMAIS** introduire de caracteres accentues ou speciaux dans les
> fichiers `.conf`, `.ini` sous `docker/` — PHP-FPM et Nginx crashent.
> Tous les fichiers de config doivent etre en **ASCII pur**.

---

## Ressources externes

- [Documentation Laravel 11](https://laravel.com/docs/11.x)
- [Documentation Next.js 14](https://nextjs.org/docs)
- [Laravel Sanctum (SPA Auth)](https://laravel.com/docs/sanctum#spa-authentication)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [PostgreSQL 17 Docs](https://www.postgresql.org/docs/17/)

---

*Documentation SICRES — mise a jour le 26 juillet 2026*
