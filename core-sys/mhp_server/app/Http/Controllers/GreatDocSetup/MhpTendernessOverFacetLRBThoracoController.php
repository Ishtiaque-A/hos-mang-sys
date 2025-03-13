<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTendernessOverFacetLRBThoraco;
use Illuminate\Support\Facades\Validator;

class MhpTendernessOverFacetLRBThoracoController extends Controller
{
    public function index()
    {
        $tendernessOverFacetLRBThoraco = MhpTendernessOverFacetLRBThoraco::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "tendernessOverFacetLRBThoraco" => $tendernessOverFacetLRBThoraco]);
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
            $tendernessOverFacetLRBThoraco = new MhpTendernessOverFacetLRBThoraco();
            $tendernessOverFacetLRBThoraco->name = $request->name;
            $tendernessOverFacetLRBThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tenderness Over Facet LRB Thoraco added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $tendernessOverFacetLRBThoraco = MhpTendernessOverFacetLRBThoraco::find($id);

        return response()->json(["status"=>200,"tendernessOverFacetLRBThoraco"=>$tendernessOverFacetLRBThoraco]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $tendernessOverFacetLRBThoraco =MhpTendernessOverFacetLRBThoraco::find($id);
            $tendernessOverFacetLRBThoraco->name = $request->name;
            $tendernessOverFacetLRBThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tenderness Over Facet LRB Thoraco updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $tendernessOverFacetLRBThoraco = MhpTendernessOverFacetLRBThoraco::find($id);
        $tendernessOverFacetLRBThoraco-> delete_status = 1;
        $tendernessOverFacetLRBThoraco->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Tenderness Over Facet LRB Thoraco deleted successfully"
        ]);
    }
}


