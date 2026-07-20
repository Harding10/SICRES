# Documentation de l'API (SICRES)

Cette documentation décrit les points de terminaison (endpoints) de l'API de base du projet, qui utilise actuellement **Laravel Breeze (API Stack)** avec **Laravel Sanctum** pour l'authentification SPA.

## URL de base
L'API est accessible à l'adresse définie dans `APP_URL` :
- **Backend URL :** `http://localhost:8000`
- **Frontend URL :** `http://localhost:3000`

## Authentification (Laravel Sanctum)
L'authentification est gérée par session (stateful) pour les SPA (Single Page Applications) de premier niveau. 
Avant de faire une requête de connexion (`/login`) ou d'inscription (`/register`), l'application frontend doit effectuer une requête vers `/sanctum/csrf-cookie` pour initialiser la protection CSRF.

### 1. CSRF Cookie
- **Méthode :** `GET`
- **Endpoint :** `/sanctum/csrf-cookie`
- **Description :** Initialise le cookie `XSRF-TOKEN` nécessaire pour toutes les futures requêtes POST, PUT ou DELETE.

---

## Endpoints d'Authentification (Breeze)

Toutes ces requêtes attendent un header `Accept: application/json`.

### 2. Inscription (Register)
- **Méthode :** `POST`
- **Endpoint :** `/register`
- **Paramètres JSON (Body) :**
  - `name` (string, requis)
  - `email` (string, email, requis)
  - `password` (string, requis, min: 8)
  - `password_confirmation` (string, requis)
- **Réponse Succès :** `204 No Content` (L'utilisateur est créé, connecté, et la session est initialisée).

### 3. Connexion (Login)
- **Méthode :** `POST`
- **Endpoint :** `/login`
- **Paramètres JSON (Body) :**
  - `email` (string, email, requis)
  - `password` (string, requis)
- **Réponse Succès :** `204 No Content` (La session de l'utilisateur est générée).

### 4. Déconnexion (Logout)
- **Méthode :** `POST`
- **Endpoint :** `/logout`
- **Description :** Détruit la session active de l'utilisateur.
- **Réponse Succès :** `204 No Content`

### 5. Obtenir l'utilisateur connecté
- **Méthode :** `GET`
- **Endpoint :** `/api/user`
- **Description :** Renvoie les données de l'utilisateur actuellement authentifié. Ce endpoint est protégé par le middleware `auth:sanctum`.
- **Réponse Succès :** `200 OK` (Retourne l'objet JSON de l'utilisateur).
  - *Exemple :* `{"id": 1, "name": "John Doe", "email": "john@example.com", ...}`

---

## Gestion des Mots de Passe

### 6. Mot de passe oublié (Lien de réinitialisation)
- **Méthode :** `POST`
- **Endpoint :** `/forgot-password`
- **Paramètres JSON (Body) :**
  - `email` (string, email, requis)
- **Réponse Succès :** `200 OK` (Un email avec un lien de réinitialisation a été envoyé).
- **Réponse d'Erreur :** `422 Unprocessable Entity` si l'email n'existe pas.

### 7. Réinitialiser le mot de passe
- **Méthode :** `POST`
- **Endpoint :** `/reset-password`
- **Paramètres JSON (Body) :**
  - `token` (string, requis)
  - `email` (string, email, requis)
  - `password` (string, requis, min: 8)
  - `password_confirmation` (string, requis)
- **Réponse Succès :** `200 OK` (Le mot de passe a été mis à jour).

---

## Vérification d'Email

*(Si la fonctionnalité `MustVerifyEmail` est activée sur le modèle User)*

### 8. Renvoyer l'email de vérification
- **Méthode :** `POST`
- **Endpoint :** `/email/verification-notification`
- **Réponse Succès :** `200 OK` (Email envoyé).

### 9. Vérifier l'email
- **Méthode :** `GET`
- **Endpoint :** `/verify-email/{id}/{hash}`
- **Description :** Lien cliqué par l'utilisateur depuis son email pour valider son compte. L'application frontend doit gérer cette redirection.
