# ADR-004 — Conteneurisation avec Docker et Docker Compose

**Date :** Janvier 2026
**Statut :** Accepte
**Decideurs :** BEH DEGRY JEREMIE HARDING, equipe technique SICRES

---

## Contexte

Le projet SICRES doit fonctionner de maniere identique sur les machines de developpement
de l'equipe et sur les serveurs de production. Des divergences d'environnement
("ca marche sur ma machine") generent des bugs difficiles a reproduire et des delais.

## Options envisagees

| Option | Avantages | Inconvenients |
|--------|-----------|---------------|
| **Docker + Compose** | Portable, reproducible, IaC, ecosysteme riche | Apprentissage initial |
| Vagrant + VirtualBox | VM completes, isolees | Tres lourd (Go de RAM), lent |
| WAMP/LAMP/MAMP local | Simple pour developpeur solo | Non reproductible, conflits de versions |
| Kubernetes | Orchestration avancee, scalabilite | Sur-dimensionne pour ce projet |

## Decision

**Docker avec Docker Compose** est choisi.

**Architecture multi-stage Dockerfile :**
- `base` : Extensions PHP communes
- `development` : + Xdebug, montage de volume du code source
- `production` : Pas de devDependencies, OPcache optimise, image minimale

**Orchestration via `compose.yaml` :**
- 8 services : nginx, php, queue, postgres, redis, mailpit, frontend, pgadmin
- Health checks sur tous les services critiques
- Reseau isole `sicres_network` (172.20.0.0/16)
- Profils Docker (`tools`) pour les services optionnels

**Makefile** comme interface unique :
- `make up` / `make down` / `make migrate` / `make backup`
- Abstrait la complexite Docker pour les developpeurs

## Consequences

- L'environnement est identique en dev et prod
- Un nouveau developpeur est operationnel en 15 minutes (`make setup`)
- Les ports locaux utilises : 80, 443, 3000, 5433 (non 5432), 6379, 8025
- Les secrets restent dans `.env` (non commite)
- L'infrastructure est versionnee avec le code

## Problemes connus et solutions

| Probleme | Cause | Solution |
|----------|-------|---------|
| `port 5432 already in use` | PostgreSQL local installe | Port expose passe a `5433` |
| FPM ne demarre pas | Caracteres UTF-8 dans `www.conf` | Ecrire les configs en ASCII pur |
| Nginx crashe | Commentaires `;` au lieu de `#` | Respecter la syntaxe Nginx |
