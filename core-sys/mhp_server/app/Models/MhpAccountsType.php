<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpAccountsType extends Model
{
    use HasFactory;

    public function account() {
        return $this->belongsTo('App\Models\MhpAccounts','accounts_id')->select('id','name');
    }
}
