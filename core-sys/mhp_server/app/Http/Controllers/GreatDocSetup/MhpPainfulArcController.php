<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPainfulArc;
use Illuminate\Support\Facades\Validator;

class MhpPainfulArcController extends Controller
{
    public function index()
    {
        $painfulArc = MhpPainfulArc::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "painfulArc" => $painfulArc]);
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
            $painfulArc = new MhpPainfulArc();
            $painfulArc->name = $request->name;
            $painfulArc->save();
            return response()->json([
                "status" => 200,
                "message" => "Painful Arc added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $painfulArc = MhpPainfulArc::find($id);

        return response()->json(["status"=>200,"painfulArc"=>$painfulArc]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $painfulArc =MhpPainfulArc::find($id);
            $painfulArc->name = $request->name;
            $painfulArc->save();
            return response()->json([
                "status" => 200,
                "message" => "Painful Arc updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $painfulArc = MhpPainfulArc::find($id);
        $painfulArc-> delete_status = 1;
        $painfulArc->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Painful Arc deleted successfully"
        ]);
    }
}
