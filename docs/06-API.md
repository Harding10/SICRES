# Documentation API REST — SICRES

> **Version :** 1.0
> **Base URL :** `http://localhost/api` (dev) | `https://sicres.cm/api` (prod)
> **Authentification :** Laravel Sanctum (session cookie SPA)
> **Format :** JSON (`Content-Type: application/json`)

---

## Conventions

### Format des reponses

**Succes (liste) :**
```json
{
  "data": [ { ... }, { ... } ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 73
  }
}
```

**Succes (element unique) :**
```json
{
  "data": { "id": 1, "nom": "...", ... }
}
```

**Erreur de validation (422) :**
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "nom": ["Le champ nom est obligatoire."],
    "email": ["L'adresse email est invalide."]
  }
}
```

**Erreur serveur (500) :**
```json
{
  "message": "Server Error"
}
```

### Headers requis

```http
Accept: application/json
Content-Type: application/json
X-XSRF-TOKEN: <token CSRF>   ← obligatoire pour POST/PUT/DELETE
```

---

## Authentification

Voir le guide complet : [03-Guide-API-Sanctum.md](../guides/03-Guide-API-Sanctum.md)

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/sanctum/csrf-cookie` | Initialiser la protection CSRF |
| POST | `/register` | Creer un compte utilisateur |
| POST | `/login` | Se connecter |
| POST | `/logout` | Se deconnecter |
| GET | `/api/user` | Obtenir l'utilisateur connecte |
| POST | `/forgot-password` | Demander un lien de reinitialisation |
| POST | `/reset-password` | Reinitialiser le mot de passe |

---

## Etablissements

### Lister les etablissements

```http
GET /api/etablissements
```

**Parametres de requete (query) :**

| Parametre | Type | Description |
|-----------|------|-------------|
| `page` | integer | Numero de page (defaut: 1) |
| `per_page` | integer | Elements par page (defaut: 15, max: 100) |
| `search` | string | Recherche par nom |
| `type` | string | Filtrer par type (primaire, secondaire_general...) |
| `secteur` | string | Filtrer par secteur (public, prive_laic...) |
| `region` | string | Filtrer par region |

**Reponse 200 :**
```json
{
  "data": [
    {
      "id": 1,
      "nom": "Lycee de Yaounde",
      "code": "LYD-001",
      "type": "secondaire_general",
      "secteur": "public",
      "region": "Centre",
      "ville": "Yaounde",
      "telephone": "+237 222 000 001",
      "email": "contact@lycee-yaounde.cm",
      "created_at": "2026-01-15T08:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 12,
    "per_page": 15,
    "total": 172
  }
}
```

---

### Voir un etablissement

```http
GET /api/etablissements/{id}
```

**Reponse 200 :**
```json
{
  "data": {
    "id": 1,
    "nom": "Lycee de Yaounde",
    "code": "LYD-001",
    "type": "secondaire_general",
    "secteur": "public",
    "region": "Centre",
    "ville": "Yaounde",
    "adresse": "Avenue Kennedy, Yaounde",
    "telephone": "+237 222 000 001",
    "email": "contact@lycee-yaounde.cm",
    "directeur": "M. Jean Nkolo",
    "date_creation": "1975-09-01",
    "statut": "actif",
    "created_at": "2026-01-15T08:00:00Z",
    "updated_at": "2026-07-01T10:00:00Z"
  }
}
```

**Reponse 404 :**
```json
{ "message": "Etablissement non trouve." }
```

---

### Creer un etablissement

```http
POST /api/etablissements
```

**Corps (JSON) :**
```json
{
  "nom": "College Bilingue de Douala",
  "type": "secondaire_general",
  "secteur": "prive_laic",
  "region": "Littoral",
  "ville": "Douala",
  "adresse": "Rue du Commerce, Akwa",
  "telephone": "+237 233 000 002",
  "email": "contact@college-douala.cm",
  "directeur": "Mme Claire Mbida"
}
```

**Validation :**

| Champ | Regles |
|-------|--------|
| `nom` | requis, string, max:255 |
| `type` | requis, enum: primaire, secondaire_general, secondaire_technique, superieur |
| `secteur` | requis, enum: public, prive_laic, prive_confessionnel |
| `region` | requis, string |
| `ville` | requis, string |
| `email` | optionnel, email valide |

**Reponse 201 :**
```json
{
  "data": { "id": 2, "nom": "College Bilingue de Douala", ... },
  "message": "Etablissement cree avec succes."
}
```

---

### Modifier un etablissement

```http
PUT /api/etablissements/{id}
```

Corps identique au POST. Seuls les champs envoyes sont mis a jour.

**Reponse 200 :**
```json
{
  "data": { ... },
  "message": "Etablissement mis a jour."
}
```

---

### Supprimer un etablissement

```http
DELETE /api/etablissements/{id}
```

**Reponse 204 :** Pas de corps (suppression reussie).

---

## Declarations

Une declaration est une soumission de donnees pour une campagne de recensement.

### Lister les declarations

```http
GET /api/declarations
```

**Parametres :**

| Parametre | Description |
|-----------|-------------|
| `statut` | brouillon, soumis, en_revision, valide, rejete |
| `campagne_id` | Filtrer par campagne |
| `etablissement_id` | Filtrer par etablissement |

**Reponse 200 :**
```json
{
  "data": [
    {
      "id": 1,
      "etablissement_id": 1,
      "campagne_id": 2026,
      "statut": "soumis",
      "soumis_le": "2026-03-15T14:30:00Z",
      "valide_le": null
    }
  ],
  "meta": { ... }
}
```

---

### Soumettre une declaration

```http
POST /api/declarations
```

**Corps :**
```json
{
  "etablissement_id": 1,
  "campagne_id": 2026,
  "effectif_total": 1250,
  "effectif_filles": 610,
  "effectif_garcons": 640,
  "nombre_enseignants": 72,
  "nombre_salles": 30,
  "donnees_specifiques": {
    "niveau": "secondaire",
    "classes": ["6eme", "5eme", "4eme", "3eme"]
  }
}
```

**Reponse 201 :**
```json
{
  "data": { "id": 42, "statut": "soumis", ... },
  "message": "Declaration soumise avec succes. Un email de confirmation vous a ete envoye."
}
```

---

### Valider une declaration (role : directeur regional ou admin)

```http
PATCH /api/declarations/{id}/valider
```

**Corps :**
```json
{
  "commentaire": "Declaration conforme, approuvee."
}
```

**Reponse 200 :**
```json
{
  "data": { "id": 42, "statut": "valide", "valide_le": "2026-04-01T09:00:00Z" },
  "message": "Declaration validee."
}
```

---

### Rejeter une declaration

```http
PATCH /api/declarations/{id}/rejeter
```

**Corps :**
```json
{
  "raison": "Les effectifs declares ne correspondent pas aux donnees precedentes."
}
```

---

## Utilisateurs (role : admin)

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users` | Lister les utilisateurs |
| GET | `/api/users/{id}` | Voir un utilisateur |
| POST | `/api/users` | Creer un utilisateur |
| PUT | `/api/users/{id}` | Modifier un utilisateur |
| DELETE | `/api/users/{id}` | Supprimer un utilisateur |
| PATCH | `/api/users/{id}/statut` | Activer/suspendre un compte |

---

## Codes HTTP utilises

| Code | Signification |
|------|---------------|
| `200 OK` | Succes avec corps |
| `201 Created` | Ressource creee |
| `204 No Content` | Succes sans corps |
| `401 Unauthorized` | Non authentifie |
| `403 Forbidden` | Non autorise (role insuffisant) |
| `404 Not Found` | Ressource introuvable |
| `419 CSRF Token Mismatch` | Token CSRF absent ou expire |
| `422 Unprocessable Entity` | Erreurs de validation |
| `429 Too Many Requests` | Rate limit depasse |
| `500 Internal Server Error` | Erreur serveur |

---

*Documentation API SICRES — Juillet 2026*
