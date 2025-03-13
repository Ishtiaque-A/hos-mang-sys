<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorsLabPointsPlanShares extends Model
{
    use HasFactory;
    public function planMaster()
    {
        return $this->belongsTo(GreatLabDcotorsPointMaster::class, 'plan_master_id', 'id');
    }
}
