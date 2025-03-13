<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWristPalpation;
use Illuminate\Support\Facades\Validator;

class MhpWristPalpationController extends Controller
{
    //
    public function index()
    {
        $wristPalpation = MhpWristPalpation::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'wristPalpation' => $wristPalpation]
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

            $wristPalpation = new MhpWristPalpation();
            $wristPalpation->name = $request->name;

            $wristPalpation->save();

            return response()->json(['status' => 200, 'message' => 'Wrist Palpation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $wristPalpation = MhpWristPalpation::find($id);
        return response()->json(['status' => 200, 'wristPalpation' => $wristPalpation]);
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

            $update_wristPalpation = MhpWristPalpation::find($id);
            $update_wristPalpation->name = $request->name;
            $update_wristPalpation->update();

            return response()->json(['status' => 200, 'message' => 'Wrist Palpation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_wristPalpation = MhpWristPalpation::find($id);
        $del_wristPalpation->delete_status = 1;
        $del_wristPalpation->save();
        return response()->json([
            'status' => 200,
            'message' => 'Wrist Palpation deleted successfully',
        ]);
    }
}
