<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Holiday extends Model
{
    use HasFactory;

    public function doctors()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctors_master_id');
    }

    public function holidaySubGroup()
    {
        return $this->belongsTo(HolidaySubGroup::class, 'holiday_sub_group_id', 'id');
    }
    public function groupBy()
    {
        return $this->belongsTo(HolidayGroup::class, 'holiday_group_id', 'id');
    }
}
