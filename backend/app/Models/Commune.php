<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commune extends Model
{
    protected $fillable =
        [
            'nom',
            'region'
        ];
    public function adminsCommunals(): HasMany
    {
        return $this->hasMany(AdminCommunal::class);
    }


}
