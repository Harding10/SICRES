# 06 - Conventions de développement

Ce document définit les règles essentielles que chaque contributeur doit respecter pour garantir la qualité et l'homogénéité du code au sein du projet SICRES.

## Convention Git

- **Branches** :
  - `main` : Code stable et déployable en production.
  - `develop` : Code en cours d'intégration.
  - `feature/nom-fonctionnalite` : Pour les nouvelles fonctionnalités.
  - `bugfix/nom-bug` : Pour les corrections de bugs.
- **Commits** : Nous suivons les **Conventional Commits**.
  - `feat: ajout de la gestion des utilisateurs`
  - `fix: correction de l'affichage du menu`
  - `docs: mise à jour de l'architecture`
  - `refactor: nettoyage du code backend`

## Convention Laravel (Backend)

- Respecter le standard PSR-12.
- Utiliser les classes formelles et éviter les *magic strings*.
- Séparer la logique métier dans des **Services**.
- Les contrôleurs doivent être fins (*Thin Controllers*).
- Typer strictement les paramètres et retours de méthodes (PHP 8).

## Convention Next.js (Frontend)

- Utiliser systématiquement **TypeScript**.
- Les composants doivent être fonctionnels avec utilisation des Hooks.
- Nommer les fichiers et dossiers en `kebab-case` ou `camelCase` selon la convention choisie (ex: `user-profile.tsx` ou `UserProfile.tsx`).
- Pas de CSS direct dans les fichiers TSX, utiliser **TailwindCSS**.

## Convention Docker

- Utiliser `docker-compose up -d` pour lancer l'environnement.
- Ne pas modifier directement le code dans le conteneur, utiliser les volumes.
- Les nouvelles dépendances (Composer/NPM) doivent être installées via les conteneurs (`docker-compose exec ...`).

## Convention de Nommage

- **Classes / Modèles (PHP/TS)** : `PascalCase`
- **Méthodes / Fonctions (PHP/TS)** : `camelCase`
- **Variables** : `camelCase` (descriptif, pas de `a`, `b`, `c`)
- **Fichiers React** : `PascalCase.tsx` pour les composants exportés par défaut, `kebab-case.ts` pour les utilitaires.
- **Tables BDD** : `snake_case` (pluriel).

## Standardisation

Toute l'équipe est invitée à consulter et appliquer scrupuleusement ces règles avant chaque Pull Request (Merge Request).
