<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTestHipPelvis;
use Illuminate\Support\Facades\Validator;

class MhpTestHipPelvisController extends Controller
{
    public function index()
    {
        $testHipPelvis = MhpTestHipPelvis::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "testHipPelvis" => $testHipPelvis]);
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
            $testHipPelvis = new MhpTestHipPelvis();
            $testHipPelvis->name = $request->name;
            $testHipPelvis->save();
            return response()->json([
                "status" => 200,
                "message" => "Test Hip Pelvis added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $testHipPelvis = MhpTestHipPelvis::find($id);

        return response()->json(["status"=>200,"testHipPelvis"=>$testHipPelvis]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $testHipPelvis =MhpTestHipPelvis::find($id);
            $testHipPelvis->name = $request->name;
            $testHipPelvis->save();
            return response()->json([
                "status" => 200,
                "message" => "Test Hip Pelvis updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $testHipPelvis = MhpTestHipPelvis::find($id);
        $testHipPelvis-> delete_status = 1;
        $testHipPelvis->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Test Hip Pelvis deleted successfully"
        ]);
    }
}