# 👥 MODULE 2 - GESTION DES UTILISATEURS (Backend)

## USER-001: Backend - Create User Roles & Permissions

**Priorité:** 🔴 HIGH  
**Type:** Backend  
**Dépendances:** AUTH-001  
**Durée estimée:** 2-3 jours

### Description
Implémenter le système RBAC (Role-Based Access Control) avec 2 rôles: Administrateur communal et Responsable d'établissement.

### Tâches techniques

#### 1. Créer Rôles en Base
- [ ] Créer table `roles`:
  ```sql
  id, name (unique), display_name, description, created_at, updated_at
  ```
  - admin (Administrateur Communal)
  - school_director (Responsable Établissement)

#### 2. Permissions & Migration
- [ ] Créer table `permissions`:
  - id, name, description
- [ ] Créer table `role_permission` (pivot):
  - role_id, permission_id

#### 3. User Model Enhancement
- [ ] Ajouter relation `user.role`
- [ ] Migration `users` table:
  - Ajouter colonne `role_id` (foreign key)
- [ ] User factory: set default role à création

#### 4. Middleware Permission
- [ ] Créer middleware `CheckPermission`:
  - Middleware `can:permission-name`
  - Middleware `role:role-name`
- [ ] Appliquer aux routes protégées

#### 5. Seeders
- [ ] `RoleSeeder`: créer les 2 rôles
- [ ] `PermissionSeeder`: créer toutes les permissions:
  ```
  - users.list, users.create, users.update, users.delete
  - schools.list, schools.create, schools.update, schools.delete
  - campaigns.list, campaigns.create, campaigns.update
  - declarations.validate, declarations.approve, declarations.reject
  - documents.view, documents.approve
  ```
- [ ] Assign permissions to roles

### Fichiers à créer/modifier
```
backend/
├── app/
│   ├── Models/
│   │   ├── Role.php (create)
│   │   ├── Permission.php (create)
│   │   └── User.php (modify - add role relation)
│   └── Http/Middleware/
│       ├── CheckRole.php (create)
│       └── CheckPermission.php (create)
├── database/
│   ├── migrations/
│   │   ├── [timestamp]_create_roles_table.php
│   │   ├── [timestamp]_create_permissions_table.php
│   │   ├── [timestamp]_create_role_permission_table.php
│   │   └── [timestamp]_add_role_id_to_users_table.php
│   └── seeders/
│       ├── RoleSeeder.php
│       └── PermissionSeeder.php
└── config/
    └── auth.php (verify)
```

### Database Schema

#### roles table
```
id (PK)
name (UNIQUE): "admin", "school_director"
display_name: "Admin Communal", "Responsable École"
description: text
created_at, updated_at
```

#### permissions table
```
id (PK)
name (UNIQUE): "users.create", "schools.update", etc
description: text
created_at, updated_at
```

#### role_permission table
```
role_id (FK)
permission_id (FK)
PRIMARY KEY (role_id, permission_id)
```

#### users table (modify)
```
...
role_id (FK) - NOT NULL
...
```

### Tests à réaliser
- [ ] Roles créés en DB
- [ ] Permissions assignées correctement
- [ ] User.role() fonctionne
- [ ] Middleware CheckRole valide le rôle
- [ ] Middleware CheckPermission valide la permission
- [ ] Admin peut accéder routes admin
- [ ] School director ne peut pas accéder routes admin

---

## USER-002: Backend - User Registration Endpoint

**Priorité:** 🔴 HIGH  
**Type:** Backend  
**Dépendances:** USER-001  
**Durée estimée:** 2-3 jours

### Description
Compléter l'endpoint de registration avec email verification, assignation de rôle par défaut et validation complète des inputs.

### Tâches techniques

#### 1. Registration Controller Enhancement
- [ ] Modifier `RegisterController`:
  - Ajouter `name` field (firstname + lastname)
  - Valider email unique
  - Valider password strength
  - Set default role à `school_director`
  - Hash password sécurisé

#### 2. Email Verification
- [ ] Envoyer email de vérification après registration
- [ ] Créer `VerifyEmailController`:
  - GET `/api/verify-email/{id}/{hash}`
  - Valider signature
  - Mark user email_verified_at
  - Retourner token pour login automatique

#### 3. Validation Form Request
- [ ] Créer `RegisterRequest`:
  ```
  name: required, string, max:255
  email: required, email, unique:users
  password: required, min:8, confirmed, regex:/[A-Z]/, regex:/[0-9]/
  password_confirmation: required
  ```

#### 4. Error Handling
- [ ] Validation errors → 422 avec messages clairs
- [ ] Email already exists → specific message
- [ ] Password weak → helpful message

#### 5. Notification / Email
- [ ] Créer `RegisteredNotification`:
  - Lien de vérification email
  - Template HTML pro
  - Footer avec logo SICRES

### API Endpoints

```
POST /api/register
Content-Type: application/json
{
  "name": "Jean Dupont",
  "email": "school@example.com",
  "password": "SecurePass123",
  "password_confirmation": "SecurePass123"
}

Response 201:
{
  "message": "Registration successful. Check your email to verify.",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "school@example.com",
    "role": "school_director",
    "email_verified_at": null
  }
}

Response 422 (Validation Error):
{
  "message": "Validation failed",
  "errors": {
    "email": ["Email already in use"],
    "password": ["Password must contain uppercase and number"]
  }
}

---

GET /api/verify-email/{id}/{hash}

Response 200:
{
  "message": "Email verified successfully",
  "user": { ... },
  "token": "1|abc123..."
}
```

### Files à créer/modifier
```
backend/
├── app/Http/Controllers/Auth/
│   ├── RegisterController.php (modify)
│   └── VerifyEmailController.php (create)
├── app/Http/Requests/Auth/
│   └── RegisterRequest.php (create)
├── app/Notifications/
│   └── RegisteredNotification.php (create)
├── routes/auth.php (modify)
└── resources/views/emails/
    └── verify-email.blade.php (create)
```

### Tests à réaliser
- [ ] POST /api/register avec data valide → 201, user créé
- [ ] POST /api/register email duplicate → 422
- [ ] POST /api/register password faible → 422
- [ ] Email vérification sent
- [ ] GET /api/verify-email/{id}/{hash} → email_verified_at set
- [ ] User peut login après verification

