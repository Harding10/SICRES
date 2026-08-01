<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResponsableEtablissement extends Model
{
    protected $fillable =
        [
            'user_id',
            'etablissement_id'
        ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

  /*  public function etablissement(): BelongsTo
    {
        return $this->belongsTo(Etablissement::class);
    }*/
}
