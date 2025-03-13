<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPVDischarge;
use Illuminate\Support\Facades\Validator;

class MhpPVDischargeController extends Controller
{
    //
    public function index()
    {
        $pVDischarge = MhpPVDischarge::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'pVDischarge' => $pVDischarge]
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

            $pVDischarge = new MhpPVDischarge();
            $pVDischarge->name = $request->name;

            $pVDischarge->save();

            return response()->json(['status' => 200, 'message' => 'PV Discharge Added Successfully']);
        }
    }


    public function edit($id)
    {
        $pVDischarge = MhpPVDischarge::find($id);
        return response()->json(['status' => 200, 'pVDischarge' => $pVDischarge]);
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

            $update_pVDischarge = MhpPVDischarge::find($id);
            $update_pVDischarge->name = $request->name;
            $update_pVDischarge->update();

            return response()->json(['status' => 200, 'message' => 'PV Discharge Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_pVDischarge = MhpPVDischarge::find($id);
        $del_pVDischarge->delete_status = 1;
        $del_pVDischarge->save();
        return response()->json([
            'status' => 200,
            'message' => 'PV Discharge deleted successfully',
        ]);
    }
}
