# 02 - Architecture Backend

L'API backend est développée avec le framework **Laravel**. Nous appliquons des principes de séparation des responsabilités et une architecture orientée domaine (ou modules).

## Laravel

Le projet utilise les fonctionnalités standards de Laravel (Routing, Middleware, Eloquent, etc.) mais structure son code de manière à éviter les *Fat Controllers* et à centraliser la logique métier.

## Modules

Le code est organisé par modules métier (Domain-Driven Design "Light" ou Feature-based) plutôt que par type technique (Controllers, Models, Views). Chaque module encapsule ses propres routes, contrôleurs, services, etc.

## Services

Les **Services** contiennent la logique métier pure de l'application. Un contrôleur ne doit faire que gérer la requête HTTP et la réponse, et déléguer tout le traitement au service.

## Repository

Le pattern **Repository** est utilisé pour abstraire les accès à la base de données. Cela permet de séparer la logique d'accès aux données (Eloquent) de la logique métier (Services), facilitant ainsi les tests et les évolutions.

## DTO (Data Transfer Objects)

Les **DTO** sont utilisés pour transférer des données entre les différentes couches de l'application (par exemple, du Controller au Service), garantissant un format de données strictement typé et prédictible.

## Policies

Les **Policies** de Laravel gèrent les autorisations complexes de l'application. Elles définissent si un utilisateur a le droit d'effectuer une action précise sur une ressource donnée.

## Resources

Les **API Resources** (ou JSON Resources) de Laravel formatent et filtrent les données renvoyées par l'API pour s'assurer que les réponses JSON respectent un contrat strict.

## Auth & Sanctum

L'authentification s'appuie sur **Laravel Sanctum**. Sanctum fournit un système léger d'authentification par jeton (token) pour l'API REST, sécurisant les échanges entre le frontend Next.js et le backend Laravel.
