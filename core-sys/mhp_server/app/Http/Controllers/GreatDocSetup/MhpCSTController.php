<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCST;
use Illuminate\Support\Facades\Validator;

class MhpCSTController extends Controller
{
    //
    public function index()
    {
        $cST = MhpCST::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'cST' => $cST]
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

            $cST = new MhpCST();
            $cST->name = $request->name;

            $cST->save();

            return response()->json(['status' => 200, 'message' => 'CST Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cST = MhpCST::find($id);
        return response()->json(['status' => 200, 'cST' => $cST]);
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

            $update_cST = MhpCST::find($id);
            $update_cST->name = $request->name;
            $update_cST->update();

            return response()->json(['status' => 200, 'message' => 'CST Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cST = MhpCST::find($id);
        $del_cST->delete_status = 1;
        $del_cST->save();
        return response()->json([
            'status' => 200,
            'message' => 'CST deleted successfully',
        ]);
    }
}
