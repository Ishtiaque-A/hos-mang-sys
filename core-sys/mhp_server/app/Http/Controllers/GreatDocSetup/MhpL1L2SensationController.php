<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpL1L2Sensation;
use Illuminate\Support\Facades\Validator;

class MhpL1L2SensationController extends Controller
{
    public function index()
    {
        $l1L2Sensation = MhpL1L2Sensation::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "l1L2Sensation" => $l1L2Sensation]);
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
            $l1L2Sensation = new MhpL1L2Sensation();
            $l1L2Sensation->name = $request->name;
            $l1L2Sensation->save();
            return response()->json([
                "status" => 200,
                "message" => "L1 and L2 Sensation added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $l1L2Sensation = MhpL1L2Sensation::find($id);

        return response()->json(["status"=>200,"l1L2Sensation"=>$l1L2Sensation]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $l1L2Sensation =MhpL1L2Sensation::find($id);
            $l1L2Sensation->name = $request->name;
            $l1L2Sensation->save();
            return response()->json([
                "status" => 200,
                "message" => "L1 and L2 Sensation updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $l1L2Sensation = MhpL1L2Sensation::find($id);
        $l1L2Sensation-> delete_status = 1;
        $l1L2Sensation->update();
        return response()->json([
            "status"=> 200,
            "message"=> "L1 and L2 Sensation deleted successfully"
        ]);
    }
}
