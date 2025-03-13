<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpOccupation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class OccupationController extends Controller
{
    //

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'occupation_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{
            $occupation = new MhpOccupation;
            $occupation->occupation_name = $request->input('occupation_name');
            $occupation->save();

            return response()->json([
                'status' => 200,
                'message' => 'Occupation created successfully',
            ]);
        }
    }

    public function index()
    {
        $occupations = MhpOccupation::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'occupations' => $occupations,
        ]);
    }

    public function edit($id){
        $occupation = MhpOccupation::find($id);
        if ($occupation) {
            return response()->json([
                'status' => 200,
                'occupation' => $occupation,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Occupation Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'occupation_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{
            $occupation = MhpOccupation::find($id);
            if ($occupation) {
                $occupation->occupation_name = $request->input('occupation_name');
                $occupation->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Occupation Updated Successfully',
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Occupation Id Found',
                ]);
            }

        }
    }

    public function destroy($id){
        $occupation = MhpOccupation::find($id);
        if ($occupation)
        {
            if ($occupation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $occupation->delete_status = $delete_status;
            $occupation->save();
            return response()->json([
                'status' => 200,
                'message' => 'Occupation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Occupation Found',
            ]);
        }
    }

}
