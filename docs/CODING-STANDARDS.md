# Standards de Code (CODING STANDARDS)

Ce document regroupe les standards de qualité, de code et d'architecture transverses du projet. Il est **la référence de qualité du projet**.

## Principes Généraux

1. **SOLID** : Respecter les 5 principes (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
2. **DRY** (Don't Repeat Yourself) : Éviter la duplication de code. Factoriser.
3. **KISS** (Keep It Simple, Stupid) : Ne pas sur-complexifier le code. Préférer une solution lisible à une solution "clever".
4. **YAGNI** (You Aren't Gonna Need It) : Ne développer que ce qui est nécessaire maintenant, pas ce qui *pourrait* l'être plus tard.
5. **Clean Code** : Le code doit être lu comme de la prose. Les noms de variables, fonctions et classes doivent avoir du sens.

## Bonnes pratiques Laravel

- **PSR-12** : Norme officielle de formatage de code PHP.
- Ne jamais accéder à la base de données depuis les vues (Blade) ou les contrôleurs directement. Toujours utiliser un Service ou un Repository.
- Form Requests : Toujours valider les données entrantes via une classe `FormRequest` dédiée.
- Nommage : Respecter les conventions de Laravel (ex: `UserController` au singulier, table `users` au pluriel).

## Bonnes pratiques Next.js / React

- Favoriser les composants fonctionnels purs.
- Éviter le *Prop Drilling* (utiliser le context ou la composition de composants).
- Séparer la logique de rendu (UI) de la logique de gestion des données (Hooks personnalisés).
- TypeScript : Éviter le type `any` à tout prix. Typer strictement les props et les retours d'API.

## Règles Docker

- Les images construites (`Dockerfile`) doivent être les plus légères possibles.
- Ne pas intégrer d'informations sensibles (`.env`) dans les images Docker.
- Utiliser le mécanisme des variables d'environnement.

## Standards SQL

- Les tables sont en `snake_case` et au pluriel (`utilisateurs` -> `users`).
- Les clés primaires s'appellent `id`.
- Les clés étrangères suivent le format `table_singulier_id` (ex: `user_id`).
- Toujours définir les contraintes d'intégrité (Clés étrangères, `NOT NULL`, `UNIQUE`) pour déléguer la cohérence au SGBD.
