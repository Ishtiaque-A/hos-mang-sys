<?php

namespace App\Http\Controllers;

use App\Models\MhpInstitution;
use Illuminate\Http\Request;

class MhpInstitutionController extends Controller
{
    public function index () {
        $institution = MhpInstitution::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All Institutions",
            "institution" => $institution
        ]);
    }

    public function store(Request $request) {
        $institution = new MhpInstitution();
        $institution->name = $request->name;
        $institution->save();

        return response()->json([
            "status" => 200,
            "message" => "Institution Added Successfully"
        ]);
    }
    public function destroy($id)
    {
        $data = MhpInstitution::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Institution Deleted Successfully " 
        ]);
    }

    public function edit ($id) 
    {
        $data = MhpInstitution::find($id);

        return response()->json([
            'status' => 200,
            "institution" => $data
        ]);
    }
    public function update (Request $request,$id) 
    {
        $data = MhpInstitution::find($id);
        $data->name = $request->name;
        $data->update();

        return response()->json([
            'status' => 200,
            'message' => "Institute updated successfully"
        ]);
    }
}
