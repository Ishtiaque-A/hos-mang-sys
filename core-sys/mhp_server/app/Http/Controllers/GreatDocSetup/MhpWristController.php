<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWrist;
use Illuminate\Support\Facades\Validator;

class MhpWristController extends Controller
{
    //
    public function index()
    {
        $Wrist = MhpWrist::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'Wrist' => $Wrist]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'Wrist_name' => 'required|max:100',

            ],
            // ['status_id.required' => 'Status field is required!'] 
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $Wrist = new MhpWrist();
            $Wrist->Wrist_name = $request->Wrist_name;

            $Wrist->save();

            return response()->json(['status' => 200, 'message' => 'Wrist Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Wrist = MhpWrist::find($id);
        return response()->json(['status' => 200, 'Wrist' => $Wrist]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'Wrist_name' => 'required|max:100',


            ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $update_Wrist = MhpWrist::find($id);
            $update_Wrist->Wrist_name = $request->Wrist_name;
            $update_Wrist->update();

            return response()->json(['status' => 200, 'message' => 'Wrist Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Wrist = MhpWrist::find($id);
        $del_Wrist->delete_status = 1;
        $del_Wrist->save();
        return response()->json([
            'status' => 200,
            'message' => 'Wrist deleted successfully',
        ]);
    }
}
