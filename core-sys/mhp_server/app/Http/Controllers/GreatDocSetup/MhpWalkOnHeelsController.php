<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpWalkOnHeels;
use Illuminate\Support\Facades\Validator;

class MhpWalkOnHeelsController extends Controller
{
    public function index()
    {
        $walkOnHeels = MhpWalkOnHeels::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "walkOnHeels" => $walkOnHeels]);
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
            $walkOnHeels = new MhpWalkOnHeels();
            $walkOnHeels->name = $request->name;
            $walkOnHeels->save();
            return response()->json([
                "status" => 200,
                "message" => "Walk On Heels added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $walkOnHeels = MhpWalkOnHeels::find($id);

        return response()->json(["status"=>200,"walkOnHeels"=>$walkOnHeels]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $walkOnHeels =MhpWalkOnHeels::find($id);
            $walkOnHeels->name = $request->name;
            $walkOnHeels->save();
            return response()->json([
                "status" => 200,
                "message" => "Walk On Heels updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $walkOnHeels = MhpWalkOnHeels::find($id);
        $walkOnHeels-> delete_status = 1;
        $walkOnHeels->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Walk On Heels deleted successfully"
        ]);
    }
}


