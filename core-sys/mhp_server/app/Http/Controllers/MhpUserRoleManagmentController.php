<?php

namespace App\Http\Controllers;

use App\Models\MhpUserRoleManagment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MhpUserRoleManagmentController extends Controller
{

    public function index($userId)
    {
        $userRole = MhpUserRoleManagment::where('user_id', $userId)->get();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'userRole' => $userRole
        ]);
    }

    public function getPermission($userType, $userId)
    {
        $userData = MhpUserRoleManagment::where('user_id', $userId)->get();
          
        if (count($userData) > 0) {
            $userRole = MhpUserRoleManagment::where('user_type', $userType)->where('user_id', $userId)->get();

            return response()->json([
                'status' => 200,
                'message' => 'Data get Successfully',
                'userRole' => $userRole
            ]);
        }else{
            $userRole = MhpUserRoleManagment::where('user_type', $userType)->where('for_all', 1)->get();

            return response()->json([
                'status' => 200,
                'message' => 'Data get Successfully',
                'userRole' => $userRole
            ]);
        }
    }

    public function getPermission_alluser($userType)
    {
        $userRole = MhpUserRoleManagment::where('user_type', $userType)->where('for_all', 1)->get();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'userRole' => $userRole
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'user_type' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $userRole = new MhpUserRoleManagment();
            $userRole->role_id = $request->role_id;
            $userRole->user_id = $request->user_id;
            $userRole->user_type = $request->user_type;
            $userRole->name = $request->name;
            $userRole->slug = $request->slug;
            $userRole->view = $request->view;
            $userRole->add = $request->add;
            $userRole->edit = $request->edit;
            $userRole->delete = $request->delete;
            $userRole->report = $request->report;
            $userRole->for_all = $request->for_all;
            $userRole->validity = $request->validity;
            $userRole->validity_date = $request->validity_date;
            $userRole->save();

            return response()->json([
                'status' => 200,
                'message' => 'userRole Added Successfully',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $userRole = MhpUserRoleManagment::find($id);
            $userRole->role_id = $request->role_id;
            $userRole->user_id = $request->user_id;
            $userRole->user_type = $request->user_type;
            $userRole->name = $request->name;
            $userRole->slug = $request->slug;
            $userRole->view = $request->view;
            $userRole->add = $request->add;
            $userRole->edit = $request->edit;
            $userRole->delete = $request->delete;
            $userRole->report = $request->report;
            // $userRole->for_all = $request->for_all;
            $userRole->validity = $request->validity;
            $userRole->validity_date = $request->validity_date;
            $userRole->update();

            return response()->json([
                'status' => 200,
                'message' => 'userRole Update Successfully',
            ]);
        }
    }
}
