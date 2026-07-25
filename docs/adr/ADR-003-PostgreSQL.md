# ADR-003 : Choix du SGBD (PostgreSQL)

## Contexte
L'application SICRES doit stocker et traiter des données de manière fiable, avec potentiellement des relations complexes. Nous avons évalué MySQL, PostgreSQL et MongoDB.

## Décision
Nous avons choisi **PostgreSQL**.

## Justification
- **Intégrité et respect des standards** : PostgreSQL est reconnu pour son stricte respect des standards SQL et sa fiabilité.
- **Fonctionnalités avancées** : Il gère très bien le type de données JSONB, ce qui nous permet d'avoir la flexibilité d'une base NoSQL tout en conservant la structure d'une base relationnelle.
- **Pourquoi pas MySQL ?** Bien que très populaire, MySQL est parfois moins strict sur les contraintes et offre des fonctionnalités légèrement moins avancées que PostgreSQL pour des requêtes très complexes.
- **Pourquoi pas MongoDB (NoSQL) ?** Les données du domaine SICRES sont très structurées et relationnelles par nature. Le NoSQL n'est donc pas adapté comme source de vérité principale.

## Conséquences
- L'ORM Eloquent de Laravel sera configuré avec le driver `pgsql`.
- Les sauvegardes et restaurations se feront via `pg_dump` et `pg_restore`.
