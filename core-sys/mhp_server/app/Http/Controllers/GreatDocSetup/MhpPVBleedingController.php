<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPVBleeding;
use Illuminate\Support\Facades\Validator;

class MhpPVBleedingController extends Controller
{
    //
    public function index()
    {
        $pVBleeding = MhpPVBleeding::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'pVBleeding' => $pVBleeding]
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

            $pVBleeding = new MhpPVBleeding();
            $pVBleeding->name = $request->name;

            $pVBleeding->save();

            return response()->json(['status' => 200, 'message' => 'PV Bleeding Added Successfully']);
        }
    }


    public function edit($id)
    {
        $pVBleeding = MhpPVBleeding::find($id);
        return response()->json(['status' => 200, 'pVBleeding' => $pVBleeding]);
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

            $update_pVBleeding = MhpPVBleeding::find($id);
            $update_pVBleeding->name = $request->name;
            $update_pVBleeding->update();

            return response()->json(['status' => 200, 'message' => 'PV Bleeding Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_pVBleeding = MhpPVBleeding::find($id);
        $del_pVBleeding->delete_status = 1;
        $del_pVBleeding->save();
        return response()->json([
            'status' => 200,
            'message' => 'PV Bleeding deleted successfully',
        ]);
    }
}

