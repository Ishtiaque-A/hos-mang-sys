<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpImmunisationRoute;
use Illuminate\Support\Facades\Validator;

class MhpImmunisationRouteController extends Controller
{
    public function index()
    {
        $immunisationRoute = MhpImmunisationRoute::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "immunisationRoute" => $immunisationRoute]);
    }

    public function store(Request $request)
    {
       // return  $request->all();
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $immunisationRoute = new MhpImmunisationRoute();
            $immunisationRoute->name = $request->name;
            $immunisationRoute->save();
            return response()->json([
                "status" => 200,
                "message" => "Immunisation Route added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $immunisationRoute = MhpImmunisationRoute::find($id);

        return response()->json(["status"=>200,"immunisationRoute"=>$immunisationRoute]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $immunisationRoute =MhpImmunisationRoute::find($id);
            $immunisationRoute->name = $request->name;
            $immunisationRoute->save();
            return response()->json([
                "status" => 200,
                "message" => "Immunisation Route updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $immunisationRoute = MhpImmunisationRoute::find($id);
        $immunisationRoute-> delete_status = 1;
        $immunisationRoute->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Immunisation Route deleted successfully"
        ]);
    }
}
