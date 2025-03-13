<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpPayment extends Model
{
    use HasFactory;

    public function bank_id()
    {
        return $this->belongsTo('App\Models\MhpBank','bank_id')->select('*');
    }
    public function branch_id()
    {
        return $this->belongsTo('App\Models\MhpBranch','branch_id')->select('*');
    }
    public function card_id()
    {
        return $this->belongsTo('App\Models\MhpCard','card_id')->select('*');
    }
    public function digital_id()
    {
        return $this->belongsTo('App\Models\MhpDigital','digital_id')->select('*');
    }
}
