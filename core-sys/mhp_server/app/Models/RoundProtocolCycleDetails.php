<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundProtocolCycleDetails extends Model
{
    use HasFactory;
    public function route()
    {
        return $this->belongsTo(MhpRouteName::class, 'route_id', 'id')->select('id', 'route_name');
    }
}
