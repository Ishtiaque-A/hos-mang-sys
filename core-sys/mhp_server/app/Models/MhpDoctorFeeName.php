<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpDoctorFeeName extends Model
{
    use HasFactory;

    public function accounts() {
        return $this->belongsTo('App\Models\MhpAccounts','accounts_id')->select('id','name');
    }
    public function accounts_type() {
        return $this->belongsTo('App\Models\MhpAccountsType','accounts_type_id',)->select('id','name');
    }
    public function invoice() {
        return $this->hasMany('App\Models\MhpAccountsInvoiceDetails','account_group_id','id');
    }
}
