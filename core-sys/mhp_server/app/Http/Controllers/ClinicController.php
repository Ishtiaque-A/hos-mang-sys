<?php

namespace App\Http\Controllers;

use App\Models\MhpPatient;
use App\Models\PatientOrganization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Sandy\ApiResponse\Facades\ApiResponse;

use function PHPUnit\Framework\isNull;

class ClinicController extends Controller
{

    public function patient_details_from_organization(Request $request)
    {
        $validatedData = $request->validate([
            'dbName' => 'required',
            'patient_hn_number' => 'required'
        ]);

        Config::set('database.connections.mysql.database', $validatedData['dbName']);
        app('db')->purge();

        $data = MhpPatient::where('patient_hn_number', $validatedData['patient_hn_number'])->first();

        return ApiResponse::success($data);
    }

    public function index($patientId)
    {
        $data = PatientOrganization::where(['patient_id' => $patientId, 'isActive' => 1])->with('organization')->select('id', 'patient_id', 'organization_id')->get();
        return ApiResponse::success($data);
    }
    public function inActive($patientId)
    {
        $data = PatientOrganization::where(['patient_id' => $patientId, 'isActive' => 0])->with('organization')->select('id', 'patient_id', 'organization_id')->get();
        return ApiResponse::success($data);
    }
    public function organization_status_update($id, $status)
    {
        $data = PatientOrganization::find($id);
        $data->isActive = $status;
        $data->save();

        return ApiResponse::success($data);
    }



    public function search_organization(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required',
            'patient_id' => 'required'
        ]);


        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->get(env('SAAS_URL') . '/organization' . '/' . $validatedData['code']);

        if (!isset($response['id'])) {
            return ApiResponse::success($response->json());
        }

        $d = PatientOrganization::where(['organization_id' => $response['id'], 'patient_id' => $validatedData['patient_id']])->first();

        if (!$d) {
            $data = new PatientOrganization();
            $data->patient_id =  $validatedData['patient_id'];
            $data->organization_id = $response['id'];
            $data->save();
        } else {
            return ApiResponse::success([], 'Data already added');
        }


        return ApiResponse::success($response->json());
    }


    public function patietnCopy(Request $request)
    {
        $data = MhpPatient::find($request->paitentId);


        Config::set('database.connections.mysql.database', $request->dbName);
        app('db')->purge();

        // $dataArray = $data->toArray();
        // unset($dataArray['id']);

        // MhpPatient::create($dataArray);

        $check = MhpPatient::where('patient_hn_number', $data->patient_hn_number)->first();

        if (!$check) {
            $patient = new MhpPatient();

            $patient->saas_branch_id =  $request->saas_branch_id;
            $patient->saas_branch_name =  $request->saas_branch_name;

            $patient->patient_hn_number =  $data->patient_hn_number;
            $patient->patient_first_name = $data->patient_first_name;
            $patient->patient_middle_name =  $data->patient_middle_name;
            $patient->patient_last_name = $data->patient_last_name;
            $patient->ptn_blood_group_id = $data->ptn_blood_group_id;

            $patient->patient_mobile_phone = $data->patient_mobile_phone;
            $patient->patient_birth_sex_id = $data->patient_birth_sex_id;
            $patient->patient_address1 = $data->patient_address1;
            $patient->patient_images = $data->patient_images;
            $patient->patient_dob = $data->patient_dob;
            $patient->patient_status = 1;
            $patient->patient_email = $data->patient_email;
            $patient->save();

            return ApiResponse::success($patient);
        }

        return ApiResponse::success([], 'This patient is already registered');
    }
}
