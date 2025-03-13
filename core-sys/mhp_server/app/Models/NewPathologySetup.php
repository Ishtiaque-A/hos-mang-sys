<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewPathologySetup extends Model
{
    use HasFactory;
    protected $fillable = [
        'pathology_laboratory_name',
        'laboratory_id',
        'pathology_test_category',
        'test_category_id',
        'clinical_id',
        'pathology_clinical_details_name',
        'center_date',
        'pathology_test_name',
        'test_name_id',
        'additional_test_name',
        'patient_id',
        'lmpDate',
        'fasting',
        'pregnant',
        'edcDate',
        'billing_type',
        'concession',
        'saas_branch_id',
        'saas_branch_name',
    ];

    public function laboratory_details()
    {
        return $this->belongsTo(MhpLabratory::class, 'laboratory_id', 'id');
    }
}
