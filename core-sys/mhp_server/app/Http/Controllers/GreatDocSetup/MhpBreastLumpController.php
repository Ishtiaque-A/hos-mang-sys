<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBreastLump;
use Illuminate\Support\Facades\Validator;

class MhpBreastLumpController extends Controller
{
    //
    public function index()
    {
        $breastLump = MhpBreastLump::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'breastLump' => $breastLump]
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

            $breastLump = new MhpBreastLump();
            $breastLump->name = $request->name;

            $breastLump->save();

            return response()->json(['status' => 200, 'message' => 'Breast Lump Added Successfully']);
        }
    }


    public function edit($id)
    {
        $breastLump = MhpBreastLump::find($id);
        return response()->json(['status' => 200, 'breastLump' => $breastLump]);
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

            $update_breastLump = MhpBreastLump::find($id);
            $update_breastLump->name = $request->name;
            $update_breastLump->update();

            return response()->json(['status' => 200, 'message' => 'Breast Lump Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_breastLump = MhpBreastLump::find($id);
        $del_breastLump->delete_status = 1;
        $del_breastLump->save();
        return response()->json([
            'status' => 200,
            'message' => 'Breast Lump deleted successfully',
        ]);
    }
}

