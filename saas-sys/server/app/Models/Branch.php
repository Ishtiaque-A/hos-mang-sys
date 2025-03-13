<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id', 'id')->select('name', 'id');
    }
    public function scopeFilterByOrganization($query, $organizationId)
    {
        if ($organizationId) {
            return $query->where('organization_id', $organizationId);
        }
        return $query;
    }
}
