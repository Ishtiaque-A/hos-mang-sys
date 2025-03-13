<?php

namespace App\Http\Controllers;

use App\Models\MhpGaitLimping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MhpGaitLimpingController extends Controller
{
    public function index()
    {
        $gait = MhpGaitLimping::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "gait" => $gait]);
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
            $gait = new MhpGaitLimping();
            $gait->name = $request->name;
            $gait->save();
            return response()->json([
                "status" => 200,
                "message" => "Gait Limping added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $gait = MhpGaitLimping::find($id);

        return response()->json(["status"=>200,"gait"=>$gait]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $gait =MhpGaitLimping::find($id);
            $gait->name = $request->name;
            $gait->save();
            return response()->json([
                "status" => 200,
                "message" => "Gait Limping updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $gait = MhpGaitLimping::find($id);
        $gait-> delete_status = 1;
        $gait->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Gait Limping deleted successfully"
        ]);
    }
}
