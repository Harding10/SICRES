# 🔐 MODULE 1 - AUTHENTIFICATION

## AUTH-001: Backend - Setup Sanctum Auth Middleware

**Priorité:** 🔴 HIGH  
**Type:** Backend  
**Dépendances:** None  
**Durée estimée:** 3-4 jours

### Description
Configure Laravel Sanctum pour l'authentification API, setup middleware d'authentification pour les routes protégées et configure CORS pour la communication frontend.

### Tâches techniques

#### 1. Configuration Sanctum
- [ ] Install Sanctum si absent: `composer require laravel/sanctum`
- [ ] Publish config: `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
- [ ] Run migrations: `php artisan migrate`
- [ ] Ajouter middleware `EnsureFrontendRequestsAreStateful` à `api` group dans routes
- [ ] Ajouter `Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful` au middleware

#### 2. Middleware de Protection
- [ ] Créer custom middleware pour valider tokens Sanctum
- [ ] Ajouter middleware `auth:sanctum` aux routes API protégées
- [ ] Implémenter validation de token expirés

#### 3. CORS Configuration
- [ ] Configurer `config/cors.php`:
  - Paths: `['api/*', 'sanctum/csrf-token']`
  - Allowed origins: `http://localhost:3000` (development)
  - Credentials: `true`
- [ ] Ajouter header `Authorization: Bearer {token}` support

#### 4. Routes de Base
- [ ] POST `/api/login` - Connexion utilisateur
- [ ] POST `/api/logout` - Déconnexion
- [ ] POST `/api/refresh` - Refresh token
- [ ] GET `/api/user` - Current user info

### Fichiers à modifier/créer
```
backend/
├── config/
│   ├── cors.php (modifier)
│   └── sanctum.php (check)
├── routes/
│   └── api.php (ajouter middleware)
├── app/Http/
│   ├── Middleware/ (check middleware)
│   └── Controllers/Auth/ (check login logic)
└── database/
    └── migrations/ (run sanctum migrations)
```

### API Endpoints
```
POST /api/login
Content-Type: application/json
{
  "email": "school@example.com",
  "password": "password123"
}

Response: {
  "user": { id, name, email, role },
  "token": "1|abc123..."
}

---

GET /api/user
Authorization: Bearer {token}

Response: { id, name, email, role }

---

POST /api/logout
Authorization: Bearer {token}

Response: { message: "Logged out" }
```

### Tests à réaliser
- [ ] POST /api/login avec credentials valides → retourne user + token
- [ ] POST /api/login avec credentials invalides → 401 Unauthorized
- [ ] GET /api/user sans token → 401 Unauthenticated
- [ ] GET /api/user avec token valide → retourne user
- [ ] GET /api/user avec token expiré → 401
- [ ] POST /api/logout → invalide token

### Notes
- Sanctum crée des tokens longs terme (pas d'expiration par défaut)
- Configurer expiration si nécessaire dans `config/sanctum.php`
- Frontend doit stocker token en localStorage ou sessionStorage
- Toujours valider CSRF token pour routes web

---

## AUTH-002: Frontend - Create Login Page

**Priorité:** 🔴 HIGH  
**Type:** Frontend  
**Dépendances:** AUTH-001  
**Durée estimée:** 2-3 jours

### Description
Build login form component avec validation d'email/password, intégration avec endpoint `/api/login` et stockage sécurisé des tokens.

### Tâches techniques

#### 1. Login Form Component
- [ ] Créer `components/Auth/LoginForm.tsx`
- [ ] Champs: email, password
- [ ] Validation:
  - Email: format valide
  - Password: min 8 caractères
- [ ] Submit button disabled pendant requête
- [ ] Messages d'erreur clairs

#### 2. Authentification et Token Management
- [ ] Créer `utils/auth.ts`:
  - `login(email, password)` - appel API
  - `logout()` - clear token
  - `getToken()` - retrieve token from storage
  - `setToken(token)` - secure storage
- [ ] Stocker token en localStorage avec prefix `sicres_`
- [ ] Ajouter token à header Authorization dans Axios

#### 3. Login Page
- [ ] Créer `app/auth/login/page.tsx`
- [ ] Layout: simple, centré, branding SICRES
- [ ] Inclure formulaire LoginForm
- [ ] Lien "Mot de passe oublié" → page recovery
- [ ] Lien "Pas encore de compte?" → page signup

#### 4. Redirect et Navigation
- [ ] After successful login:
  - Stocker user data en context/state
  - Redirect vers dashboard (admin ou school based on role)
- [ ] Erreur login → afficher message rouge
- [ ] Loading state → disable button

### Fichiers à créer/modifier
```
sirfrontend/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx (create)
│   │   └── layout.tsx (create)
│   └── layout.tsx (modify)
├── components/
│   ├── Auth/
│   │   └── LoginForm.tsx (create)
│   └── UI/ (forms, buttons, inputs)
├── utils/
│   ├── auth.ts (create)
│   ├── api.js (modify - add token to headers)
│   └── storage.ts (create - safe token storage)
└── context/
    └── AuthContext.tsx (create)
```

### UI/UX
```
┌─────────────────────────┐
│      SICRES Logo        │
│  Plateforme de         │
│  Recensement           │
├─────────────────────────┤
│ Email                   │
│ [__________________]    │
│                         │
│ Mot de passe            │
│ [__________________]    │
│ □ Mémoriser le MDP      │
│ [Connexion]             │
│                         │
│ [Mot de passe oublié?]  │
│ [Créer un compte]       │
└─────────────────────────┘
```

### States & Errors
```
Loading: Button disabled, spinner
Success: Token stored, redirect
Error: "Email ou mot de passe incorrect"
Error: "Compte non vérifié"
Error: "Compte désactivé"
```

### Tests à réaliser
- [ ] Form valide requiert email et password
- [ ] Submit avec credentials valides → token stored
- [ ] Après login → redirect to dashboard
- [ ] Erreur API → affiche message
- [ ] Empty form → submit disabled

### Notes
- Token doit être envoyé en Authorization header
- Implémenter token refresh automatique si expiré
- Prévoir page dédiée pour "Mot de passe oublié"
- UI doit être accessible (ARIA labels)

---

## AUTH-003: Frontend - Implement Auth Middleware

**Priorité:** 🔴 HIGH  
**Type:** Frontend  
**Dépendances:** AUTH-002  
**Durée estimée:** 2-3 jours

### Description
Créer Next.js middleware pour protéger les routes, handle token refresh automatique et rediriger utilisateurs non-authenticés vers login.

### Tâches techniques

#### 1. Route Protection Middleware
- [ ] Créer `middleware.ts` à la racine Next.js
- [ ] Routes publiques: `/auth/login`, `/auth/register`, `/auth/recover`
- [ ] Routes protégées: `/dashboard/*`, `/schools/*`, `/campaigns/*`
- [ ] Routes admin-only: `/admin/*`
- [ ] Check token before accessing protected routes

#### 2. Token Validation & Refresh
- [ ] Middleware vérifie token existence
- [ ] Si token manquant → redirect `/auth/login`
- [ ] If token near expiration (< 5 min) → refresh automatique
- [ ] If refresh fails → logout et redirect login
- [ ] Implémenter POST `/api/refresh` appel

#### 3. Role-Based Access Control
- [ ] Middleware check user role du token
- [ ] Routes `/admin/*` require `admin` role
- [ ] Routes `/schools/*` require `school_director` role
- [ ] Redirect non-authorized users → `/dashboard`

#### 4. AuthContext Setup
- [ ] Créer `context/AuthContext.tsx`:
  - `user` state
  - `isAuthenticated` state
  - `role` state
  - `logout()` method
  - `refreshUser()` method
- [ ] Provider wrapper pour l'app entière
- [ ] Custom hook `useAuth()`

### Fichiers à créer/modifier
```
sirfrontend/
├── middleware.ts (create)
├── next.config.ts (modify if needed)
├── context/
│   └── AuthContext.tsx (create/modify)
├── hooks/
│   └── useAuth.ts (create)
├── utils/
│   └── auth.ts (modify - add refresh logic)
└── app/
    └── layout.tsx (wrap with AuthProvider)
```

### Middleware Logic
```typescript
// middleware.ts pseudocode
export function middleware(request: NextRequest) {
  const token = request.cookies.get('sicres_token');
  const pathname = request.nextUrl.pathname;
  
  // Public routes - allow
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Protected routes - require token
  if (!token && PROTECTED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Validate token (could be done server-side)
  if (token && isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|public).*)'],
};
```

### Protected Routes
```
✅ Public (no auth needed):
  - /auth/login
  - /auth/register
  - /auth/recover
  - /

❌ Protected (auth required):
  - /dashboard
  - /schools/*
  - /campaigns/*
  - /declarations/*
  - /documents/*
  - /account/*

🔐 Admin-only (admin role required):
  - /admin/*
  - /admin/schools
  - /admin/campaigns
  - /admin/validations
```

### Tests à réaliser
- [ ] Access `/dashboard` sans token → redirect `/auth/login`
- [ ] Access `/dashboard` avec token valide → allow
- [ ] Access `/admin/*` sans role admin → redirect `/dashboard`
- [ ] Token near expiry → refresh automatique
- [ ] Token refresh fails → logout et redirect login
- [ ] Logout → clear token et redirect login

### Notes
- Stockage token: localStorage ou httpOnly cookies
- httpOnly cookies plus sécurisé mais complexe avec Next.js
- Implémenter token refresh silencieux en background
- Gérer token expiration gracefully (page recharge pas nécessaire)
