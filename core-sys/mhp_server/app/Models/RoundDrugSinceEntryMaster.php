<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundDrugSinceEntryMaster extends Model
{
    use HasFactory;
    public function drugs()
    {
        return $this->hasMany(RoundDrugSinceEntry::class, 'master_id', 'id')->with('drug');
    }
}
