<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpEthnicity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EthnicityController extends Controller
{
    //
    public function index()
    {
        $ethnicity = MhpEthnicity::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'ethnicity' => $ethnicity,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ethnicity_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $ethnicity = new MhpEthnicity();
            $ethnicity->ethnicity_name = $request->input('ethnicity_name');
            $ethnicity->save();

            return response()->json([
                'status' => 200,
                'message' => 'Ethnicity Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $ethnicity = MhpEthnicity::find($id);
        if ($ethnicity) {
            return response()->json([
                'status' => 200,
                'ethnicity' => $ethnicity,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Ethnicity Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'ethnicity_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $ethnicity = MhpEthnicity::find($id);
            if ($ethnicity) {
                $ethnicity->ethnicity_name = $request->input('ethnicity_name');
                $ethnicity->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Ethnicity Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Ethnicity Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $ethnicity = MhpEthnicity::find($id);
        if ($ethnicity)
        {
            if ($ethnicity['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $ethnicity->delete_status = $delete_status;
            $ethnicity->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ethnicity deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ethnicity Found',
            ]);
        }
    }

    public function ethnicity_dropdown()
    {
        $ethnicity = MhpEthnicity::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'ethnicity' => $ethnicity,
        ]);
    }

}
