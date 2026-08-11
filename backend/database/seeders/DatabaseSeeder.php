<?php

namespace Database\Seeders;

use App\Models\AdminCommunal;
use App\Models\Commune;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Vérification que le mot de passe est bien défini
        $adminPassword = config('services.admin_seed.password');

        if (empty($adminPassword)) {
            throw new RuntimeException(
                "Impossible d'exécuter le Seeder : la variable ADMIN_SEED_PASSWORD n'est pas définie dans votre fichier .env !"
            );
        }

        // 2. Création de la Commune (idempotent)
        $commune = Commune::firstOrCreate(
            ['nom' => 'Port-Bouët'],
            ['region' => 'Abidjan']
        );

        // 3. Création de l'utilisateur admin (idempotent)
        $user = User::firstOrCreate(
            ['email' => config('services.admin_seed.email')],
            [
                'name' => config('services.admin_seed.name'),
                'password' => Hash::make($adminPassword),
                'email_verified_at' => now(),
            ]
        );

        // 4. Liaison Admin-Commune (idempotent)
        AdminCommunal::firstOrCreate([
            'user_id' => $user->id,
            'commune_id' => $commune->id,
        ]);
    }
}
