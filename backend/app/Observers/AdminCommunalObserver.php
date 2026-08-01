<?php

namespace App\Observers;

use App\Exceptions\AccountTypeConflictException;
use App\Models\AdminCommunal;
use App\Models\ResponsableEtablissement;

/**
 * Empêche de créer un admin_communal si l'utilisateur
 * est déjà responsable d'établissement.
 */
class AdminCommunalObserver
{
    /**
     * Gérer l’événement « créé » par AdminCommunal.
     */
    public function creating(AdminCommunal $adminCommunal): void
    {
        $dejaresponsable = ResponsableEtablissement::where('user_id', $adminCommunal->user_id)->exists();
        if($dejaresponsable){
            throw new AccountTypeConflictException(
                "L'utilisateur est déjà responsable d'un établissement. il ne peut pas devenir admin communal"
            );
        }
    }

    /**
//     * Gérer l’événement « mis à jour » par AdminCommunal.
     */
    public function updated(AdminCommunal $adminCommunal): void
    {
        //
    }

    /**
     *Gérer l’événement « supprimé » d’AdminCommunalt.
     */
    public function deleted(AdminCommunal $adminCommunal): void
    {
        //
    }

    /**
     * Gérer l’événement « restauré » d’AdminCommunal.
     */
    public function restored(AdminCommunal $adminCommunal): void
    {
        //
    }

    /**
     * Gérer l’événement « suppression forcée » d’AdminCommunal.
     */
    public function forceDeleted(AdminCommunal $adminCommunal): void
    {
        //
    }
}
