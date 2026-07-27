# Guide Makefile — Reference complete des commandes SICRES

> Toute interaction avec la stack Docker passe par le Makefile.

---

## Commandes essentielles

### Gestion des services

```bash
make up           # Demarrer tous les services
make down         # Arreter les services
make restart      # Redemarrer
make build        # Construire les images
make rebuild      # Reconstruire sans cache (apres modif Dockerfile)
make ps           # Etat des conteneurs
make setup        # Premiere installation complete (a faire 1 fois)
```

### Logs

```bash
make logs         # Logs de tous les services (Ctrl+C pour quitter)
make logs-php     # Logs PHP uniquement
make logs-nginx   # Logs Nginx
make logs-postgres # Logs PostgreSQL
make logs-queue   # Logs du queue worker
```

### Acces shell aux conteneurs

```bash
make shell-php      # bash dans le conteneur PHP
make shell-postgres # psql (interface SQL)
make shell-redis    # redis-cli
make shell-frontend # sh dans Next.js
```

### Laravel — Artisan

```bash
make migrate               # php artisan migrate
make migrate-fresh         # Repart de zero (detruit les donnees !)
make seed                  # php artisan db:seed
make cache-clear           # Vider config + route + view cache
make cache-warm            # Regenerer tous les caches
make test                  # Lancer les tests
make test-coverage         # Tests avec rapport de couverture

# Commande Artisan libre
make artisan CMD="route:list"
make artisan CMD="queue:work"
make artisan CMD="key:generate"
make artisan CMD="model:show User"

# Commande Composer libre
make composer CMD="require package/name"
make composer CMD="dump-autoload"
```

### Base de donnees

```bash
make backup              # Sauvegarder → docker/postgres/backups/
make restore FILE=<nom>  # Restaurer une sauvegarde
make pgadmin             # Demarrer pgAdmin (http://localhost:5050)
```

### Maintenance

```bash
make prune   # Nettoyer images/volumes inutilises
make clean   # Tout supprimer (volumes inclus) — IRREVERSIBLE
```

---

## Exemples courants

```bash
# Voir toutes les routes de l'API
make artisan CMD="route:list --path=api"

# Reinstaller les dependances Composer
make composer CMD="install"

# Creer une migration
make artisan CMD="make:migration create_etablissements_table"

# Creer un controller
make artisan CMD="make:controller EtablissementController --api"

# Lancer un test specifique
make artisan CMD="test --filter=EtablissementTest"

# Connexion directe a la BDD (depuis l'hote)
psql -h localhost -p 5433 -U sicres_user -d sicres_db
```

---

*Guide Makefile SICRES — Juillet 2026*
