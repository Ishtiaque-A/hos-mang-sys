<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorsLabPointsPlan extends Model
{
    use HasFactory;
    public function details()
    {
        return $this->hasMany(DoctorsLabPointsPlanDetails::class, 'plan_id', 'id')->with('testItem');
    }
    public function shares()
    {
        return $this->hasMany(DoctorsLabPointsPlanShares::class, 'plan_id', 'id')->with('planMaster');
    }
    public function share()
    {
        return $this->hasMany(DoctorsLabPointsPlanShares::class, 'plan_id', 'id')->select('id', 'plan_id','share_percentage','plan_master_id');
    }
}
