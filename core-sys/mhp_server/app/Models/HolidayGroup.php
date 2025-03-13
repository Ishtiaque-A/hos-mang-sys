<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HolidayGroup extends Model
{
    use HasFactory;
    public function holidaysubGroup()
    {
        return $this->hasMany(HolidaySubGroup::class, 'holiday_group_id');
    }

    public function holiday()
    {
        return $this->hasMany(Holiday::class, 'holiday_group_id', 'id');
    }
}
