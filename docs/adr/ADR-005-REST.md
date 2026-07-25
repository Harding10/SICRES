# ADR-005 : Choix de communication (API REST)

## Contexte
Le frontend (Next.js) et le backend (Laravel) doivent communiquer de manière efficace. Les options envisagées étaient REST, GraphQL, et gRPC.

## Décision
Nous avons choisi le standard **RESTful**.

## Justification
- **Simplicité** : Le concept de ressources et de méthodes HTTP (GET, POST, PUT, DELETE) est universellement compris par les développeurs.
- **Cacheabilité** : Les requêtes GET sont facilement mises en cache par le navigateur ou les proxys.
- **Support natif dans Laravel** : Laravel propose d'excellents outils pour construire des API REST (API Resources, Route::apiResource).
- **Pourquoi pas GraphQL ?** GraphQL est puissant pour éviter l'over/under-fetching, mais il ajoute une complexité significative côté serveur (gestion du schéma, N+1 query problem) qui n'est pas justifiée au vu des besoins initiaux du projet.

## Conséquences
- Nous devrons parfois faire plusieurs appels API ou concevoir des endpoints spécifiques pour des vues complexes.
- Les endpoints devront être versionnés si nécessaire (ex: `/api/v1/users`).
