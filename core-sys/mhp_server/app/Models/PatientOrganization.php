<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientOrganization extends Model
{
    use HasFactory;
    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id')->with('branch');
    }
}
