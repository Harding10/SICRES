# Guide Authentification API — Laravel Sanctum (SICRES)

> **Audience :** Developpeurs frontend integrant l'API SICRES
> **Mise a jour :** Juillet 2026

---

## Principe : Authentification SPA avec Sanctum

SICRES utilise **Laravel Sanctum** en mode **stateful (session cookie)** pour les SPA.
Il n'y a pas de token Bearer a stocker dans localStorage.
La securite repose sur les cookies CSRF et de session HTTP-only.

```
Frontend (Next.js)                    Backend (Laravel)
      |                                      |
      |-- GET /sanctum/csrf-cookie --------->|
      |<-- Set-Cookie: XSRF-TOKEN ----------|
      |                                      |
      |-- POST /login (+ X-XSRF-TOKEN) ---->|
      |<-- Set-Cookie: sicres_session -------|
      |                                      |
      |-- GET /api/user (cookie auto) ------>|
      |<-- { id, name, email, ... } ---------|
```

---

## Sequence d'authentification

### Etape 1 — Obtenir le cookie CSRF

Avant **tout** appel POST/PUT/DELETE, le frontend doit initialiser la protection CSRF :

```http
GET /sanctum/csrf-cookie HTTP/1.1
Host: localhost
```

**Reponse :** Le serveur pose le cookie `XSRF-TOKEN` dans le navigateur.
Ce cookie est **lu automatiquement** par Axios et envoye dans le header `X-XSRF-TOKEN`.

```typescript
// utils/api.ts — appel initial
await axios.get('/sanctum/csrf-cookie');
```

### Etape 2 — Connexion

```http
POST /login HTTP/1.1
Content-Type: application/json
Accept: application/json
X-XSRF-TOKEN: <valeur du cookie>

{
  "email": "agent@etablissement.cm",
  "password": "motdepasse"
}
```

**Reponse succes :** `204 No Content`
Le cookie de session `sicres_session` est pose automatiquement.

**Reponse erreur :** `422 Unprocessable Entity`
```json
{
  "message": "These credentials do not match our records.",
  "errors": {
    "email": ["These credentials do not match our records."]
  }
}
```

### Etape 3 — Requetes authentifiees

Toutes les requetes suivantes incluent automatiquement le cookie de session :

```http
GET /api/user HTTP/1.1
Accept: application/json
Cookie: sicres_session=<valeur>
```

**Reponse :**
```json
{
  "id": 1,
  "name": "Jean Dupont",
  "email": "jean@exemple.cm",
  "role": "agent",
  "email_verified_at": "2026-07-01T08:00:00Z",
  "created_at": "2026-07-01T08:00:00Z"
}
```

### Etape 4 — Deconnexion

```http
POST /logout HTTP/1.1
Accept: application/json
X-XSRF-TOKEN: <valeur>
```

**Reponse :** `204 No Content` — la session est detruite.

---

## Reference des endpoints d'authentification

| Methode | Endpoint | Auth requise | Description |
|---------|----------|-------------|-------------|
| GET | `/sanctum/csrf-cookie` | Non | Initialiser la protection CSRF |
| POST | `/register` | Non | Creer un compte |
| POST | `/login` | Non | Se connecter |
| POST | `/logout` | Oui | Se deconnecter |
| GET | `/api/user` | Oui | Obtenir l'utilisateur connecte |
| POST | `/forgot-password` | Non | Demander un lien de reinitialisation |
| POST | `/reset-password` | Non | Reinitialiser le mot de passe |
| POST | `/email/verification-notification` | Oui | Renvoyer l'email de verification |

---

## Integration Next.js — Configuration Axios

```typescript
// frontend/utils/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost',
  withCredentials: true,   // Obligatoire pour envoyer les cookies de session
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Intercepteur : initialise le CSRF avant chaque mutation
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
    await api.get('/sanctum/csrf-cookie');
  }
  return config;
});

export default api;
```

---

## Gestion des erreurs

| Code HTTP | Signification | Action recommandee |
|-----------|--------------|-------------------|
| `204` | Succes (pas de corps) | Rediriger vers le dashboard |
| `401` | Non authentifie | Rediriger vers `/login` |
| `403` | Non autorise (pas le bon role) | Afficher un message d'erreur |
| `419` | Token CSRF expire | Rappeler `/sanctum/csrf-cookie` |
| `422` | Donnees invalides | Afficher les erreurs de validation |
| `429` | Rate limit depasse | Attendre et reessayer |
| `500` | Erreur serveur | Contacter l'administrateur |

---

## Configuration du backend (`.env`)

```env
# URL autorisee pour les requetes CORS (doit correspondre au frontend)
SANCTUM_STATEFUL_DOMAINS=localhost:3000

# URL du frontend (pour les liens dans les emails)
APP_URL=http://localhost
FRONTEND_URL=http://localhost:3000

# Session
SESSION_DRIVER=redis
SESSION_LIFETIME=120
SESSION_DOMAIN=localhost
```

---

*Guide Sanctum SICRES — Juillet 2026*
