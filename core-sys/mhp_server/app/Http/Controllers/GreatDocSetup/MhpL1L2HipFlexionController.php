<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpL1L2HipFlexion;
use Illuminate\Support\Facades\Validator;

class MhpL1L2HipFlexionController extends Controller
{
    public function index()
    {
        $l1L2HipFlexion = MhpL1L2HipFlexion::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "l1L2HipFlexion" => $l1L2HipFlexion]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $l1L2HipFlexion = new MhpL1L2HipFlexion();
            $l1L2HipFlexion->name = $request->name;
            $l1L2HipFlexion->save();
            return response()->json([
                "status" => 200,
                "message" => "L1 and L2 Hip Flexion added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $l1L2HipFlexion = MhpL1L2HipFlexion::find($id);

        return response()->json(["status"=>200,"l1L2HipFlexion"=>$l1L2HipFlexion]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $l1L2HipFlexion =MhpL1L2HipFlexion::find($id);
            $l1L2HipFlexion->name = $request->name;
            $l1L2HipFlexion->save();
            return response()->json([
                "status" => 200,
                "message" => "L1 and L2 Hip Flexion updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $l1L2HipFlexion = MhpL1L2HipFlexion::find($id);
        $l1L2HipFlexion-> delete_status = 1;
        $l1L2HipFlexion->update();
        return response()->json([
            "status"=> 200,
            "message"=> "L1 and L2 Hip Flexion deleted successfully"
        ]);
    }
}
