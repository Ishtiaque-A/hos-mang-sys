<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDorsumOfHand;
use Illuminate\Support\Facades\Validator;

class MhpDorsumOfHandController extends Controller
{
    public function index()
    {
        $dorsumOfHand = MhpDorsumOfHand::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "dorsumOfHand" => $dorsumOfHand]);
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
            $dorsumOfHand = new MhpDorsumOfHand();
            $dorsumOfHand->name = $request->name;
            $dorsumOfHand->save();
            return response()->json([
                "status" => 200,
                "message" => "Dorsum Of Hand added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $dorsumOfHand = MhpDorsumOfHand::find($id);

        return response()->json(["status"=>200,"dorsumOfHand"=>$dorsumOfHand]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $dorsumOfHand =MhpDorsumOfHand::find($id);
            $dorsumOfHand->name = $request->name;
            $dorsumOfHand->save();
            return response()->json([
                "status" => 200,
                "message" => "Dorsum Of Hand updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $dorsumOfHand = MhpDorsumOfHand::find($id);
        $dorsumOfHand-> delete_status = 1;
        $dorsumOfHand->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Dorsum Of Hand deleted successfully"
        ]);
    }
}

