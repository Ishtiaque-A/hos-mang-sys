<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBreastPain;
use Illuminate\Support\Facades\Validator;

class MhpBreastPainController extends Controller
{
    //
    public function index()
    {
        $breastPain = MhpBreastPain::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'breastPain' => $breastPain]
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

            $breastPain = new MhpBreastPain();
            $breastPain->name = $request->name;

            $breastPain->save();

            return response()->json(['status' => 200, 'message' => 'Breast Pain Added Successfully']);
        }
    }


    public function edit($id)
    {
        $breastPain = MhpBreastPain::find($id);
        return response()->json(['status' => 200, 'breastPain' => $breastPain]);
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

            $update_breastPain = MhpBreastPain::find($id);
            $update_breastPain->name = $request->name;
            $update_breastPain->update();

            return response()->json(['status' => 200, 'message' => 'Breast Pain Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_breastPain = MhpBreastPain::find($id);
        $del_breastPain->delete_status = 1;
        $del_breastPain->save();
        return response()->json([
            'status' => 200,
            'message' => 'Breast Pain deleted successfully',
        ]);
    }
}
