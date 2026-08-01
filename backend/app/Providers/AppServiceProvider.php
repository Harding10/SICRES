<?php

namespace App\Providers;

use App\Models\AdminCommunal;
use App\Models\ResponsableEtablissement;
use App\Observers\AdminCommunalObserver;
use App\Observers\ResponsableEtablissementObserver;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // Enregistrement des deux Observers
        AdminCommunal::observe(AdminCommunalObserver::class);
        ResponsableEtablissement::observe(ResponsableEtablissementObserver::class);
    }
}
