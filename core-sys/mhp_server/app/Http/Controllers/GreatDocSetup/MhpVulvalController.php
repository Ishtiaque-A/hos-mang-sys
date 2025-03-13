<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVulval;
use Illuminate\Support\Facades\Validator;

class MhpVulvalController extends Controller
{
    //
    public function index()
    {
        $vulval = MhpVulval::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'vulval' => $vulval]
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

            $vulval = new MhpVulval();
            $vulval->name = $request->name;

            $vulval->save();

            return response()->json(['status' => 200, 'message' => 'Vulval Added Successfully']);
        }
    }


    public function edit($id)
    {
        $vulval = MhpVulval::find($id);
        return response()->json(['status' => 200, 'vulval' => $vulval]);
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

            $update_vulval = MhpVulval::find($id);
            $update_vulval->name = $request->name;
            $update_vulval->update();

            return response()->json(['status' => 200, 'message' => 'Vulval Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_vulval = MhpVulval::find($id);
        $del_vulval->delete_status = 1;
        $del_vulval->save();
        return response()->json([
            'status' => 200,
            'message' => 'Vulval deleted successfully',
        ]);
    }
}
