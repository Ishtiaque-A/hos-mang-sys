<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpRouteName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RouteNameController extends Controller
{
    public function index()
    {

        $routesName = MhpRouteName::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'routesName' => $routesName,
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'route_name' => 'required|max:191',
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $routesName = new MhpRouteName();
            $routesName->route_name = $request->input('route_name');
            $routesName->save();

            return response()->json([
                'status' => 200,
                'message' => 'Route Name Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $routesName = MhpRouteName::find($id);
        if ($routesName) {
            return response()->json([
                'status' => 200,
                'routesName' => $routesName,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Route Name Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'route_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
        $routesName = MhpRouteName::find($id);
        if ($routesName) {
            $routesName->route_name = $request->input('route_name');
            $routesName->update();

            return response()->json([
                'status' => 200,
                'message' => 'Route Name Update Successfully',
            ]);
        }else {
            return response()->json([
                'status' => 404,
                'message' => 'No Route Name Id Found',
            ]);
        }
    }


    }

    public function destroy($id)
    {

        $drugs = MhpRouteName::find($id);
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
                'message' => 'Route Name deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Route Name Found',
            ]);
        }
    }

}
