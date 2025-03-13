<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVolumeWomen;
use Illuminate\Support\Facades\Validator;

class MhpVolumeWomenController extends Controller
{
    //
    public function index()
    {
        $volumeWomen = MhpVolumeWomen::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'volumeWomen' => $volumeWomen]
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

            $volumeWomen = new MhpVolumeWomen();
            $volumeWomen->name = $request->name;

            $volumeWomen->save();

            return response()->json(['status' => 200, 'message' => 'Volume Women Added Successfully']);
        }
    }


    public function edit($id)
    {
        $volumeWomen = MhpVolumeWomen::find($id);
        return response()->json(['status' => 200, 'volumeWomen' => $volumeWomen]);
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

            $update_volumeWomen = MhpVolumeWomen::find($id);
            $update_volumeWomen->name = $request->name;
            $update_volumeWomen->update();

            return response()->json(['status' => 200, 'message' => 'Volume Women Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_volumeWomen = MhpVolumeWomen::find($id);
        $del_volumeWomen->delete_status = 1;
        $del_volumeWomen->save();
        return response()->json([
            'status' => 200,
            'message' => 'Volume Women deleted successfully',
        ]);
    }
}
