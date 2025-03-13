<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFlexonTendons;
use Illuminate\Support\Facades\Validator;

class MhpFlexonTendonsController extends Controller
{
    public function index()
    {
        $flexonTendons = MhpFlexonTendons::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "flexonTendons" => $flexonTendons]);
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
            $flexonTendons = new MhpFlexonTendons();
            $flexonTendons->name = $request->name;
            $flexonTendons->save();
            return response()->json([
                "status" => 200,
                "message" => "Flexon Tendons added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $flexonTendons = MhpFlexonTendons::find($id);

        return response()->json(["status"=>200,"flexonTendons"=>$flexonTendons]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $flexonTendons =MhpFlexonTendons::find($id);
            $flexonTendons->name = $request->name;
            $flexonTendons->save();
            return response()->json([
                "status" => 200,
                "message" => "Flexon Tendons updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $flexonTendons = MhpFlexonTendons::find($id);
        $flexonTendons-> delete_status = 1;
        $flexonTendons->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Flexon Tendons deleted successfully"
        ]);
    }
}

