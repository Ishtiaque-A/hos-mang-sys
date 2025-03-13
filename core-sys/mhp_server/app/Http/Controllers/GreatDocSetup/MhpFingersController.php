<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFingers;
use Illuminate\Support\Facades\Validator;

class MhpFingersController extends Controller
{
    public function index()
    {
        $fingers = MhpFingers::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "fingers" => $fingers]);
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
            $fingers = new MhpFingers();
            $fingers->name = $request->name;
            $fingers->save();
            return response()->json([
                "status" => 200,
                "message" => "Fingers added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $fingers = MhpFingers::find($id);

        return response()->json(["status"=>200,"fingers"=>$fingers]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $fingers =MhpFingers::find($id);
            $fingers->name = $request->name;
            $fingers->save();
            return response()->json([
                "status" => 200,
                "message" => "Fingers updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $fingers = MhpFingers::find($id);
        $fingers-> delete_status = 1;
        $fingers->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Fingers deleted successfully"
        ]);
    }
}
