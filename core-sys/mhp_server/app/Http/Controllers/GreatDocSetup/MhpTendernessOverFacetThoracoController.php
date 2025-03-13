<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTendernessOverFacetThoraco;
use Illuminate\Support\Facades\Validator;

class MhpTendernessOverFacetThoracoController extends Controller
{
    public function index()
    {
        $tendernessOverFacetThoraco = MhpTendernessOverFacetThoraco::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "tendernessOverFacetThoraco" => $tendernessOverFacetThoraco]);
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
            $tendernessOverFacetThoraco = new MhpTendernessOverFacetThoraco();
            $tendernessOverFacetThoraco->name = $request->name;
            $tendernessOverFacetThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tenderness Over Facet Thoraco added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $tendernessOverFacetThoraco = MhpTendernessOverFacetThoraco::find($id);

        return response()->json(["status"=>200,"tendernessOverFacetThoraco"=>$tendernessOverFacetThoraco]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $tendernessOverFacetThoraco =MhpTendernessOverFacetThoraco::find($id);
            $tendernessOverFacetThoraco->name = $request->name;
            $tendernessOverFacetThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tenderness Over Facet Thoraco updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $tendernessOverFacetThoraco = MhpTendernessOverFacetThoraco::find($id);
        $tendernessOverFacetThoraco-> delete_status = 1;
        $tendernessOverFacetThoraco->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Tenderness Over Facet Thoraco deleted successfully"
        ]);
    }
}


