<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\PtnBloodGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BloodGroupController extends Controller
{
    //
    public function index()
    {
        $blood_group = PtnBloodGroup::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'blood_group' => $blood_group,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'blood_group_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $blood_group = new PtnBloodGroup();
            $blood_group->blood_group_name = $request->input('blood_group_name');
            $blood_group->save();

            return response()->json([
                'status' => 200,
                'message' => 'Blood Group Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $blood_group = PtnBloodGroup::find($id);
        if ($blood_group) {
            return response()->json([
                'status' => 200,
                'blood_group' => $blood_group,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Blood Group Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'blood_group_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $blood_group = PtnBloodGroup::find($id);
            if ($blood_group) {
                $blood_group->blood_group_name = $request->input('blood_group_name');
                $blood_group->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Blood Group Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Blood Group Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $blood_group = PtnBloodGroup::find($id);
        if ($blood_group)
        {
            if ($blood_group['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $blood_group->delete_status = $delete_status;
            $blood_group->save();
            return response()->json([
                'status' => 200,
                'message' => 'Blood Group deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Blood Group Found',
            ]);
        }
    }

    public function blood_group_dropdown()
    {
        $blood_group = PtnBloodGroup::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'blood_group' => $blood_group,
        ]);
    }

}
