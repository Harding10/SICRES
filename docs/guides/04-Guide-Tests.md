# Guide de Tests — SICRES

> **Framework :** PHPUnit (Laravel) / Jest + Testing Library (Next.js)
> **Derniere mise a jour :** Juillet 2026

---

## Philosophie

```
Tests d'unite      → Valider la logique metier isolee (Services, DTOs)
Tests d'integration → Valider les interactions entre couches (API + DB)
Tests End-to-End   → Valider les flux utilisateur complets (optionnel)
```

**Ratio recommande : 70% Integration / 20% Unite / 10% E2E**

---

## Backend Laravel (PHPUnit)

### Structure des tests

```
backend/tests/
├── Feature/                    # Tests d'integration (API)
│   ├── Auth/
│   │   ├── LoginTest.php
│   │   └── LogoutTest.php
│   ├── Etablissement/
│   │   ├── ListEtablissementTest.php
│   │   ├── CreateEtablissementTest.php
│   │   └── UpdateEtablissementTest.php
│   └── Declaration/
│       ├── SoumettreDeclarationTest.php
│       └── ValiderDeclarationTest.php
│
└── Unit/                       # Tests unitaires
    ├── Services/
    │   ├── EtablissementServiceTest.php
    │   └── DeclarationServiceTest.php
    └── DTOs/
        └── EtablissementDTOTest.php
```

---

### Tests d'integration (Feature Tests)

Testent un endpoint API de bout en bout (request HTTP → response JSON).

```php
<?php

namespace Tests\Feature\Etablissement;

use App\Models\User;
use App\Modules\Etablissement\Models\Etablissement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListEtablissementTest extends TestCase
{
    use RefreshDatabase;

    public function test_utilisateur_non_authentifie_recoit_401(): void
    {
        $response = $this->getJson('/api/etablissements');
        $response->assertStatus(401);
    }

    public function test_liste_des_etablissements_pagines(): void
    {
        $user = User::factory()->create(['role' => 'lecteur']);
        Etablissement::factory(15)->create();

        $response = $this->actingAs($user)
            ->getJson('/api/etablissements?per_page=10');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'nom', 'code', 'type', 'region', 'statut'],
                ],
                'meta' => ['current_page', 'total', 'per_page', 'last_page'],
            ])
            ->assertJsonCount(10, 'data');
    }

    public function test_filtre_par_region(): void
    {
        $user = User::factory()->create();
        Etablissement::factory(5)->create(['region' => 'Dakar']);
        Etablissement::factory(3)->create(['region' => 'Thies']);

        $response = $this->actingAs($user)
            ->getJson('/api/etablissements?region=Dakar');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data');
    }
}
```

---

### Tests unitaires (Unit Tests)

Testent la logique d'une classe isolee (mock des dependances).

```php
<?php

namespace Tests\Unit\Services;

use App\Modules\Etablissement\DTO\EtablissementDTO;
use App\Modules\Etablissement\Repositories\EtablissementRepositoryInterface;
use App\Modules\Etablissement\Services\EtablissementService;
use Mockery;
use Tests\TestCase;

class EtablissementServiceTest extends TestCase
{
    public function test_creation_etablissement_via_service(): void
    {
        $repository = Mockery::mock(EtablissementRepositoryInterface::class);
        $repository->shouldReceive('create')
            ->once()
            ->withArgs(fn($data) => $data['nom'] === 'Hopital Regional')
            ->andReturn(new Etablissement(['nom' => 'Hopital Regional']));

        $service = new EtablissementService($repository);

        $dto = new EtablissementDTO(
            nom: 'Hopital Regional',
            type: 'hopital',
            secteur: 'public',
            region: 'Dakar',
            ville: 'Dakar',
        );

        $result = $service->create($dto);

        $this->assertEquals('Hopital Regional', $result->nom);
    }
}
```

---

### Factories (donnees de test)

```php
<?php
// database/factories/EtablissementFactory.php

class EtablissementFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code'    => 'ES-' . $this->faker->unique()->numerify('####'),
            'nom'     => $this->faker->company() . ' Medical Center',
            'type'    => $this->faker->randomElement(['hopital', 'clinique', 'centre_sante']),
            'secteur' => $this->faker->randomElement(['public', 'prive']),
            'region'  => $this->faker->randomElement(['Dakar', 'Thies', 'Saint-Louis', 'Ziguinchor']),
            'ville'   => $this->faker->city(),
            'statut'  => 'actif',
        ];
    }
}
```

---

### Commandes de test

```bash
# Executer tous les tests
make test

# Equivalent direct
docker compose exec php php artisan test

# Tests specifiques
docker compose exec php php artisan test --filter=ListEtablissementTest
docker compose exec php php artisan test tests/Feature/Etablissement/

# Avec couverture de code (HTML)
docker compose exec php php artisan test --coverage-html storage/coverage

# Mode verbose
docker compose exec php php artisan test --verbose
```

---

### Configuration PHPUnit (`phpunit.xml`)

```xml
<phpunit>
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>

    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="pgsql"/>
        <env name="DB_DATABASE" value="sicres_test"/>
        <env name="CACHE_DRIVER" value="array"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="QUEUE_DRIVER" value="sync"/>
        <env name="MAIL_MAILER" value="array"/>
    </php>
</phpunit>
```

---

## Frontend Next.js (Jest + Testing Library)

### Structure des tests

```
frontend/src/
└── __tests__/
    ├── components/
    │   └── ui/
    │       └── Button.test.tsx
    └── features/
        └── etablissements/
            ├── hooks/
            │   └── useEtablissements.test.ts
            └── components/
                └── EtablissementForm.test.tsx
```

### Exemple de test composant

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { EtablissementForm } from '@/features/etablissements/components/EtablissementForm';

describe('EtablissementForm', () => {
    it('affiche une erreur si le nom est vide', async () => {
        render(<EtablissementForm onSubmit={jest.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

        expect(await screen.findByText(/le nom est obligatoire/i)).toBeInTheDocument();
    });

    it('appelle onSubmit avec les donnees valides', async () => {
        const mockSubmit = jest.fn();
        render(<EtablissementForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText(/nom/i), {
            target: { value: 'Hopital Test' },
        });

        fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

        expect(mockSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ nom: 'Hopital Test' })
        );
    });
});
```

---

## Checklist qualite avant merge

- [ ] Tous les tests passent (`make test`)
- [ ] Couverture > 70% sur les Services
- [ ] Pas de `dd()` / `var_dump()` oublies dans le code
- [ ] Pas de `console.log` en production
- [ ] Les nouvelles fonctionnalites ont des tests Feature
- [ ] Les Form Requests ont leurs regles de validation testees
- [ ] Le linting passe (`php-cs-fixer`, `eslint`)

---

*Guide de Tests SICRES — Juillet 2026*
