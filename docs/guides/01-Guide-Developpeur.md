# Guide de démarrage développeur — SICRES

> **Pour :** Tout nouveau développeur rejoignant le projet  
> **Temps estimé :** 15 à 30 minutes pour la première installation

---

## Table des matières

1. [Prérequis](#1-prérequis)
2. [Installation initiale](#2-installation-initiale)
3. [Démarrage au quotidien](#3-démarrage-au-quotidien)
4. [Travailler sur le backend Laravel](#4-travailler-sur-le-backend-laravel)
5. [Travailler sur le frontend Next.js](#5-travailler-sur-le-frontend-nextjs)
6. [Débogage avec Xdebug](#6-débogage-avec-xdebug)
7. [Gestion de la base de données](#7-gestion-de-la-base-de-données)
8. [Emails de développement](#8-emails-de-développement)
9. [Problèmes fréquents (FAQ)](#9-problèmes-fréquents-faq)

---

## 1. Prérequis

Assurez-vous d'avoir installé sur votre machine :

```bash
# Vérifier Docker
docker --version
# → Docker version 24.x ou supérieur

# Vérifier Docker Compose (plugin intégré)
docker compose version
# → Docker Compose version v2.x ou supérieur

# Vérifier Make
make --version
# → GNU Make 4.x ou supérieur
```

**Installation Docker (si absent) :**
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | bash
sudo usermod -aG docker $USER
newgrp docker  # ou déconnecter/reconnecter
```

---

## 2. Installation initiale

### Étape 1 — Cloner le dépôt

```bash
git clone <URL_DU_DEPOT_GIT>
cd SICRES
```

### Étape 2 — Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer les valeurs (mots de passe, etc.)
nano .env
```

> Les variables importantes à vérifier dans `.env` :
> ```dotenv
> DB_PASSWORD=VotreMotDePasseSecurisé
> REDIS_PASSWORD=VotreMotDePasseRedis
> ```

### Étape 3 — Construire et démarrer les services

```bash
# Construire les images Docker (première fois uniquement)
make build

# Démarrer tous les services
make up
```

> La première construction peut prendre **5 à 10 minutes** (téléchargement des images, compilation des extensions PHP).

### Étape 4 — Vérifier que tout fonctionne

```bash
# Voir l'état des conteneurs (tous doivent être "healthy" ou "running")
make ps
```

Résultat attendu :
```
NAME               STATUS          PORTS
sicres_postgres    healthy         0.0.0.0:5432->5432/tcp
sicres_redis       healthy         0.0.0.0:6379->6379/tcp
sicres_php         healthy         9000/tcp
sicres_nginx       running         0.0.0.0:80->80/tcp
sicres_frontend    running         0.0.0.0:3000->3000/tcp
sicres_queue       running
sicres_mailpit     running         0.0.0.0:8025->8025/tcp
```

### Étape 5 — Services disponibles

| Service | URL |
|---------|-----|
| 🌐 API Backend | http://localhost/api |
| 🖥️ Frontend Next.js | http://localhost:3000 |
| 📧 Interface emails | http://localhost:8025 |
| 🗄️ pgAdmin (optionnel) | `make pgadmin` → http://localhost:5050 |

---

## 3. Démarrage au quotidien

```bash
# Démarrer le projet (le matin)
make up

# Voir les logs en temps réel
make logs

# Arrêter le projet (le soir)
make down
```

> Les données PostgreSQL et Redis sont **persistées dans des volumes Docker**. Elles survivent aux `make down` / `make up`.

---

## 4. Travailler sur le backend Laravel

### Code source

Le code Laravel est dans `backend/`. Il est **monté en volume** dans le conteneur PHP : toute modification de fichier est immédiatement visible dans Docker.

```bash
# Ouvrir un shell dans le conteneur PHP
make shell-php

# Depuis ce shell, vous pouvez utiliser artisan directement :
php artisan route:list
php artisan make:controller MonController
exit
```

### Commandes Artisan courantes

```bash
# Depuis votre terminal hôte (via Makefile) :
make artisan CMD="route:list"
make artisan CMD="make:model Etablissement -mcr"
make artisan CMD="make:migration create_etablissements_table"
make artisan CMD="tinker"

# Migrations
make migrate              # Exécuter les nouvelles migrations
make migrate-fresh        # ⚠ Tout réinitialiser + seeders

# Cache
make cache-clear          # Vider les caches
make cache-warm           # Regénérer les caches
```

### Installer un package Composer

```bash
make composer CMD="require spatie/laravel-permission"
make composer CMD="require --dev barryvdh/laravel-debugbar"
```

### Tests PHPUnit

```bash
# Lancer tous les tests
make test

# Avec couverture de code (HTML dans backend/coverage/)
make test-coverage
```

---

## 5. Travailler sur le frontend Next.js

### Code source

Le code Next.js est dans `frontend/`. Il est **monté en volume** : le hot-reload fonctionne automatiquement.

Accédez au frontend : **http://localhost:3000**

### Variable d'environnement API

Le frontend communique avec le backend via :
```
NEXT_PUBLIC_API_URL=http://nginx/api
```

> En interne Docker, le frontend appelle Nginx qui redirige vers PHP. Pour les appels depuis le **navigateur**, utilisez `http://localhost/api`.

### Ouvrir un shell frontend

```bash
make shell-frontend

# Depuis le shell :
npm install <package>
npx next build  # Build de vérification
exit
```

---

## 6. Débogage avec Xdebug

Xdebug est installé et activé **uniquement en mode développement** (stage `development` du Dockerfile).

### Configuration VS Code

Créez `.vscode/launch.json` à la racine du projet :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "SICRES — Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "pathMappings": {
        "/var/www/html": "${workspaceFolder}/backend"
      },
      "hostname": "0.0.0.0",
      "stopOnEntry": false
    }
  ]
}
```

### Configuration PhpStorm

1. `Settings → PHP → Debug`
   - Debug port : `9003`
2. `Settings → PHP → Servers`
   - Name : `sicres`
   - Host : `localhost`
   - Path Mappings : `/var/www/html` → `<votre_chemin>/SICRES/backend`
3. Activer "Start Listening for PHP Debug Connections"

### Utilisation

```bash
# Vérifier que Xdebug est actif
make artisan CMD="tinker"
# Dans tinker: phpinfo(); // cherchez "xdebug"
```

---

## 7. Gestion de la base de données

### Connexion directe (CLI)

```bash
make shell-postgres
# Vous êtes maintenant dans psql

\l               -- Lister les bases de données
\dt              -- Lister les tables
\d nom_table     -- Décrire une table
\q               -- Quitter
```

### pgAdmin (interface graphique)

```bash
make pgadmin
# Ouvrir http://localhost:5050
# Email    : admin@sicres.gouv.cm
# Password : admin_sicres_2026
```

**Ajouter le serveur dans pgAdmin :**
- Host : `postgres`
- Port : `5432`
- Database : `sicres_db`
- Username : `sicres_user`
- Password : *(votre DB_PASSWORD)*

### Sauvegardes et restauration

```bash
# Créer une sauvegarde
make backup
# → Fichier créé dans docker/postgres/backups/backup_YYYYMMDD_HHMMSS.sql

# Lister les sauvegardes
ls docker/postgres/backups/

# Restaurer une sauvegarde
make restore FILE=backup_20260726_120000.sql
```

---

## 8. Emails de développement

**Mailpit** intercepte tous les emails envoyés par Laravel.  
Accédez à l'interface : **http://localhost:8025**

Aucun email n'arrive dans une vraie boîte mail — tout est visible dans Mailpit.

**Configuration Laravel déjà en place :**
```dotenv
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_FROM_ADDRESS=noreply@sicres.gouv.cm
```

**Tester l'envoi d'email :**
```bash
make artisan CMD="tinker"
# Dans tinker :
Mail::raw('Test SICRES', function($msg) {
    $msg->to('test@example.com')->subject('Test');
});
# Vérifier dans http://localhost:8025
```

---

## 9. Problèmes fréquents (FAQ)

### ❌ `docker compose up` échoue — port déjà utilisé

```bash
# Trouver ce qui utilise le port 80
sudo lsof -i :80

# Option 1 : Arrêter le service conflictuel
sudo systemctl stop apache2  # ou nginx local

# Option 2 : Changer le port dans .env
NGINX_HTTP_PORT=8080
```

### ❌ Le conteneur PHP redémarre en boucle

```bash
# Voir les logs détaillés
make logs-php

# Problèmes fréquents :
# 1. PostgreSQL pas encore prêt → attendre quelques secondes
# 2. APP_KEY manquante dans backend/.env
# 3. Permissions sur /storage
make shell-php
php artisan key:generate
chmod -R 775 storage bootstrap/cache
```

### ❌ `make migrate` échoue — connexion refusée

```bash
# Vérifier que PostgreSQL est healthy
make ps

# Vérifier la connexion
make shell-postgres  # doit ouvrir psql

# Vérifier backend/.env
# DB_HOST=postgres  (pas 127.0.0.1 !)
```

### ❌ Modifications du frontend non visibles

```bash
# Vérifier que le hot-reload est actif
make logs-frontend

# En dernier recours : redémarrer le service
docker compose restart frontend
```

### ❌ "Permission denied" sur storage/

```bash
make shell-php
chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage
```

### ❌ Reconstruire depuis zéro

```bash
# ⚠ Supprime les volumes (perte des données !)
make clean

# Repartir de zéro
make build
make up
```

---

*Guide rédigé par l'équipe technique SICRES — Juillet 2026*
