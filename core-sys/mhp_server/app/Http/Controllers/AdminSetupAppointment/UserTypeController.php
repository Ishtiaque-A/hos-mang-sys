<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpUserType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class UserTypeController extends Controller
{
    //

    public function index()
    {
        $user_type = MhpUserType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'user_type' => $user_type,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $user_type = new MhpUserType();
            $user_type->user_type_name = $request->input('user_type_name');
            $user_type->save();

            return response()->json([
                'status' => 200,
                'message' => 'User Type Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $user_type = MhpUserType::find($id);
        if ($user_type) {
            return response()->json([
                'status' => 200,
                'user_type' => $user_type,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User Type Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'user_type_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $user_type = MhpUserType::find($id);
            if ($user_type) {
                $user_type->user_type_name = $request->input('user_type_name');
                $user_type->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'User Type Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No User Type Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $user_type = MhpUserType::find($id);
        if ($user_type)
        {
            if ($user_type['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $user_type->delete_status = $delete_status;
            $user_type->save();
            return response()->json([
                'status' => 200,
                'message' => 'User Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No User Type Found',
            ]);
        }
    }

}
