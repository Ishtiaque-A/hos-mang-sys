<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectorInfo extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'phone', 'email', 'address', 'saas_branch_id', 'saas_branch_name'];
}
