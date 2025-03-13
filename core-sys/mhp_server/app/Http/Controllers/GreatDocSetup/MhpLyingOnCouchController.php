<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLyingOnCouch;
use Illuminate\Support\Facades\Validator;

class MhpLyingOnCouchController extends Controller
{
    public function index()
    {
        $lyingOnCouch = MhpLyingOnCouch::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "lyingOnCouch" => $lyingOnCouch]);
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
            $lyingOnCouch = new MhpLyingOnCouch();
            $lyingOnCouch->name = $request->name;
            $lyingOnCouch->save();
            return response()->json([
                "status" => 200,
                "message" => "Lying On Couch added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $lyingOnCouch = MhpLyingOnCouch::find($id);

        return response()->json(["status"=>200,"lyingOnCouch"=>$lyingOnCouch]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $lyingOnCouch =MhpLyingOnCouch::find($id);
            $lyingOnCouch->name = $request->name;
            $lyingOnCouch->save();
            return response()->json([
                "status" => 200,
                "message" => "Lying On Couch updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $lyingOnCouch = MhpLyingOnCouch::find($id);
        $lyingOnCouch-> delete_status = 1;
        $lyingOnCouch->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Lying On Couch deleted successfully"
        ]);
    }
}



