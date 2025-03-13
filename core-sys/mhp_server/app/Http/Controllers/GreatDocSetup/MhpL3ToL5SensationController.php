<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpL3ToL5Sensation;
use Illuminate\Support\Facades\Validator;

class MhpL3ToL5SensationController extends Controller
{
    public function index()
    {
        $l3ToL5Sensation = MhpL3ToL5Sensation::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "l3ToL5Sensation" => $l3ToL5Sensation]);
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
            $l3ToL5Sensation = new MhpL3ToL5Sensation();
            $l3ToL5Sensation->name = $request->name;
            $l3ToL5Sensation->save();
            return response()->json([
                "status" => 200,
                "message" => "L3 To L5 Sensation added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $l3ToL5Sensation = MhpL3ToL5Sensation::find($id);

        return response()->json(["status"=>200,"l3ToL5Sensation"=>$l3ToL5Sensation]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $l3ToL5Sensation =MhpL3ToL5Sensation::find($id);
            $l3ToL5Sensation->name = $request->name;
            $l3ToL5Sensation->save();
            return response()->json([
                "status" => 200,
                "message" => "L3 To L5 Sensation updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $l3ToL5Sensation = MhpL3ToL5Sensation::find($id);
        $l3ToL5Sensation-> delete_status = 1;
        $l3ToL5Sensation->update();
        return response()->json([
            "status"=> 200,
            "message"=> "L3 To L5 Sensation deleted successfully"
        ]);
    }
}
