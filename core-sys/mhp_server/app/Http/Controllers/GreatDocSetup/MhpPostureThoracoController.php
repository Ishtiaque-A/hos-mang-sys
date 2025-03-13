<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpPostureThoraco;
use Illuminate\Support\Facades\Validator;

class MhpPostureThoracoController extends Controller
{
    public function index()
    {
        $postureThoraco = MhpPostureThoraco::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "postureThoraco" => $postureThoraco]);
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
            $postureThoraco = new MhpPostureThoraco();
            $postureThoraco->name = $request->name;
            $postureThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Posture Thoraco added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $postureThoraco = MhpPostureThoraco::find($id);

        return response()->json(["status"=>200,"postureThoraco"=>$postureThoraco]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $postureThoraco =MhpPostureThoraco::find($id);
            $postureThoraco->name = $request->name;
            $postureThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Posture Thoraco updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $postureThoraco = MhpPostureThoraco::find($id);
        $postureThoraco-> delete_status = 1;
        $postureThoraco->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Posture Thoraco deleted successfully"
        ]);
    }
}


