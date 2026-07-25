# 05 - Structure des dossiers

Le projet est divisé en plusieurs grands dossiers à la racine, séparant clairement les responsabilités.

```text
SICRES/
├── backend/               # Code source de l'API Laravel
├── frontend/              # Code source de l'application Next.js
├── docker/                # Configurations Docker (Dockerfile, scripts d'init)
├── docs/                  # Documentation du projet (ce dossier)
├── docker-compose.yml     # Orchestration des conteneurs
└── README.md              # Point d'entrée général
```

## Backend (Laravel)

```text
backend/
├── app/
│   ├── Http/Controllers/
│   ├── Models/
│   ├── Services/          # Logique métier pure
│   ├── Repositories/      # Accès aux données
│   └── ...
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php
│   └── web.php
└── tests/
```

## Frontend (Next.js)

```text
frontend/
├── app/                   # App Router (Pages et Layouts)
├── components/            # Composants UI partagés
├── features/              # Modules métier (Auth, Dashboard...)
│   └── featureName/
│       ├── components/
│       ├── hooks/
│       └── api/
├── lib/                   # Configurations globales (Axios, utils...)
└── types/                 # Définitions TypeScript globales
```

## Docker

```text
docker/
├── nginx/                 # Fichiers de configuration Nginx
├── php/                   # Dockerfile et configurations PHP (php.ini)
└── postgres/              # Scripts d'initialisation SQL
```
