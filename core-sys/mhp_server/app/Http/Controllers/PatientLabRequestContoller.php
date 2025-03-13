<?php

namespace App\Http\Controllers;

use App\Models\PatientLabRequestFromApp;
use Illuminate\Http\Request;
use Sandy\ApiResponse\Facades\ApiResponse;

class PatientLabRequestContoller extends Controller
{

    public function index($patientId, $branchId)
    {
        $data =  PatientLabRequestFromApp::where(['patient_id' => $patientId, 'branch_id' => $branchId])->get();

        return ApiResponse::success($data);
    }
    public function listAll(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = PatientLabRequestFromApp::query();
        $test_type = $request->input('test_type') ? $request->input('test_type') : "";



        if (!$branchData['super_admin']) {
            $query->where(['branch_id' => $branchData['branch_id']]);
        }

        if ($test_type) {
            $query->where('test_type', $test_type);
        }
        $data = $query->with('patient')->get();
        return ApiResponse::success($data);
    }

    public function changeStatus(Request $request, $id)
    {
        $transaction = PatientLabRequestFromApp::find($id);
        $transaction->status = $request->status;
        $transaction->save();
        return ApiResponse::success($transaction);
    }

    public function changeStatusMultiple(Request $request)
    {
        $ids = $request->input('ids');
        foreach ($ids as $id) {
            $transaction = PatientLabRequestFromApp::find($id['id']);
            $transaction->status = $id['status'];
            $transaction->save();
        }
        return ApiResponse::success([
            'message' => 'Status updated successfully',
            'data' => $ids
        ]);
        // $transaction = PatientLabRequestFromApp::whereIn('id', $ids)->update(['status' => $status]);
        // return ApiResponse::success($transaction);
    }
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'patient_id' => 'required|string',
            'branch_id' => 'required|integer',
            'test_type' => 'required|in:radiology,pathology',
            'test_name' => 'required|string',
            // 'amount' => 'required|numeric|min:0',
            'lat' => 'nullable|string',
            'long' => 'nullable|string',
            'sample_collention' => 'nullable|string',
            // 'payment_number' => 'required|string',
            // 'tran_id' => 'required|string|unique:patient_lab_request_from_apps',
            // 'ref_num' => 'required|string',
        ]);

        $transaction = new PatientLabRequestFromApp();
        $transaction->patient_id = $request->patient_id;
        $transaction->branch_id = $request->branch_id;
        $transaction->test_type = $request->test_type;
        $transaction->test_name = $request->test_name;
        $transaction->amount = $request->amount;
        $transaction->lat = $request->lat;
        $transaction->long = $request->long;
        $transaction->sample_collention = $request->sample_collention;
        $transaction->address = $request->address;
        $transaction->date = $request->date;
        $transaction->save();
        $testTypeUpperCase = strtoupper($request->test_type);
        $message = $testTypeUpperCase . ' Lab Request Successfully';

        return response()->json([
            'message' =>  $message,
            'data' => $transaction
        ]);
    }
}
