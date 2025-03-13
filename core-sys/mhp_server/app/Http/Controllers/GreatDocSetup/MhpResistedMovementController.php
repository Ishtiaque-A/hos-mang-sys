<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpResistedMovement;
use Illuminate\Support\Facades\Validator;

class MhpResistedMovementController extends Controller
{
    public function index()
    {
        $resistedMovement = MhpResistedMovement::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "resistedMovement" => $resistedMovement]);
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
            $resistedMovement = new MhpResistedMovement();
            $resistedMovement->name = $request->name;
            $resistedMovement->save();
            return response()->json([
                "status" => 200,
                "message" => "Resisted Movement added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $resistedMovement = MhpResistedMovement::find($id);

        return response()->json(["status"=>200,"resistedMovement"=>$resistedMovement]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $resistedMovement =MhpResistedMovement::find($id);
            $resistedMovement->name = $request->name;
            $resistedMovement->save();
            return response()->json([
                "status" => 200,
                "message" => "Resisted Movement updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $resistedMovement = MhpResistedMovement::find($id);
        $resistedMovement-> delete_status = 1;
        $resistedMovement->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Resisted Movement deleted successfully"
        ]);
    }
}
