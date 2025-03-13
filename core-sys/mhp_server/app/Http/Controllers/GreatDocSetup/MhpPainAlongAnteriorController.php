<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpPainAlongAnterior;
use Illuminate\Support\Facades\Validator;

class MhpPainAlongAnteriorController extends Controller
{
    public function index()
    {
        $painAlongAnterior = MhpPainAlongAnterior::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "painAlongAnterior" => $painAlongAnterior]);
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
            $painAlongAnterior = new MhpPainAlongAnterior();
            $painAlongAnterior->name = $request->name;
            $painAlongAnterior->save();
            return response()->json([
                "status" => 200,
                "message" => "Pain Along Anterior added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $painAlongAnterior = MhpPainAlongAnterior::find($id);

        return response()->json(["status"=>200,"painAlongAnterior"=>$painAlongAnterior]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $painAlongAnterior =MhpPainAlongAnterior::find($id);
            $painAlongAnterior->name = $request->name;
            $painAlongAnterior->save();
            return response()->json([
                "status" => 200,
                "message" => "Pain Along Anterior updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $painAlongAnterior = MhpPainAlongAnterior::find($id);
        $painAlongAnterior-> delete_status = 1;
        $painAlongAnterior->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Pain Along Anterior deleted successfully"
        ]);
    }
}

