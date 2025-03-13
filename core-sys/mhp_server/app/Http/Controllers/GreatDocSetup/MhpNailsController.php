<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpNails;
use Illuminate\Support\Facades\Validator;

class MhpNailsController extends Controller
{
    public function index()
    {
        $nails = MhpNails::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "nails" => $nails]);
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
            $nails = new MhpNails();
            $nails->name = $request->name;
            $nails->save();
            return response()->json([
                "status" => 200,
                "message" => "Nails added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $nails = MhpNails::find($id);

        return response()->json(["status"=>200,"nails"=>$nails]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $nails =MhpNails::find($id);
            $nails->name = $request->name;
            $nails->save();
            return response()->json([
                "status" => 200,
                "message" => "Nails updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $nails = MhpNails::find($id);
        $nails-> delete_status = 1;
        $nails->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Nails deleted successfully"
        ]);
    }
}
