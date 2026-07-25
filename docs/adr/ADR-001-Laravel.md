# ADR-001 : Choix du framework Backend (Laravel)

## Contexte
Nous devons développer une API backend robuste, sécurisée et maintenable pour le projet SICRES. L'équipe a évalué plusieurs options, notamment Spring (Java), NestJS (Node.js) et Laravel (PHP).

## Décision
Nous avons choisi **Laravel** (PHP 8).

## Justification
- **Écosystème riche** : Laravel fournit nativement l'authentification (Sanctum), l'ORM (Eloquent), la validation des requêtes et un système de routage très performant.
- **Productivité** : La rapidité de développement avec Laravel est supérieure grâce à des outils comme Artisan.
- **Pourquoi pas Spring ?** Spring est extrêmement robuste, mais peut s'avérer lourd et "overkill" pour ce projet. Le temps de mise en place et la verbosité de Java pourraient ralentir le développement initial.
- **Pourquoi pas NestJS ?** Bien que NestJS offre une excellente architecture basée sur TypeScript, Laravel est plus mature sur certaines fonctionnalités "out of the box" comme l'ORM relationnel complexe et les migrations.

## Conséquences
- Nécessite des compétences en PHP.
- Dépendance à l'écosystème Composer.
- Performance très bonne pour notre cas d'usage avec PHP-FPM, même si moins adaptée au temps réel pur qu'un backend Node.js.
