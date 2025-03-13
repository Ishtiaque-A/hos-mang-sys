<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTenderTenernessOverL1ToL6Thoraco;
use Illuminate\Support\Facades\Validator;

class MhpTenderTenernessOverL1ToL6ThoracoController extends Controller
{
    public function index()
    {
        $tenderTenernessOverL1ToL6Thoraco = MhpTenderTenernessOverL1ToL6Thoraco::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "tenderTenernessOverL1ToL6Thoraco" => $tenderTenernessOverL1ToL6Thoraco]);
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
            $tenderTenernessOverL1ToL6Thoraco = new MhpTenderTenernessOverL1ToL6Thoraco();
            $tenderTenernessOverL1ToL6Thoraco->name = $request->name;
            $tenderTenernessOverL1ToL6Thoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tender/Tenerness Over L1 To L6 Thoraco added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $tenderTenernessOverL1ToL6Thoraco = MhpTenderTenernessOverL1ToL6Thoraco::find($id);

        return response()->json(["status"=>200,"tenderTenernessOverL1ToL6Thoraco"=>$tenderTenernessOverL1ToL6Thoraco]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $tenderTenernessOverL1ToL6Thoraco =MhpTenderTenernessOverL1ToL6Thoraco::find($id);
            $tenderTenernessOverL1ToL6Thoraco->name = $request->name;
            $tenderTenernessOverL1ToL6Thoraco->save();
            return response()->json([
                "status" => 200,
                "message" => "Tender/Tenerness Over L1 To L6 Thoraco updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $tenderTenernessOverL1ToL6Thoraco = MhpTenderTenernessOverL1ToL6Thoraco::find($id);
        $tenderTenernessOverL1ToL6Thoraco-> delete_status = 1;
        $tenderTenernessOverL1ToL6Thoraco->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Tender/Tenerness Over L1 To L6 Thoraco deleted successfully"
        ]);
    }
}
