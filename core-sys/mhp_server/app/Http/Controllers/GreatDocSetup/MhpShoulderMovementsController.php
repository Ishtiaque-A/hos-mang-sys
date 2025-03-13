<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpShoulderMovements;
use Illuminate\Support\Facades\Validator;

class MhpShoulderMovementsController extends Controller
{
    public function index()
    {
        $shoulderMovements = MhpShoulderMovements::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "shoulderMovements" => $shoulderMovements]);
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
            $shoulderMovements = new MhpShoulderMovements();
            $shoulderMovements->name = $request->name;
            $shoulderMovements->save();
            return response()->json([
                "status" => 200,
                "message" => "Shoulder Movements added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $shoulderMovements = MhpShoulderMovements::find($id);

        return response()->json(["status"=>200,"shoulderMovements"=>$shoulderMovements]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $shoulderMovements =MhpShoulderMovements::find($id);
            $shoulderMovements->name = $request->name;
            $shoulderMovements->save();
            return response()->json([
                "status" => 200,
                "message" => "Shoulder Movements updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $shoulderMovements = MhpShoulderMovements::find($id);
        $shoulderMovements-> delete_status = 1;
        $shoulderMovements->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Shoulder Movements deleted successfully"
        ]);
    }
}
