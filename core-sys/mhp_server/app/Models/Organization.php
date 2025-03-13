<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;
    protected $connection = 'saas';

    public function branch()
    {
        return $this->hasMany(Branch::class,  'organization_id', 'id');
    }
}
