<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundDiabeticChartDetails extends Model
{
    use HasFactory;
    public function chart()
{
    return $this->belongsTo(RoundDiabeticChart::class, 'chart_id'); // 'chart_id' is the foreign key in the details table
}
}
