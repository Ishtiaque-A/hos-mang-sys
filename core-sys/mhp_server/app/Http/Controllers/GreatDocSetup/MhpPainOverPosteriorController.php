<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpPainOverPosterior;
use Illuminate\Support\Facades\Validator;

class MhpPainOverPosteriorController extends Controller
{
    public function index()
    {
        $painOverPosterior = MhpPainOverPosterior::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "painOverPosterior" => $painOverPosterior]);
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
            $painOverPosterior = new MhpPainOverPosterior();
            $painOverPosterior->name = $request->name;
            $painOverPosterior->save();
            return response()->json([
                "status" => 200,
                "message" => "Pain Over Posterior added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $painOverPosterior = MhpPainOverPosterior::find($id);

        return response()->json(["status"=>200,"painOverPosterior"=>$painOverPosterior]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $painOverPosterior =MhpPainOverPosterior::find($id);
            $painOverPosterior->name = $request->name;
            $painOverPosterior->save();
            return response()->json([
                "status" => 200,
                "message" => "Pain Over Posterior updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $painOverPosterior = MhpPainOverPosterior::find($id);
        $painOverPosterior-> delete_status = 1;
        $painOverPosterior->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Pain Over Posterior deleted successfully"
        ]);
    }
}

