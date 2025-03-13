<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPelvicMass;
use Illuminate\Support\Facades\Validator;

class MhpPelvicMassController extends Controller
{
    //
    public function index()
    {
        $pelvicMass = MhpPelvicMass::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'pelvicMass' => $pelvicMass]
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

            $pelvicMass = new MhpPelvicMass();
            $pelvicMass->name = $request->name;

            $pelvicMass->save();

            return response()->json(['status' => 200, 'message' => 'Pelvic Mass Added Successfully']);
        }
    }


    public function edit($id)
    {
        $pelvicMass = MhpPelvicMass::find($id);
        return response()->json(['status' => 200, 'pelvicMass' => $pelvicMass]);
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

            $update_pelvicMass = MhpPelvicMass::find($id);
            $update_pelvicMass->name = $request->name;
            $update_pelvicMass->update();

            return response()->json(['status' => 200, 'message' => 'Pelvic Mass Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_pelvicMass = MhpPelvicMass::find($id);
        $del_pelvicMass->delete_status = 1;
        $del_pelvicMass->save();
        return response()->json([
            'status' => 200,
            'message' => 'Pelvic Mass deleted successfully',
        ]);
    }
}

