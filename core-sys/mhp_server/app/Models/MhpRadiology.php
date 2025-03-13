<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpRadiology extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'patient_id',
        'test_name_id',
        'test_type_id',
        'center_id',
        'clinical_id',
        'test_date',
        'center_date',
        'radiology_test_category',
        'radiology_test_name',
        'additional_test_name',
        'symptom_name',
        'date',
        'status',
        'created_at',
        'updated_at',
    ];
    public function clinical_inductions()
    {
        return $this->belongsTo(MhpClinicalIndications::class, 'clinical_id', 'id');
    }
    public function patient_details()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id', 'id')->with('patient_birth_sex')->select('id', 'patient_birth_sex_id', 'patient_mobile_phone', 'patient_email', 'patient_last_name', 'patient_middle_name', 'patient_first_name');
    }
    public function laboratory_details()
    {
        return $this->belongsTo(MhpLabratory::class, 'center_id', 'id');
    }
    public function radiology_test_name()
    {
        return $this->belongsTo(MhpRadiologyTestName::class, 'test_name_id', 'id');
    }
    public function radiology_test_type()
    {
        return $this->belongsTo(MhpRadiologyTestType::class, 'test_type_id', 'id');
    }
}
