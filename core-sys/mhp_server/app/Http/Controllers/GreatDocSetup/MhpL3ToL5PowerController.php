<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpL3ToL5Power;
use Illuminate\Support\Facades\Validator;

class MhpL3ToL5PowerController extends Controller
{
    public function index()
    {
        $l3ToL5Power = MhpL3ToL5Power::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "l3ToL5Power" => $l3ToL5Power]);
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
            $l3ToL5Power = new MhpL3ToL5Power();
            $l3ToL5Power->name = $request->name;
            $l3ToL5Power->save();
            return response()->json([
                "status" => 200,
                "message" => "L3 To L5 Power added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $l3ToL5Power = MhpL3ToL5Power::find($id);

        return response()->json(["status"=>200,"l3ToL5Power"=>$l3ToL5Power]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $l3ToL5Power =MhpL3ToL5Power::find($id);
            $l3ToL5Power->name = $request->name;
            $l3ToL5Power->save();
            return response()->json([
                "status" => 200,
                "message" => "L3 To L5 Power updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $l3ToL5Power = MhpL3ToL5Power::find($id);
        $l3ToL5Power-> delete_status = 1;
        $l3ToL5Power->update();
        return response()->json([
            "status"=> 200,
            "message"=> "L3 To L5 Power deleted successfully"
        ]);
    }
}

