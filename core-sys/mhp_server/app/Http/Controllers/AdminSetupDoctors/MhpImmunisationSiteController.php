<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpImmunisationSite;
use Illuminate\Support\Facades\Validator;

class MhpImmunisationSiteController extends Controller
{
    public function index()
    {
        $immunisationSite = MhpImmunisationSite::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "immunisationSite" => $immunisationSite]);
    }

    public function store(Request $request)
    {
       // return  $request->all();
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $immunisationSite = new MhpImmunisationSite();
            $immunisationSite->name = $request->name;
            $immunisationSite->save();
            return response()->json([
                "status" => 200,
                "message" => "Immunisation Site added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $immunisationSite = MhpImmunisationSite::find($id);

        return response()->json(["status"=>200,"immunisationSite"=>$immunisationSite]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $immunisationSite =MhpImmunisationSite::find($id);
            $immunisationSite->name = $request->name;
            $immunisationSite->save();
            return response()->json([
                "status" => 200,
                "message" => "Immunisation Site updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $immunisationSite = MhpImmunisationSite::find($id);
        $immunisationSite-> delete_status = 1;
        $immunisationSite->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Immunisation Site deleted successfully"
        ]);
    }
}
