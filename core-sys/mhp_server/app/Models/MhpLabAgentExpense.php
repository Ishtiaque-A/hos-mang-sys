<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabAgentExpense extends Model
{
    use HasFactory;
    public function accounts_type () {
        return $this->belongsTo('App\Models\MhpAccountsType', 'accounts_type_id', 'id')->select('id','name');
    }
    public function accounts_group () {
        return $this->belongsTo('App\Models\MhpDoctorFeeName', 'accounts_group_id', 'id')->select('id','fee_name');
    }
}

