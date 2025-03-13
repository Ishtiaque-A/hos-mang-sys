<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTenderOverSpinusThoraco;
use Illuminate\Support\Facades\Validator;

class MhpTenderOverSpinusThoracoController extends Controller
{
    public function index()
    {
        $tenderOverSpinusThoraco = MhpTenderOverSpinusThoraco::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "tenderOverSpinusThoraco" => $tenderOverSpinusThoraco]);
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
            $tenderOverSpinusThoraco = new MhpTenderOverSpinusThoraco();
            $tenderOverSpinusThoraco->name = $request->name;
            $tenderOverSpinusThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tender Over Spinus Thoraco added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $tenderOverSpinusThoraco = MhpTenderOverSpinusThoraco::find($id);

        return response()->json(["status"=>200,"tenderOverSpinusThoraco"=>$tenderOverSpinusThoraco]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $tenderOverSpinusThoraco =MhpTenderOverSpinusThoraco::find($id);
            $tenderOverSpinusThoraco->name = $request->name;
            $tenderOverSpinusThoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tender Over Spinus Thoraco updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $tenderOverSpinusThoraco = MhpTenderOverSpinusThoraco::find($id);
        $tenderOverSpinusThoraco-> delete_status = 1;
        $tenderOverSpinusThoraco->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Tender Over Spinus Thoraco deleted successfully"
        ]);
    }
}


