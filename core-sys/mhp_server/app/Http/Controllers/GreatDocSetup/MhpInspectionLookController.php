<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpInspectionLook;
use Illuminate\Support\Facades\Validator;

class MhpInspectionLookController extends Controller
{
    public function index()
    {
        $inspectionLook = MhpInspectionLook::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "inspectionLook" => $inspectionLook]);
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
            $inspectionLook = new MhpInspectionLook();
            $inspectionLook->name = $request->name;
            $inspectionLook->save();
            return response()->json([
                "status" => 200,
                "message" => "Inspection Look added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $inspectionLook = MhpInspectionLook::find($id);

        return response()->json(["status"=>200,"inspectionLook"=>$inspectionLook]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $inspectionLook =MhpInspectionLook::find($id);
            $inspectionLook->name = $request->name;
            $inspectionLook->save();
            return response()->json([
                "status" => 200,
                "message" => "Inspection Look updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $inspectionLook = MhpInspectionLook::find($id);
        $inspectionLook-> delete_status = 1;
        $inspectionLook->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Inspection Look deleted successfully"
        ]);
    }
}

