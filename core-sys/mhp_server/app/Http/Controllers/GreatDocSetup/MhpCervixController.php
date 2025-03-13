<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCervix;
use Illuminate\Support\Facades\Validator;

class MhpCervixController extends Controller
{
    //
    public function index()
    {
        $cervix = MhpCervix::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'cervix' => $cervix]
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

            $cervix = new MhpCervix();
            $cervix->name = $request->name;

            $cervix->save();

            return response()->json(['status' => 200, 'message' => 'Cervix Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cervix = MhpCervix::find($id);
        return response()->json(['status' => 200, 'cervix' => $cervix]);
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

            $update_cervix = MhpCervix::find($id);
            $update_cervix->name = $request->name;
            $update_cervix->update();

            return response()->json(['status' => 200, 'message' => 'Cervix Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cervix = MhpCervix::find($id);
        $del_cervix->delete_status = 1;
        $del_cervix->save();
        return response()->json([
            'status' => 200,
            'message' => 'Cervix deleted successfully',
        ]);
    }
}

