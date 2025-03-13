<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpS1ToS4Test;
use Illuminate\Support\Facades\Validator;

class MhpS1ToS4TestController extends Controller
{
    public function index()
    {
        $s1ToS4Test = MhpS1ToS4Test::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "s1ToS4Test" => $s1ToS4Test]);
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
            $s1ToS4Test = new MhpS1ToS4Test();
            $s1ToS4Test->name = $request->name;
            $s1ToS4Test->save();
            return response()->json([
                "status" => 200,
                "message" => "S1 To S4 Test added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $s1ToS4Test = MhpS1ToS4Test::find($id);

        return response()->json(["status"=>200,"s1ToS4Test"=>$s1ToS4Test]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $s1ToS4Test =MhpS1ToS4Test::find($id);
            $s1ToS4Test->name = $request->name;
            $s1ToS4Test->save();
            return response()->json([
                "status" => 200,
                "message" => "S1 To S4 Test updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $s1ToS4Test = MhpS1ToS4Test::find($id);
        $s1ToS4Test-> delete_status = 1;
        $s1ToS4Test->update();
        return response()->json([
            "status"=> 200,
            "message"=> "S1 To S4 Test deleted successfully"
        ]);
    }
}
