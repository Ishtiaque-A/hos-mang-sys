<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMoveHipPelvis;
use Illuminate\Support\Facades\Validator;

class MhpMoveHipPelvisController extends Controller
{
    public function index()
    {
        $moveHipPelvis = MhpMoveHipPelvis::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "moveHipPelvis" => $moveHipPelvis]);
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
            $moveHipPelvis = new MhpMoveHipPelvis();
            $moveHipPelvis->name = $request->name;
            $moveHipPelvis->save();
            return response()->json([
                "status" => 200,
                "message" => "Inspection Look added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $moveHipPelvis = MhpMoveHipPelvis::find($id);

        return response()->json(["status"=>200,"moveHipPelvis"=>$moveHipPelvis]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $moveHipPelvis =MhpMoveHipPelvis::find($id);
            $moveHipPelvis->name = $request->name;
            $moveHipPelvis->save();
            return response()->json([
                "status" => 200,
                "message" => "Inspection Look updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $moveHipPelvis = MhpMoveHipPelvis::find($id);
        $moveHipPelvis-> delete_status = 1;
        $moveHipPelvis->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Inspection Look deleted successfully"
        ]);
    }
}


