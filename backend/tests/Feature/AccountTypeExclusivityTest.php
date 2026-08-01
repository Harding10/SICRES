<?php

namespace Tests\Feature;

use App\Exceptions\AccountTypeConflictException;
use App\Models\AdminCommunal;
use App\Models\Commune;
use App\Models\ResponsableEtablissement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AccountTypeExclusivityTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function un_admin_communal_ne_peut_pas_devenir_un_responsable_etablissement(): void
    {
        // 1. ARRANGE
        $commune = Commune::create([
            'nom' => 'Port-Bouët',
            'region' => 'Abidjan',
        ]);

        $user = User::factory()->create();

        AdminCommunal::create([
            'user_id' => $user->id,
            'commune_id' => $commune->id,
        ]);

        // 2. ASSERT (attente de l'exception)
        $this->expectException(AccountTypeConflictException::class);

        // 3. ACT
        ResponsableEtablissement::create([
            'user_id' => $user->id,
        ]);
    }

    #[Test]
    public function un_responsable_etablissement_ne_peut_pas_devenir_un_admin_communal(): void
    {
        // 1. ARRANGE
        $commune = Commune::create([
            'nom' => 'Port-Bouët',
            'region' => 'Abidjan',
        ]);

        $user = User::factory()->create();

        ResponsableEtablissement::create([
            'user_id' => $user->id,
        ]);

        // 2. ASSERT (attente de l'exception)
        $this->expectException(AccountTypeConflictException::class);

        // 3. ACT
        AdminCommunal::create([
            'user_id' => $user->id,
            'commune_id' => $commune->id,
        ]);
    }
}
