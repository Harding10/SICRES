# 02 — Architecture Backend (Laravel 13)

> **Mise a jour :** Juillet 2026

---

## Organisation des dossiers

```
backend/
├── app/
│   ├── Modules/                    # Modules metier (feature-based)
│   │   ├── Auth/
│   │   │   ├── Controllers/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Etablissement/
│   │   │   ├── Controllers/        # EtablissementController
│   │   │   ├── Services/           # EtablissementService
│   │   │   ├── Repositories/      # EtablissementRepository
│   │   │   ├── DTO/               # EtablissementDTO
│   │   │   ├── Models/            # Etablissement (Eloquent)
│   │   │   ├── Policies/          # EtablissementPolicy
│   │   │   ├── Requests/          # StoreEtablissementRequest
│   │   │   ├── Resources/         # EtablissementResource
│   │   │   └── Events/            # EtablissementCree
│   │   ├── Declaration/
│   │   ├── User/
│   │   └── Reporting/
│   │
│   ├── Models/                     # Modeles Eloquent globaux
│   ├── Http/Middleware/            # Middlewares Laravel
│   └── Providers/                  # Service Providers
│
├── database/
│   ├── migrations/                 # Migrations (ordre chronologique)
│   ├── seeders/                    # Donnees de test
│   └── factories/                  # Factories pour les tests
│
├── routes/
│   ├── api.php                     # Routes API REST
│   └── web.php                     # Routes web (Sanctum CSRF)
│
└── tests/
    ├── Feature/                    # Tests d'integration (API)
    └── Unit/                       # Tests unitaires (Services)
```

---

## Patterns utilises

### Service Layer

Chaque module possede un **Service** qui contient la logique metier.
Les Controllers ne font que : valider → appeler le Service → retourner la Resource.

```php
// Controller
public function store(StoreEtablissementRequest $request): JsonResponse
{
    $dto = EtablissementDTO::fromRequest($request);
    $etablissement = $this->etablissementService->create($dto);
    return EtablissementResource::make($etablissement)
        ->response()
        ->setStatusCode(201);
}

// Service
public function create(EtablissementDTO $dto): Etablissement
{
    $etablissement = $this->repository->create($dto->toArray());
    event(new EtablissementCree($etablissement));
    return $etablissement;
}
```

### Repository Pattern

Abstraction de la couche base de donnees.
Facilite les tests unitaires (mock du repository).

```php
interface EtablissementRepositoryInterface
{
    public function all(array $filters = []): LengthAwarePaginator;
    public function findById(int $id): ?Etablissement;
    public function create(array $data): Etablissement;
    public function update(int $id, array $data): Etablissement;
    public function delete(int $id): bool;
}
```

### DTO (Data Transfer Objects)

Transfert de donnees type-safe entre les couches.

```php
class EtablissementDTO
{
    public function __construct(
        public readonly string $nom,
        public readonly string $type,
        public readonly string $secteur,
        public readonly string $region,
        public readonly string $ville,
        public readonly ?string $email = null,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            nom: $request->string('nom'),
            type: $request->string('type'),
            secteur: $request->string('secteur'),
            region: $request->string('region'),
            ville: $request->string('ville'),
            email: $request->string('email') ?: null,
        );
    }
}
```

### API Resources

Transformation des modeles Eloquent en JSON : controle ce qui est expose.

```php
class EtablissementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'nom'      => $this->nom,
            'code'     => $this->code,
            'type'     => $this->type,
            'secteur'  => $this->secteur,
            'region'   => $this->region,
            'ville'    => $this->ville,
            'email'    => $this->email,
            'statut'   => $this->statut,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
```

---

## Securite

| Mesure | Implementation |
|--------|----------------|
| Authentification | Laravel Sanctum (session cookie) |
| Autorisation | Laravel Policies (RBAC par module) |
| Validation | Form Requests (avant le controller) |
| Rate limiting | Middleware `throttle:api` + Nginx |
| CORS | `config/cors.php` — domaines autorises |
| SQL Injection | Eloquent ORM (requetes preparees) |
| XSS | API JSON (pas de rendu HTML cote backend) |

---

## Queues et jobs asynchrones

Les operations longues sont delocalisees dans des jobs :

| Job | Declencheur | Description |
|-----|------------|-------------|
| `EnvoiEmailConfirmationJob` | Soumission declaration | Email de confirmation |
| `CalculStatistiquesJob` | Fin de campagne | Agregation des donnees |
| `ExportExcelJob` | Demande rapport | Generation fichier Excel |
| `NotificationValidationJob` | Validation/Rejet | Notification a l'etablissement |

**Commande de monitoring :**
```bash
make logs-queue              # Voir les jobs en cours
make artisan CMD="queue:work --once"  # Traiter 1 job manuellement
```

---

*Architecture Backend SICRES — Juillet 2026*
