<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSkinSymptoms;
use Illuminate\Support\Facades\Validator;

class MhpSkinSymptomsController extends Controller
{
    //
    public function index()
    {
        $skinSymptoms = MhpSkinSymptoms::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'skinSymptoms' => $skinSymptoms]
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

            $skinSymptoms = new MhpSkinSymptoms();
            $skinSymptoms->name = $request->name;

            $skinSymptoms->save();

            return response()->json(['status' => 200, 'message' => 'Skin Symptoms Added Successfully']);
        }
    }


    public function edit($id)
    {
        $skinSymptoms = MhpSkinSymptoms::find($id);
        return response()->json(['status' => 200, 'skinSymptoms' => $skinSymptoms]);
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

            $update_skinSymptoms = MhpSkinSymptoms::find($id);
            $update_skinSymptoms->name = $request->name;
            $update_skinSymptoms->update();

            return response()->json(['status' => 200, 'message' => 'Skin Symptoms Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_skinSymptoms = MhpSkinSymptoms::find($id);
        $del_skinSymptoms->delete_status = 1;
        $del_skinSymptoms->save();
        return response()->json([
            'status' => 200,
            'message' => 'Skin Symptoms deleted successfully',
        ]);
    }
}

