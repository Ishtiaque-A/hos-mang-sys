<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HolidaySubGroup extends Model
{
    use HasFactory;

    public function holidayGroup()
    {
        return $this->belongsTo(HolidayGroup::class, 'holiday_group_id');
    }

    public function holidays()
    {
        return $this->hasMany(Holiday::class, 'holiday_sub_group_id', 'id');
    }
}
