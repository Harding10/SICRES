<?php

namespace App\Observers;

use App\Exceptions\AccountTypeConflictException;
use App\Models\AdminCommunal;
use App\Models\ResponsableEtablissement;

class ResponsableEtablissementObserver
{
    /**
     * Handle the ResponsableEtablissement "created" event.
     */
    public function creating(ResponsableEtablissement $responsableEtablissement): void
    {
        $dejaadmin = AdminCommunal::where('user_id', $responsableEtablissement->user_id)->exists();
        if($dejaadmin){
            throw new AccountTypeConflictException(
                "L'utilisateur est déjà admin communal. il ne peut pas devenir responsable d'un établissement"
            );
        }
    }

    /**
     * Handle the ResponsableEtablissement "updated" event.
     */
    public function updated(ResponsableEtablissement $responsableEtablissement): void
    {
        //
    }

    /**
     * Handle the ResponsableEtablissement "deleted" event.
     */
    public function deleted(ResponsableEtablissement $responsableEtablissement): void
    {
        //
    }

    /**
     * Handle the ResponsableEtablissement "restored" event.
     */
    public function restored(ResponsableEtablissement $responsableEtablissement): void
    {
        //
    }

    /**
     * Handle the ResponsableEtablissement "force deleted" event.
     */
    public function forceDeleted(ResponsableEtablissement $responsableEtablissement): void
    {
        //
    }
}
