<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBreastNippleDischarge;
use Illuminate\Support\Facades\Validator;

class MhpBreastNippleDischargeController extends Controller
{
    //
    public function index()
    {
        $breastNippleDischarge = MhpBreastNippleDischarge::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'breastNippleDischarge' => $breastNippleDischarge]
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

            $breastNippleDischarge = new MhpBreastNippleDischarge();
            $breastNippleDischarge->name = $request->name;

            $breastNippleDischarge->save();

            return response()->json(['status' => 200, 'message' => 'Breast Nipple Discharge Added Successfully']);
        }
    }


    public function edit($id)
    {
        $breastNippleDischarge = MhpBreastNippleDischarge::find($id);
        return response()->json(['status' => 200, 'breastNippleDischarge' => $breastNippleDischarge]);
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

            $update_breastNippleDischarge = MhpBreastNippleDischarge::find($id);
            $update_breastNippleDischarge->name = $request->name;
            $update_breastNippleDischarge->update();

            return response()->json(['status' => 200, 'message' => 'Breast Nipple Discharge Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_breastNippleDischarge = MhpBreastNippleDischarge::find($id);
        $del_breastNippleDischarge->delete_status = 1;
        $del_breastNippleDischarge->save();
        return response()->json([
            'status' => 200,
            'message' => 'Breast Nipple Discharge deleted successfully',
        ]);
    }
}

