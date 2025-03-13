<?php

namespace App\Http\Controllers;

use App\Models\MhpFeaturePermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MhpFeaturePermissionController extends Controller
{
    //
    public function index()
    {
        $MhpFeaturePermission = MhpFeaturePermission::orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'MhpFeaturePermission' => $MhpFeaturePermission,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'slug' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $MhpFeaturePermission = new MhpFeaturePermission();
            $MhpFeaturePermission->name = $request->name;
            $MhpFeaturePermission->slug = $request->slug;
            $MhpFeaturePermission->save();

            return response()->json([
                'status' => 200,
                'message' => 'MhpFeaturePermission Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $MhpFeaturePermission = MhpFeaturePermission::find($id);

        if ($MhpFeaturePermission)
        {
            return response()->json([
                'status' => 200,
                'MhpFeaturePermission' => $MhpFeaturePermission,
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
            'slug' => 'required',

        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $MhpFeaturePermission = MhpFeaturePermission::find($id);
            $MhpFeaturePermission->name = $request->name;
            $MhpFeaturePermission->slug = $request->slug;
            $MhpFeaturePermission->update();

            return response()->json([
                'status' => 200,
                'message' => 'MhpFeaturePermission Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $MhpFeaturePermission = MhpFeaturePermission::find($id);       
        $MhpFeaturePermission->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Role Delete Successfully',
        ]);
        
    }
}
