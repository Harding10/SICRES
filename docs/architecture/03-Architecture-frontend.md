# 03 — Architecture Frontend (Next.js)

> **Mise a jour :** Juillet 2026
> **Stack :** Next.js 14+ / React 18 / TypeScript

---

## Vue d'ensemble

Le frontend SICRES est une **Single Page Application (SPA) avec rendu serveur (SSR)** developpee avec Next.js.
Il comunique avec le backend Laravel via l'API REST protegee par Laravel Sanctum (cookie de session).

```
NAVIGATEUR
    │
    ▼
Nginx (:80/:443)
    │
    ├──► /api/*  ──────────────► Laravel (PHP-FPM :9000)
    │
    └──► /*  ──────────────────► Next.js (:3000)
```

---

## Structure des dossiers

```
frontend/
├── src/
│   ├── app/                    # App Router Next.js 14
│   │   ├── (auth)/             # Groupe: pages publiques
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (dashboard)/        # Groupe: pages protegees
│   │   │   ├── layout.tsx      # Layout avec sidebar
│   │   │   ├── page.tsx        # Dashboard principal
│   │   │   ├── etablissements/
│   │   │   │   ├── page.tsx    # Liste
│   │   │   │   ├── [id]/       # Detail / Edition
│   │   │   │   └── create/     # Creation
│   │   │   ├── declarations/
│   │   │   └── rapports/
│   │   │
│   │   ├── api/                # Routes API Next.js (proxy si necessaire)
│   │   ├── globals.css         # Styles globaux
│   │   └── layout.tsx          # Layout racine
│   │
│   ├── components/             # Composants reutilisables
│   │   ├── ui/                 # Design system (Button, Input, Modal...)
│   │   ├── layout/             # Sidebar, Header, Footer
│   │   └── shared/             # Composants metier partages
│   │
│   ├── features/               # Modules metier (feature-based)
│   │   ├── auth/
│   │   │   ├── components/     # LoginForm, RegisterForm
│   │   │   ├── hooks/          # useAuth, useLogout
│   │   │   └── types.ts        # AuthUser, LoginDTO
│   │   ├── etablissements/
│   │   │   ├── components/     # EtablissementCard, EtablissementForm
│   │   │   ├── hooks/          # useEtablissements, useEtablissement
│   │   │   ├── api.ts          # Appels API CRUD
│   │   │   └── types.ts        # Etablissement, EtablissementDTO
│   │   └── declarations/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── api.ts
│   │       └── types.ts
│   │
│   ├── hooks/                  # Hooks globaux
│   │   ├── useAuth.ts          # Contexte utilisateur
│   │   ├── useToast.ts         # Notifications UI
│   │   └── usePagination.ts    # Pagination
│   │
│   ├── lib/                    # Utilitaires et configuration
│   │   ├── api.ts              # Client HTTP (fetch wrapper avec CSRF)
│   │   ├── auth.ts             # Helpers authentification
│   │   └── utils.ts            # Utilitaires generaux
│   │
│   ├── providers/              # Providers React
│   │   ├── AuthProvider.tsx    # Context authentification
│   │   ├── QueryProvider.tsx   # React Query
│   │   └── ThemeProvider.tsx   # Theme UI
│   │
│   └── types/                  # Types TypeScript globaux
│       ├── api.ts              # ApiResponse<T>, PaginatedResponse<T>
│       └── index.ts
│
├── public/                     # Fichiers statiques
├── Dockerfile                  # Image Docker
├── next.config.ts              # Configuration Next.js
├── tailwind.config.ts          # Configuration TailwindCSS (si utilise)
├── tsconfig.json               # Configuration TypeScript
└── package.json
```

---

## Client HTTP (lib/api.ts)

Toute communication avec le backend passe par ce module. Il gere automatiquement :
- Le cookie CSRF (XSRF-TOKEN de Sanctum)
- Les headers `Accept: application/json`
- La gestion des erreurs 401/422/500

```typescript
// Exemple simplifie
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function csrfCookie(): Promise<void> {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });
}

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
        },
        credentials: 'include',
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new ApiError(response.status, error.message, error.errors);
    }

    return response.json();
}
```

---

## Gestion de l'etat

### Etat serveur (recommande) : React Query / SWR

```typescript
// hooks/useEtablissements.ts
export function useEtablissements(params?: EtablissementParams) {
    return useQuery({
        queryKey: ['etablissements', params],
        queryFn: () => fetchEtablissements(params),
        staleTime: 5 * 60 * 1000, // 5 minutes de cache
    });
}
```

### Etat global (Context) : Auth uniquement

```typescript
// providers/AuthProvider.tsx
interface AuthContext {
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginDTO) => Promise<void>;
    logout: () => Promise<void>;
}
```

### Etat local : useState / useReducer

Pour les formulaires, les modales, et la navigation locale.

---

## Authentification Sanctum (SPA)

Le flux d'authentification avec Laravel Sanctum est **stateful** (basé sur les cookies de session) :

```
1. GET  /sanctum/csrf-cookie     → Initialise le cookie XSRF-TOKEN
2. POST /api/auth/login           → Authentifie, cree la session
3. GET  /api/user                 → Recupere l'utilisateur courant
4. Toutes les requetes suivantes utilisent le cookie de session
5. POST /api/auth/logout          → Detruit la session
```

**Middleware de protection des routes :**

```typescript
// middleware.ts (Next.js)
export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.has('laravel_session');
    const isPublicPath = PUBLIC_PATHS.includes(request.nextUrl.pathname);

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
```

---

## Patterns de composants

### Composants UI (Design System)

```typescript
// components/ui/Button.tsx
interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger' | 'ghost';
    size: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}
```

### Composants Feature

```typescript
// features/etablissements/components/EtablissementForm.tsx
// Utilise un hook, valide les donnees, appelle l'API
// Ne contient PAS de logique metier directement
```

### Pages (Next.js App Router)

```typescript
// app/(dashboard)/etablissements/page.tsx
export default async function EtablissementsPage() {
    // Peut faire du fetching cote serveur (SSR)
    return <EtablissementsListView />;
}
```

---

## Variables d'environnement

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:80
NEXT_PUBLIC_APP_NAME=SICRES
NEXT_PUBLIC_APP_ENV=development
```

---

## Commandes de developpement

```bash
# Via Makefile (recommande)
make frontend-logs      # Voir les logs Next.js
make frontend-shell     # Entrer dans le conteneur frontend

# Via npm (dans le conteneur)
npm run dev             # Serveur de developpement
npm run build           # Build de production
npm run lint            # Linting ESLint
npm run type-check      # Verification TypeScript
```

---

## Standards de code frontend

| Regle | Detail |
|-------|--------|
| TypeScript strict | Pas de `any`, typer toutes les props et retours |
| Composants fonctionnels | Pas de class components |
| Hooks personnalises | Extraire la logique repetee dans des hooks |
| Nommage | PascalCase composants, camelCase hooks (`use` prefix) |
| Import absolus | Configures via `tsconfig.json` (ex: `@/components/ui`) |
| No prop drilling | Utiliser contexte ou composition apres 2 niveaux |

---

*Architecture Frontend SICRES — Next.js 14 — Juillet 2026*
