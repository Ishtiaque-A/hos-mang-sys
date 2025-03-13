<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpInspectionLookHipPelvis;
use Illuminate\Support\Facades\Validator;

class MhpInspectionLookHipPelvisController extends Controller
{
    public function index()
    {
        $inspectionLookHipPelvis = MhpInspectionLookHipPelvis::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "inspectionLookHipPelvis" => $inspectionLookHipPelvis]);
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
            $inspectionLookHipPelvis = new MhpInspectionLookHipPelvis();
            $inspectionLookHipPelvis->name = $request->name;
            $inspectionLookHipPelvis->save();
            return response()->json([
                "status" => 200,
                "message" => "Inspection Look Hip Pelvis added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $inspectionLookHipPelvis = MhpInspectionLookHipPelvis::find($id);

        return response()->json(["status"=>200,"inspectionLookHipPelvis"=>$inspectionLookHipPelvis]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $inspectionLookHipPelvis =MhpInspectionLookHipPelvis::find($id);
            $inspectionLookHipPelvis->name = $request->name;
            $inspectionLookHipPelvis->save();
            return response()->json([
                "status" => 200,
                "message" => "Inspection Look Hip Pelvis updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $inspectionLookHipPelvis = MhpInspectionLookHipPelvis::find($id);
        $inspectionLookHipPelvis-> delete_status = 1;
        $inspectionLookHipPelvis->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Inspection Look Hip Pelvis deleted successfully"
        ]);
    }
}