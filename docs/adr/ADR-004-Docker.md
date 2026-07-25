# ADR-004 : Choix de l'Infrastructure (Docker)

## Contexte
Il est nécessaire de définir comment les environnements de développement et de production seront configurés et exécutés. Historiquement, des outils comme XAMPP ou Laragon étaient utilisés.

## Décision
Nous utiliserons **Docker** et **Docker Compose**.

## Justification
- **Reproductibilité** : "Ça marche sur ma machine" disparaît. Tout le monde a exactement les mêmes versions de PHP, Nginx, PostgreSQL, et Node.js.
- **Isolation** : Pas besoin d'installer PHP ou PostgreSQL globalement sur le système de l'hôte.
- **Pourquoi pas Laragon ou XAMPP ?** Ces outils lient le projet à l'OS Windows. Ils ne simulent pas l'environnement de production (qui sera sous Linux) et rendent difficile la cohabitation de différentes versions de PHP ou de bases de données pour plusieurs projets.

## Conséquences
- L'équipe doit se familiariser avec les commandes de base de Docker (`docker-compose up`, `docker-compose exec`).
- Une légère surconsommation de ressources RAM par rapport aux outils natifs.
