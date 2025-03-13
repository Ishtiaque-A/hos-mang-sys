<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBartholinGlandes;
use Illuminate\Support\Facades\Validator;

class MhpBartholinGlandesController extends Controller
{
    //
    public function index()
    {
        $bartholinGlandes = MhpBartholinGlandes::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'bartholinGlandes' => $bartholinGlandes]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|max:100',

            ],
            // ['status_id.required' => 'Status field is required!'] 
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $bartholinGlandes = new MhpBartholinGlandes();
            $bartholinGlandes->name = $request->name;

            $bartholinGlandes->save();

            return response()->json(['status' => 200, 'message' => 'Bartholin Glandes Added Successfully']);
        }
    }


    public function edit($id)
    {
        $bartholinGlandes = MhpBartholinGlandes::find($id);
        return response()->json(['status' => 200, 'bartholinGlandes' => $bartholinGlandes]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|max:100',


            ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $update_bartholinGlandes = MhpBartholinGlandes::find($id);
            $update_bartholinGlandes->name = $request->name;
            $update_bartholinGlandes->update();

            return response()->json(['status' => 200, 'message' => 'Bartholin Glandes Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_bartholinGlandes = MhpBartholinGlandes::find($id);
        $del_bartholinGlandes->delete_status = 1;
        $del_bartholinGlandes->save();
        return response()->json([
            'status' => 200,
            'message' => 'Bartholin Glandes deleted successfully',
        ]);
    }
}

