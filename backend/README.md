# SICRES API Backend

API RESTful pour le système de gestion SICRES. Construite avec Laravel 13 et PostgreSQL, conçue pour gérer les opérations métier avec une architecture scalable et sécurisée.

## 📋 Table des matières

- [Stack Technologique](#-stack-technologique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du Projet](#-structure-du-projet)
- [Authentification](#-authentification)
- [Base de Données](#-base-de-données)
- [Commandes Utiles](#-commandes-utiles)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Déploiement](#-déploiement)
- [Contributing](#-contributing)

## 🛠 Stack Technologique

| Composant | Version | Description |
|-----------|---------|-------------|
| **PHP** | 8.3+ | Langage backend |
| **Laravel** | 13.8 | Framework web |
| **PostgreSQL** | Latest | Base de données relationnelle |
| **Laravel Sanctum** | 4.0 | API token authentication |
| **Laravel Breeze** | 2.4 | Starter kit authentification |
| **PHPUnit** | 12.5.12 | Testing framework |
| **Laravel Pint** | 1.27 | Code style fixer |

## 📦 Prérequis

- PHP 8.3+
- Composer 2.0+
- PostgreSQL 12+
- Git

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Harding10/SICRES.git
cd SICRES/backend
```

### 2. Installer les dépendances

```bash
composer install
```

### 3. Générer la clé applicative

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configurer la base de données

Éditer le fichier `.env` avec vos paramètres PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sic_db
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

### 5. Exécuter les migrations

```bash
php artisan migrate
```

### 6. (Optionnel) Charger les données de test

```bash
php artisan db:seed
```

## ⚙️ Configuration

### Variables d'environnement essentielles

```env
APP_NAME=SICRES
APP_ENV=local|production
APP_DEBUG=true|false
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Base de données
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sic_db
DB_USERNAME=postgres
DB_PASSWORD=...

# Session
SESSION_DRIVER=database
SESSION_LIFETIME=120

# Cache & Queue
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### Configuration Laravel

Les fichiers de configuration principaux se trouvent dans `/config`:
- `app.php` - Configuration applicative
- `database.php` - Connexions base de données
- `sanctum.php` - Configuration authentification API
- `queue.php` - Configuration des jobs

## 📁 Structure du Projet

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Auth/           # Contrôleurs authentification (Breeze)
│   │   ├── Middleware/         # Middlewares personnalisés
│   │   └── Requests/           # Form requests validation
│   ├── Models/                 # Modèles Eloquent
│   ├── Services/               # Logique métier (optionnel)
│   └── Exceptions/             # Exceptions personnalisées
├── database/
│   ├── migrations/             # Migrations de schéma
│   ├── seeders/                # Data seeders
│   └── factories/              # Model factories pour tests
├── routes/
│   ├── api.php                 # Routes API
│   ├── auth.php                # Routes authentification
│   └── web.php                 # Routes web (admin, etc)
├── tests/
│   ├── Unit/                   # Tests unitaires
│   ├── Feature/                # Tests fonctionnels
│   └── CreatesApplication.php  # Test helper
├── config/                     # Fichiers configuration
├── bootstrap/                  # Bootstrap application
├── storage/                    # Logs, sessions, uploads
├── public/                     # Document root
├── .env                        # Variables d'environnement (local)
├── .env.example                # Template .env
├── composer.json               # Dépendances PHP
└── artisan                     # CLI Laravel
```

## 🔐 Authentification

### Laravel Breeze API

L'authentification est gérée via **Laravel Sanctum** avec les endpoints fournis par Breeze:

#### Endpoints d'authentification

```
POST   /api/register           # S'inscrire
POST   /api/login              # Se connecter
POST   /api/logout             # Se déconnecter (nécessite token)
GET    /api/user               # Récupérer l'utilisateur actuel (nécessite token)
```

#### Utilisation du token

Les tokens Sanctum s'envoient dans le header `Authorization`:

```bash
curl -H "Authorization: Bearer {token}" http://localhost:8000/api/user
```

### Protéger les routes

Ajouter le middleware `auth:sanctum` aux routes protégées:

```php
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
```

## 💾 Base de Données

### Migrations

Créer une nouvelle migration:

```bash
php artisan make:migration create_users_table
```

Exécuter les migrations:

```bash
php artisan migrate
```

Annuler la dernière batch de migrations:

```bash
php artisan migrate:rollback
```

Réinitialiser complètement:

```bash
php artisan migrate:fresh
```

### Modèles et Relations

Les modèles Eloquent se créent avec:

```bash
php artisan make:model Post -m  # Crée le modèle et la migration
```

## 🎯 Commandes Utiles

### Serveur de développement

```bash
php artisan serve                # Démarre le serveur (http://localhost:8000)
php artisan serve --port=3000   # Sur un port spécifique
```

### Base de données

```bash
php artisan migrate              # Exécuter les migrations
php artisan migrate:status       # Vérifier le statut
php artisan migrate:rollback     # Annuler la dernière batch
php artisan migrate:refresh      # Reset + seed
php artisan db:seed              # Charger les seeders
php artisan tinker               # REPL interactive
```

### Code Quality

```bash
php artisan pint                 # Format le code (Laravel Pint)
php artisan test                 # Lancer les tests (PHPUnit)
php artisan test --filter=UserTest  # Tests spécifiques
```

### Cache & Queues

```bash
php artisan cache:clear          # Vider le cache
php artisan queue:work           # Traiter les jobs en attente
```

### Génération de code

```bash
php artisan make:controller PostController        # Créer un contrôleur
php artisan make:model Post                       # Créer un modèle
php artisan make:request StorePostRequest         # Créer un Form Request
php artisan make:middleware CheckAdminMiddleware  # Créer un middleware
```

## 📚 API Documentation

### Structure des réponses

**Succès (200):**
```json
{
    "data": { ... },
    "message": "Operation successful"
}
```

**Erreur (4xx/5xx):**
```json
{
    "message": "Error description",
    "errors": { ... }
}
```

### Endpoints principaux

Consultez `/docs/06-API.md` pour la documentation complète des endpoints API.

## 🧪 Testing

### Lancer les tests

```bash
# Tous les tests
php artisan test

# Tests spécifiques
php artisan test tests/Unit/UserTest.php
php artisan test --filter=testUserLogin

# Avec code coverage
php artisan test --coverage
```

### Créer un test

```bash
php artisan make:test UserTest          # Test unitaire
php artisan make:test UserTest --feature  # Test fonctionnel
```

Structure minimale d'un test:

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserTest extends TestCase
{
    public function testUserCanRegister(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
    }
}
```

## 🌐 Déploiement

### Production checklist

- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] Clé applicative générée (`APP_KEY`)
- [ ] Cache configuré (Redis/Database)
- [ ] Variables d'environnement sécurisées
- [ ] Base de données migrée
- [ ] Permissions de dossiers correctes (`storage/`, `bootstrap/cache/`)
- [ ] SSL configuré (HTTPS)
- [ ] Backups automatiques configurés
- [ ] Monitoring & logging en place

### Déploiement avec Docker

```bash
docker-compose up -d
```

Voir `../docker-compose.yml` pour la configuration.

## 📝 Contributing

### Workflow

1. Créer une branche depuis `main`
2. Faire les changements
3. Lancer les tests et formater le code
4. Créer une Pull Request

### Standards de code

- Respect du PSR-12 (Laravel Pint)
- Tests obligatoires pour nouvelles features
- Documentation du code (docblocks)
- Messages de commit clairs

### Commandes avant commit

```bash
php artisan pint                # Formater le code
php artisan test                # Lancer les tests
```

## 📧 Support

Pour les issues ou questions, créer une issue GitHub dans le repository.

## 📄 Licence

MIT License - voir le fichier LICENSE pour les détails.

---

**Dernière mise à jour:** 15 juillet 2026  
**Mainteneur:** Équipe de développement SICRES
