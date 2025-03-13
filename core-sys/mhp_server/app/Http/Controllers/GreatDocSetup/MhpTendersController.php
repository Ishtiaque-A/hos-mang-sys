<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTenders;
use Illuminate\Support\Facades\Validator;

class MhpTendersController extends Controller
{
    public function index()
    {
        $tenders = MhpTenders::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "tenders" => $tenders]);
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
            $tenders = new MhpTenders();
            $tenders->name = $request->name;
            $tenders->save();
            return response()->json([
                "status" => 200,
                "message" => "Tenders added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $tenders = MhpTenders::find($id);

        return response()->json(["status"=>200,"tenders"=>$tenders]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $tenders =MhpTenders::find($id);
            $tenders->name = $request->name;
            $tenders->save();
            return response()->json([
                "status" => 200,
                "message" => "Tenders updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $tenders = MhpTenders::find($id);
        $tenders-> delete_status = 1;
        $tenders->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Tenders deleted successfully"
        ]);
    }
}
