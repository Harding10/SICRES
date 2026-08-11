# SICRES

SICRES est une application web composée d’un frontend Next.js et d’un backend Laravel avec base de données PostgreSQL.

## Structure du projet

- frontend : interface utilisateur Next.js
- backend : API Laravel
- docker : environnement de développement avec PostgreSQL, Redis, Nginx, Mailpit

## Prérequis

- Docker
- Docker Compose
- Node.js 22+
- Composer 2+

## Démarrage rapide

```bash
docker compose up -d --build
```

## URLs principales

- Frontend : http://localhost:3000
- Backend : http://localhost:8100
- API login : http://localhost:8100/api/login
- Mailpit : http://localhost:8027

## Authentification

La page de connexion se trouve dans [frontend/app/login/page.tsx](frontend/app/login/page.tsx).

Le flux principal est décrit dans [docs/authentification-login.md](docs/authentification-login.md).

## Commandes utiles

```bash
docker compose ps
docker compose logs -f php
docker compose exec postgres psql -U sicres_user -d sicres_db
```

## Documentation

- [docs/authentification-login.md](docs/authentification-login.md)
- [docs/06-API.md](docs/06-API.md)

