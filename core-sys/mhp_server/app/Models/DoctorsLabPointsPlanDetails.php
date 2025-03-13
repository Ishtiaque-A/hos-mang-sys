<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorsLabPointsPlanDetails extends Model
{
    use HasFactory;
    public function testItem()
    {
        return $this->belongsTo(MhpNewLabModuleTestName::class, 'test_id', 'id')->with('group','category');
    }
}
