# SICRES Frontend

Frontend Next.js pour SICRES.

## Prérequis

- Node.js 22+
- npm

## Démarrage local

```bash
cd frontend
npm install
npm run dev
```

## URL locale

- Frontend : http://localhost:3000
- API backend : http://localhost:8100

## Authentification

La page de connexion est disponible sur :

- http://localhost:3000/login

Les fichiers principaux sont :

- [app/login/page.tsx](app/login/page.tsx)
- [features/auth/components/LoginForm.tsx](features/auth/components/LoginForm.tsx)
- [features/auth/services/authService.ts](features/auth/services/authService.ts)
- [contexts/AuthContext.tsx](contexts/AuthContext.tsx)

## Variables d’environnement

```env
NEXT_PUBLIC_API_URL=http://localhost:8100
```

## Documentation

- [../docs/authentification-login.md](../docs/authentification-login.md)
