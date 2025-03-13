<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\MhpDiagnosis;


class DiagnosisController extends Controller
{
    //
    public function index()
    {
        $diagnosis = MhpDiagnosis::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'diagnosis' => $diagnosis,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'diagnosis_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpDiagnosis();
            $data->diagnosis_name = $request->diagnosis_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $diagnosis = MhpDiagnosis::find($id);

        if ($diagnosis)
        {
            return response()->json([
                'status' => 200,
                'diagnosis' => $diagnosis,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpDiagnosis::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'diagnosis_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->diagnosis_name = $request->diagnosis_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Diagnosis Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $diagnosis = MhpDiagnosis::find($id);
        if ($diagnosis)
        {
            if ($diagnosis['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $diagnosis->delete_status = $delete_status;
            $diagnosis->save();
            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Found',
            ]);
        }
    }

    public function diagnosis_dropdown()
    {
        $diagnosis = MhpDiagnosis::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'diagnosis' => $diagnosis,
        ]);
    }

}
