# SICRES API Backend

API Laravel pour SICRES avec authentification et base de données PostgreSQL.

## Prérequis

- Docker Compose
- PHP 8.4+
- Composer 2+
- PostgreSQL

## Démarrage local

Depuis la racine du projet :

```bash
docker compose up -d --build
```

## URLs importantes

- Backend : http://localhost:8100
- Login : http://localhost:8100/api/login
- Utilisateur courant : http://localhost:8100/api/user

## Authentification

Les routes de connexion sont définies dans [routes/auth.php](routes/auth.php).

Les points clés sont :

- [app/Http/Controllers/Auth/AuthenticatedSessionController.php](app/Http/Controllers/Auth/AuthenticatedSessionController.php)
- [app/Http/Requests/Auth/LoginRequest.php](app/Http/Requests/Auth/LoginRequest.php)

### Test de connexion

```bash
curl -i -X POST http://localhost:8100/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin.communal@sicres.ci","password":"Sic@2026!Pb"}'
```

## Commandes utiles

```bash
docker compose ps
docker compose logs -f php
docker compose exec postgres psql -U sicres_user -d sicres_db
php artisan migrate
php artisan test
```

## Documentation

- [../docs/authentification-login.md](../docs/authentification-login.md)
- [../docs/06-API.md](../docs/06-API.md)

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
