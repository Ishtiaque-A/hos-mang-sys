<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSkinType;
use Illuminate\Support\Facades\Validator;

class MhpSkinTypeController extends Controller
{
    //
    public function index()
    {
        $skinType = MhpSkinType::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'skinType' => $skinType]
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

            $skinType = new MhpSkinType();
            $skinType->name = $request->name;

            $skinType->save();

            return response()->json(['status' => 200, 'message' => 'Skin Type Added Successfully']);
        }
    }


    public function edit($id)
    {
        $skinType = MhpSkinType::find($id);
        return response()->json(['status' => 200, 'skinType' => $skinType]);
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

            $update_skinType = MhpSkinType::find($id);
            $update_skinType->name = $request->name;
            $update_skinType->update();

            return response()->json(['status' => 200, 'message' => 'Skin Type Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_skinType = MhpSkinType::find($id);
        $del_skinType->delete_status = 1;
        $del_skinType->save();
        return response()->json([
            'status' => 200,
            'message' => 'Skin Type deleted successfully',
        ]);
    }
}
