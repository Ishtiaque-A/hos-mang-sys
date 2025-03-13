<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDiagnosisProcedure;
use Illuminate\Support\Facades\Validator;

class MhpDiagnosisProcedureController extends Controller
{
    //
    public function index()
    {
        $DiagnosisProcedure = MhpDiagnosisProcedure::where('delete_status', 0)->orderBy('id', 'desc')->take(40000)->get();


        return response()->json(
            ['status' => 200, 'DiagnosisProcedure' => $DiagnosisProcedure]
        );
    }
    public function reasonForVisit()
    {
        $DiagnosisProcedure = MhpDiagnosisProcedure::where('DiagnosisProcedure_type', 'ResonForVisit')
            ->select('id', 'DiagnosisProcedure_code', 'DiagnosisProcedure_name')
            ->where('delete_status', 0)->orderBy('id', 'asc')->get();

        $diagnosis = MhpDiagnosisProcedure::where('DiagnosisProcedure_type', 'diagnosis')
            ->select('id', 'DiagnosisProcedure_code', 'DiagnosisProcedure_name')
            ->where('delete_status', 0)->orderBy('id', 'asc')->get();
        return response()->json(
            ['status' => 200, 'reason' => $DiagnosisProcedure, 'diagnosis' => $diagnosis]
        );
    }

    public function dia_pro_reason($type)
    {
        $data = MhpDiagnosisProcedure::where('DiagnosisProcedure_type', 'like', '%' . $type . '%')
            ->select('id', 'DiagnosisProcedure_code', 'DiagnosisProcedure_name')
            ->where('delete_status', 0)->orderBy('id', 'asc')->get();


        return response()->json(
            ['status' => 200, 'data' => $data]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'DiagnosisProcedure_type' => 'required|max:100',
                'DiagnosisProcedure_code' => 'required|max:100',
                'DiagnosisProcedure_name' => 'required|max:100',

            ],
            // ['status_id.required' => 'Status field is required!']
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $DiagnosisProcedure = new MhpDiagnosisProcedure();
            $DiagnosisProcedure->DiagnosisProcedure_type = $request->DiagnosisProcedure_type;
            $DiagnosisProcedure->DiagnosisProcedure_code = $request->DiagnosisProcedure_code;
            $DiagnosisProcedure->DiagnosisProcedure_name = $request->DiagnosisProcedure_name;

            $DiagnosisProcedure->save();

            return response()->json(['status' => 200, 'message' => 'Diagnosis Procedure Added Successfully']);
        }
    }


    public function edit($id)
    {
        $DiagnosisProcedure = MhpDiagnosisProcedure::find($id);
        return response()->json(['status' => 200, 'DiagnosisProcedure' => $DiagnosisProcedure]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'DiagnosisProcedure_type' => 'required|max:100',
                'DiagnosisProcedure_code' => 'required|max:100',
                'DiagnosisProcedure_name' => 'required|max:100',


            ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $update_DiagnosisProcedure = MhpDiagnosisProcedure::find($id);
            $update_DiagnosisProcedure->DiagnosisProcedure_type = $request->DiagnosisProcedure_type;
            $update_DiagnosisProcedure->DiagnosisProcedure_code = $request->DiagnosisProcedure_code;
            $update_DiagnosisProcedure->DiagnosisProcedure_name = $request->DiagnosisProcedure_name;
            $update_DiagnosisProcedure->update();

            return response()->json(['status' => 200, 'message' => 'Diagnosis Procedure Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_DiagnosisProcedure = MhpDiagnosisProcedure::find($id);
        if ($del_DiagnosisProcedure) {
            if ($del_DiagnosisProcedure['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $del_DiagnosisProcedure->delete_status = $delete_status;
            $del_DiagnosisProcedure->save();
            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis Procedure deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Procedure Found',
            ]);
        }
    }
}
