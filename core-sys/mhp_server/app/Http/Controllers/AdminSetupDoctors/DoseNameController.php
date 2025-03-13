<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpDoseName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoseNameController extends Controller
{
    public function index()
    {

        $dosesName = MhpDoseName::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'dosesName' => $dosesName,
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dose_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $dosesName = new MhpDoseName();
            $dosesName->dose_name = $request->input('dose_name');
            $dosesName->save();

            return response()->json([
                'status' => 200,
                'message' => 'Dose Name Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $dosesName = MhpDoseName::find($id);
        if ($dosesName) {
            return response()->json([
                'status' => 200,
                'dosesName' => $dosesName,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Dose Name Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'dose_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $dosesName = MhpDoseName::find($id);
            if ($dosesName) {
                $dosesName->dose_name = $request->input('dose_name');
                $dosesName->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Dose Name Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Dose Name Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {

        $drugs = MhpDoseName::find($id);
        if ($drugs)
        {
            if ($drugs['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $drugs->delete_status = $delete_status;
            $drugs->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dose deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dose Found',
            ]);
        }

    }

}
