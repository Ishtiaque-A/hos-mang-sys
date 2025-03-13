<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller
{
    //
    public function index()
    {
        $userRole = UserRole::orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'userRole' => $userRole,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $userRole = new UserRole();
            $userRole->name = $request->name;
            $userRole->save();

            return response()->json([
                'status' => 200,
                'message' => 'userRole Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $userRole = UserRole::find($id);

        if ($userRole)
        {
            return response()->json([
                'status' => 200,
                'userRole' => $userRole,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $userRole = UserRole::find($id);
            $userRole->name = $request->name;
            $userRole->update();

            return response()->json([
                'status' => 200,
                'message' => 'userRole Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $userRole = UserRole::find($id);       
        $userRole->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Role Delete Successfully',
        ]);
        
    }
}
