<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVulva;
use Illuminate\Support\Facades\Validator;

class MhpVulvaController extends Controller
{
    //
    public function index()
    {
        $vulva = MhpVulva::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'vulva' => $vulva]
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

            $vulva = new MhpVulva();
            $vulva->name = $request->name;

            $vulva->save();

            return response()->json(['status' => 200, 'message' => 'Vulva Added Successfully']);
        }
    }


    public function edit($id)
    {
        $vulva = MhpVulva::find($id);
        return response()->json(['status' => 200, 'vulva' => $vulva]);
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

            $update_vulva = MhpVulva::find($id);
            $update_vulva->name = $request->name;
            $update_vulva->update();

            return response()->json(['status' => 200, 'message' => 'Vulva Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_vulva = MhpVulva::find($id);
        $del_vulva->delete_status = 1;
        $del_vulva->save();
        return response()->json([
            'status' => 200,
            'message' => 'Vulva deleted successfully',
        ]);
    }
}

