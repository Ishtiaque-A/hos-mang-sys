<?php

namespace App\Http\Controllers;

use App\Models\MhpGeneralNote;
use Illuminate\Http\Request;

class MhpGeneralNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpGeneralNote::orderBy("id", "desc")->get();

        return response()->json([
            "status" => 200,
            "notes" => $data
        ]);
    }

    public function store(Request $request)
    {
        $data = new MhpGeneralNote();
        $data-> name = $request->name;

        $data->save();

        return response()->json([
            'status' => 200,
            "message" => "General Note Added Successfully"
        ]);
    }

    public function edit(MhpGeneralNote $id)
    {
      $data = MhpGeneralNote::find($id);

      return response()->json([
        "status" => 200,
        "note" => $data
      ]);
    }

    
    public function update(Request $request, $id)
    {
        $data = MhpGeneralNote::find($id);
        $data-> name = $request->name;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "General Note Updated Successfully",
        ]);
    }

    
    public function delete($id)
    {
        $data = MhpGeneralNote::find($id);
        $data->delete();

        return response()->json([
            "status" => 200,
            "message" => "Note Deleted Successfully"
        ]);
    }
}
