# Etat du projet — SICRES (Juillet 2026)

> Mise a jour automatique — dernier etat connu de la stack

---

## Stack operationnelle

| Service | Statut | Port | Details |
|---------|--------|------|---------|
| Nginx | Healthy | :80 / :443 | Reverse proxy operationnel |
| PHP-FPM (Laravel) | Healthy | :9000 | API Laravel accessible |
| Queue Worker | Up | — | Jobs Redis traites |
| PostgreSQL 17 | Healthy | :5433 | Connexions acceptees |
| Redis 7 | Healthy | :6379 | Cache/Sessions/Queues OK |
| Mailpit | Healthy | :8025 | Capture emails dev |
| Next.js Frontend | Up | :3000 | Interface accessible |

**Commande de verification :**
```bash
make ps
docker compose ps
```

---

## Bugs corriges (session du 26 juillet 2026)

### Probleme 1 — PHP-FPM ne demarrait pas
- **Symptome :** `FPM initialization failed` au demarrage du conteneur PHP
- **Cause :** Caracteres UTF-8 (`—`, `e` accentue) dans `docker/php/www.conf`
  PHP-FPM n'accepte que l'ASCII pur dans ses fichiers de configuration
- **Correction :** Reedition de `www.conf` et `php.ini` en ASCII pur

### Probleme 2 — Nginx crashait en boucle
- **Symptome :** `unexpected ";" in nginx.conf:1` — Nginx en boucle `Restarting`
- **Cause :** Commentaires avec `;` (syntaxe INI/PHP) au lieu de `#` (syntaxe Nginx)
- **Correction :** Remplacement de tous les `;` de tete par `#` dans `nginx.conf` et `default.conf`

### Probleme 3 — Port PostgreSQL en conflit
- **Symptome :** `port 5432 already in use`
- **Cause :** PostgreSQL installe localement sur la machine hote
- **Correction :** Port expose passe de `5432` a `5433` dans `compose.yaml` et `.env`

---

## Fichiers cles de l'infrastructure

```
SICRES/
├── compose.yaml              # Orchestration Docker (8 services)
├── Makefile                  # 30+ commandes de gestion
├── .env.example              # Template des variables d'environnement
│
├── docker/
│   ├── php/
│   │   ├── Dockerfile        # Multi-stage: base / dev / prod
│   │   ├── Dockerfile.prod   # Build production autonome
│   │   ├── entrypoint.sh     # Startup automatise (migrations, cache...)
│   │   ├── php.ini           # Config PHP (ASCII pur)
│   │   └── www.conf          # Pool PHP-FPM (ASCII pur)
│   │
│   └── nginx/
│       ├── nginx.conf        # Config principale Nginx
│       └── default.conf      # Virtual host SICRES
│
└── docs/                     # Documentation complete
```

---

## Prochaines etapes

- [ ] Implementer les modules metier Laravel (Etablissement, Declaration, User)
- [ ] Connecter le frontend Next.js a l'API (`NEXT_PUBLIC_API_URL`)
- [ ] Configurer SSL en production (Let's Encrypt)
- [ ] Mettre en place le pipeline CI/CD (GitHub Actions)
- [ ] Ecrire les tests PHPUnit pour les modules metier
- [ ] Documenter le schema de base de donnees dans `04-SchemaRelationnel.md`

---

*Journal de bord SICRES — mis a jour le 26 juillet 2026*