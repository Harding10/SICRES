# Documentation de la page de connexion SICRES

## Objectif

Ce document explique comment la page de connexion a été mise en place dans le projet SICRES, depuis l’interface utilisateur jusqu’au backend Laravel.

## 1. Architecture du flux de connexion

Le flux suit cette logique :

1. L’utilisateur remplit le formulaire de connexion sur la page Next.js.
2. Le frontend envoie la requête au backend Laravel.
3. Laravel valide les identifiants avec Sanctum / Auth.
4. Si la connexion réussit, l’utilisateur est enregistré dans la session et le frontend peut récupérer l’utilisateur courant.

## 2. Fichiers principaux

### Frontend

- [frontend/app/login/page.tsx](../frontend/app/login/page.tsx)
  - Page de la route `/login`.
  - Affiche la structure visuelle du formulaire.

- [frontend/features/auth/components/LoginForm.tsx](../frontend/features/auth/components/LoginForm.tsx)
  - Formulaire de connexion.
  - Gère les champs email et mot de passe.

- [frontend/features/auth/services/authService.ts](../frontend/features/auth/services/authService.ts)
  - Service qui envoie la requête de connexion au backend.

- [frontend/contexts/AuthContext.tsx](../frontend/contexts/AuthContext.tsx)
  - Contexte React qui stocke l’utilisateur connecté.

### Backend

- [backend/routes/auth.php](../backend/routes/auth.php)
  - Déclare la route POST `/login`.

- [backend/app/Http/Controllers/Auth/AuthenticatedSessionController.php](../backend/app/Http/Controllers/Auth/AuthenticatedSessionController.php)
  - Contrôleur qui traite la connexion.

- [backend/app/Http/Requests/Auth/LoginRequest.php](../backend/app/Http/Requests/Auth/LoginRequest.php)
  - Validation des données et authentification via Laravel.

## 3. Fonctionnement

### Sur le frontend

Le formulaire récupère les valeurs email et password, puis appelle la fonction `login()`.
Cette fonction envoie une requête HTTP au backend.

### Sur le backend

Laravel reçoit la requête sur `/login`, vérifie les informations et crée la session utilisateur.

## 4. URL à utiliser

En environnement Docker local, l’API est accessible sur :

- http://localhost:8100/api/login
- http://localhost:8100/api/user

## 5. Exemple de test avec curl

```bash
curl -i -X POST http://localhost:8100/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin.communal@sicres.ci","password":"Sic@2026!Pb"}'
```

## 6. Points à retenir

- Le frontend doit envoyer les cookies de session si l’authentification est basée sur Sanctum.
- Le backend doit être accessible sur un port libre, ici `8100`, pour éviter les conflits avec d’autres services locaux.
- La page de connexion est un point d’entrée important pour l’authentification de l’application.
