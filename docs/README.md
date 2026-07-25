# Documentation SICRES

Bienvenue dans la documentation officielle du projet **SICRES**.

## 📖 Présentation
[Brève description du projet SICRES : son utilité, ses utilisateurs cibles, sa proposition de valeur.]

## 🎯 Objectif
[Objectif principal du projet, problèmes résolus.]

## 🏗️ Architecture
Le projet suit une architecture moderne décomposée en trois grandes parties :
- **Backend** : API RESTful développée avec Laravel.
- **Frontend** : Application web développée avec Next.js.
- **Infrastructure** : Environnement conteneurisé avec Docker.

Pour plus de détails, consultez la section [Architecture](./architecture/README.md).

## 🛠️ Technologies
- **Backend** : PHP 8, Laravel, PostgreSQL
- **Frontend** : React, Next.js, TypeScript, TailwindCSS
- **Infrastructure** : Docker, Nginx

## 🚀 Installation
1. Clonez le dépôt : `git clone [url]`
2. Installez les dépendances backend : `cd backend && composer install`
3. Installez les dépendances frontend : `cd frontend && npm install`
4. Lancez les conteneurs Docker : `docker-compose up -d`
5. Lancez les migrations : `docker-compose exec php php artisan migrate`

## 📚 Documentation
La documentation est structurée ainsi :
- [Architecture](./architecture/README.md)
- [ADR (Architecture Decision Records)](./adr/)
- [API](./api/)
- [Base de données](./database/)
- [Déploiement](./deployment/)
- [Standards de code](./CODING-STANDARDS.md)

## 🤝 Contribution
Veuillez lire le fichier [Conventions de développement](./architecture/06-Conventions-de-developpement.md) pour connaître les règles de contribution, de nommage et d'utilisation de Git sur ce projet.
