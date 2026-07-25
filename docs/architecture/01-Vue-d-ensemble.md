# 01 - Vue d'ensemble

Cette section décrit l'architecture globale du projet SICRES.

## Architecture Globale

SICRES repose sur une architecture client-serveur classique (Séparation Front/Back) :
- **Frontend** : Une application web construite avec Next.js.
- **Backend** : Une API RESTful construite avec Laravel, qui expose les données et la logique métier.
- **Base de données** : PostgreSQL.
- **Serveur web** : Nginx.

## Vue Logique

Le système est divisé en plusieurs couches logiques :
- **Présentation** (Frontend Next.js)
- **Application / Logique métier** (Backend Laravel : Controllers, Services, Policies)
- **Accès aux données** (Backend Laravel : Repositories, Eloquent ORM)
- **Persistance** (PostgreSQL)

## Vue Physique (Infrastructure)

Tous les composants s'exécutent dans un environnement conteneurisé géré par Docker :
- `nginx` : Gère le routage HTTP.
- `php` : Exécute le code Laravel (PHP-FPM).
- `postgres` : Héberge la base de données relationnelle.
- `node` (optionnel/dev) : Gère le frontend Next.js.

## Vue des Composants

### Frontend (Next.js)
- Composants React
- Hooks personnalisés
- Fournisseurs de contexte (Providers)
- Couche d'appel API

### Backend (Laravel)
- Modules métier (Feature-based)
- Controllers (Points d'entrée API)
- Form Requests (Validation)
- Services (Logique métier)
- Repositories (Abstraction BDD)
- DTO (Data Transfer Objects)

## Flux des Données

1. L'utilisateur interagit avec l'interface React.
2. Next.js effectue une requête HTTP (REST) au backend.
3. Nginx transmet la requête à PHP-FPM.
4. Laravel route la requête vers le Controller approprié.
5. Le Controller valide les données, puis appelle un Service.
6. Le Service applique la logique métier et utilise un Repository pour lire/écrire des données via Eloquent.
7. Eloquent interroge PostgreSQL.
8. La réponse remonte jusqu'au client sous forme de JSON.

## Diagramme Général

*(Insérer ici un diagramme Mermaid ou une image explicative de l'architecture)*
