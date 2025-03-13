<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMiscarriage;
use Illuminate\Support\Facades\Validator;

class MhpMiscarriageController extends Controller
{
    //
    public function index()
    {
        $miscarriage = MhpMiscarriage::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'miscarriage' => $miscarriage]
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

            $miscarriage = new MhpMiscarriage();
            $miscarriage->name = $request->name;

            $miscarriage->save();

            return response()->json(['status' => 200, 'message' => 'Miscarriage Added Successfully']);
        }
    }


    public function edit($id)
    {
        $miscarriage = MhpMiscarriage::find($id);
        return response()->json(['status' => 200, 'miscarriage' => $miscarriage]);
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

            $update_miscarriage = MhpMiscarriage::find($id);
            $update_miscarriage->name = $request->name;
            $update_miscarriage->update();

            return response()->json(['status' => 200, 'message' => 'Miscarriage Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_miscarriage = MhpMiscarriage::find($id);
        $del_miscarriage->delete_status = 1;
        $del_miscarriage->save();
        return response()->json([
            'status' => 200,
            'message' => 'Miscarriage deleted successfully',
        ]);
    }
}

