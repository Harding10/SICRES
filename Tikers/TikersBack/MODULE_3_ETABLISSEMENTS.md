# 🏫 MODULE 3 - GESTION DES ÉTABLISSEMENTS (Backend)

## SCHOOL-001: Backend - Create School Model & Migration

**Priorité:** 🔴 HIGH | **Dépendances:** AUTH-001 | **Durée:** 2-3 jours

### Description
Créer le modèle Établissement avec tous les champs permanents de l'école.

### Tâches techniques

#### 1. School Model
```
app/Models/Établissement.php
```
- [ ] Créer model avec fillable fields
- [ ] Relations: `hasMany(Declaration)`, `hasMany(Document)`, `belongsTo(User, 'director_id')`
- [ ] Scopes: `public()`, `private()`, `byLevel()`, `byCity()`

#### 2. Migration
```
database/migrations/[timestamp]_create_etablissements_table.php
```
- [ ] Colonnes:
  - `id` (BIGSERIAL PK)
  - `code` (VARCHAR 50, UNIQUE)
  - `name` (VARCHAR 255)
  - `type` (ENUM: 'public', 'privé')
  - `level` (VARCHAR 100) - ex: "Primaire", "Secondaire", "Technique"
  - `city` (VARCHAR 255)
  - `address` (TEXT)
  - `director_id` (FK users)
  - `director_name` (VARCHAR 255)
  - `director_phone` (VARCHAR 20)
  - `director_email` (VARCHAR 255)
  - `phone` (VARCHAR 20)
  - `email` (VARCHAR 255)
  - `created_year` (YEAR)
  - `latitude` (DECIMAL 10,8) - nullable
  - `longitude` (DECIMAL 11,8) - nullable
  - `status` (ENUM: 'active', 'closed', 'archived')
  - `created_at`, `updated_at`
  - `deleted_at` (soft delete)

#### 3. Factory & Seeder
- [ ] Create `EstablishmentFactory` pour tests
- [ ] Create `EstablishmentSeeder` avec 50 écoles de démo

### Database Schema
```sql
CREATE TABLE etablissements (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('public', 'privé') NOT NULL,
    level VARCHAR(100) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address TEXT,
    director_id BIGINT REFERENCES users(id),
    director_name VARCHAR(255),
    director_phone VARCHAR(20),
    director_email VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_year SMALLINT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status ENUM('active', 'closed', 'archived') DEFAULT 'active',
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_establecimiento_type ON etablissements(type);
CREATE INDEX idx_establecimiento_city ON etablissements(city);
CREATE INDEX idx_establecimiento_director_id ON etablissements(director_id);
CREATE INDEX idx_establecimiento_status ON etablissements(status);
```

---

## SCHOOL-002: Backend - School CRUD Endpoints

**Priorité:** 🔴 HIGH | **Dépendances:** SCHOOL-001 | **Durée:** 2-3 jours

### Description
Implémenter endpoints CRUD pour les établissements avec validation et soft delete.

### API Endpoints

```
GET /api/schools
- Query params: type, city, level, status
- Paginated (50 per page)
- Response: { data: [...], total, per_page, current_page }

---

GET /api/schools/{id}
Response 200:
{
  "id": 1,
  "code": "SC001",
  "name": "École Primaire Côte d'Ivoire",
  "type": "public",
  "level": "Primaire",
  "city": "Yamoussoukro",
  ...
}

---

POST /api/schools
Auth: Bearer {token}
{
  "code": "SC001",
  "name": "École Primaire",
  "type": "public",
  "level": "Primaire",
  "city": "Yamoussoukro",
  "address": "12 Rue Dupont",
  "director_name": "Jean Dupont",
  "director_phone": "+225701234567",
  "director_email": "director@school.ci",
  "phone": "+225701234567",
  "email": "school@example.ci",
  "created_year": 1990
}
Response 201: { id, code, name, ... }

---

PUT /api/schools/{id}
Auth: Bearer {token}
{ updated_fields }
Response 200: { id, ... }

---

DELETE /api/schools/{id}
Auth: Bearer {token}
Response 204 (soft delete)

---

POST /api/schools/{id}/restore
Auth: Admin only
Response 200: { message: "restored" }
```

### Fichiers à créer
```
app/Http/Controllers/
├── SchoolController.php (CRUD)

app/Http/Requests/
├── StoreSchoolRequest.php
└── UpdateSchoolRequest.php

routes/api.php (ajouter routes)
```

### Tests
- [ ] GET /api/schools → retourne liste paginée
- [ ] POST /api/schools → création réussie
- [ ] PUT /api/schools/{id} → modification OK
- [ ] DELETE /api/schools/{id} → soft delete
- [ ] Code unique validation
- [ ] Soft deleted schools non retournées par défaut

---

## SCHOOL-003: Backend - School Authorization

**Priorité:** 🟡 MEDIUM | **Dépendances:** USER-001, SCHOOL-002 | **Durée:** 1-2 jours

### Description
Implémenter access control: seul directeur peut modifier son école, admin voit tout.

### Tâches techniques

- [ ] Policy `EstablishmentPolicy`:
  - `view(User, School)` - tous peuvent voir
  - `update(User, School)` - seulement director ou admin
  - `delete(User, School)` - seulement admin
  - `restore(User, School)` - seulement admin

- [ ] Middleware dans controller:
  ```php
  $this->authorize('update', $school);
  ```

- [ ] Scopes:
  - Admin voit toutes les écoles
  - School director voit seulement leur école

### Tests
- [ ] Director ne peut modifier que sa propre école
- [ ] Director ne peut pas accéder école d'un autre
- [ ] Admin peut tout modifier
- [ ] Non-auth → 401
- [ ] Unauthorized → 403

