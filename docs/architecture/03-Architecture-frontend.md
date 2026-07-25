# 03 - Architecture Frontend

Le frontend est développé avec **Next.js** et **React**.

## Next.js

Nous utilisons Next.js pour tirer parti du Server-Side Rendering (SSR), de la génération statique (SSG) et d'un routage basé sur le système de fichiers (App Router).

## Feature Based Architecture

Comme pour le backend, le code frontend est structuré par fonctionnalités (*features*) plutôt que par type technique (components, hooks, etc.).
Un dossier `features/` contient des sous-dossiers pour chaque domaine de l'application.
Chaque fonctionnalité contient ses propres composants, hooks, api, et types.

## State Management

La gestion de l'état global est minimisée. Nous privilégions :
- L'état local avec `useState` / `useReducer` pour les composants isolés.
- L'état serveur (cache, requêtes) géré par des outils dédiés (ex: React Query ou SWR).
- Des contextes (Context API) uniquement pour des états globaux transverses (Thème, Authentification, Préférences).

## Providers

Les **Providers** globaux (Auth, Theme, etc.) sont regroupés et enveloppent l'application à la racine, fournissant les contextes nécessaires à l'ensemble des composants.

## API

La couche API encapsule tous les appels réseau.
Des fonctions dédiées sont créées pour chaque endpoint, centralisant la configuration des requêtes (headers, tokens d'authentification) et la gestion des erreurs.

## Components

Les composants sont divisés en :
- **Composants d'interface utilisateur (UI / Commons)** : Boutons, formulaires, modales (souvent basés sur un design system).
- **Composants métiers (Features)** : Composants spécifiques à une fonctionnalité, connectés aux données.
- **Pages** : Composants de niveau supérieur qui composent les éléments de l'interface en utilisant les Layouts.

## Hooks

Des **Hooks personnalisés** (custom hooks) sont créés pour encapsuler la logique complexe ou réutilisable, notamment pour l'appel aux API, la gestion de l'authentification ou les interactions UI complexes.
