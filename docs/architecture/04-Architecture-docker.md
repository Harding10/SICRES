# 04 - Architecture Docker

L'environnement de développement (et de production) repose sur **Docker** et **Docker Compose** afin de garantir une isolation et une reproductibilité parfaites.

## Services

Le projet `docker-compose.yml` définit plusieurs services :
- `nginx` : Serveur web (reverse proxy) exposant les ports 80/443, configuré pour rediriger le trafic vers PHP-FPM et éventuellement le frontend.
- `php` : Conteneur PHP-FPM avec les extensions nécessaires pour Laravel (PDO, pgsql, etc.).
- `postgres` : Base de données relationnelle.
- `node` (optionnel/dev) : Conteneur pour Next.js (souvent exécuté en local pour plus de souplesse, mais utilisable en conteneur).

## Network

Un réseau interne (bridge) est créé par défaut par Docker Compose, permettant aux services de communiquer entre eux via leurs noms (ex: le backend se connecte à la BDD via l'hôte `postgres`). Ce réseau est isolé de l'extérieur.

## Volumes

Les volumes Docker sont utilisés pour la persistance des données et la synchronisation du code :
- Le code source (`frontend/` et `backend/`) est monté en volume pour permettre un développement avec rechargement à chaud (hot reload).
- Le répertoire de données PostgreSQL est monté sur un volume nommé pour garantir la persistance des données entre les redémarrages.

## Dockerfile

Des fichiers `Dockerfile` spécifiques sont présents pour :
- **PHP** : Pour installer les dépendances (Composer), extensions PHP, et configurer les permissions.
- **Nginx** : Pour intégrer les fichiers de configuration de site.

## Images

Nous utilisons les images officielles minimales (souvent basées sur Alpine Linux) pour réduire la taille globale et la surface d'attaque.

## Communication

- Le frontend (Next.js) interagit avec le backend (Laravel) via les API exposées par Nginx (port 80/443 depuis l'hôte).
- Le serveur web (Nginx) communique avec le moteur PHP (PHP-FPM) via le port TCP 9000.
- PHP (Laravel) communique avec PostgreSQL via le port 5432.
