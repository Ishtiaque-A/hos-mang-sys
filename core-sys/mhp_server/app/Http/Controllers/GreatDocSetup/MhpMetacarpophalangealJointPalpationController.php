<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMetacarpophalangealJointPalpation;
use Illuminate\Support\Facades\Validator;

class MhpMetacarpophalangealJointPalpationController extends Controller
{
    //
    public function index()
    {
        $metacarpophalangealJointPalpation = MhpMetacarpophalangealJointPalpation::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'metacarpophalangealJointPalpation' => $metacarpophalangealJointPalpation]
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

            $metacarpophalangealJointPalpation = new MhpMetacarpophalangealJointPalpation();
            $metacarpophalangealJointPalpation->name = $request->name;

            $metacarpophalangealJointPalpation->save();

            return response()->json(['status' => 200, 'message' => 'Metacarpophalangeal Joint Palpation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $metacarpophalangealJointPalpation = MhpMetacarpophalangealJointPalpation::find($id);
        return response()->json(['status' => 200, 'metacarpophalangealJointPalpation' => $metacarpophalangealJointPalpation]);
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

            $update_metacarpophalangealJointPalpation = MhpMetacarpophalangealJointPalpation::find($id);
            $update_metacarpophalangealJointPalpation->name = $request->name;
            $update_metacarpophalangealJointPalpation->update();

            return response()->json(['status' => 200, 'message' => 'Metacarpophalangeal Joint Palpation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_metacarpophalangealJointPalpation = MhpMetacarpophalangealJointPalpation::find($id);
        $del_metacarpophalangealJointPalpation->delete_status = 1;
        $del_metacarpophalangealJointPalpation->save();
        return response()->json([
            'status' => 200,
            'message' => 'Metacarpophalangeal Joint Palpation deleted successfully',
        ]);
    }
}

