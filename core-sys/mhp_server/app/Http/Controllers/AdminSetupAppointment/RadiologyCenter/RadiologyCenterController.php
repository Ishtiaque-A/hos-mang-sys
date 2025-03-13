<?php

namespace App\Http\Controllers\AdminSetupAppointment\RadiologyCenter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRadiologyCenter;
use Validator;
class RadiologyCenterController extends Controller
{
    
    public function index()
    {
        $radiology_center = MhpRadiologyCenter::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'radiology_center'=>$radiology_center]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'radiology_center_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $radiology_center = new MhpRadiologyCenter();
            $radiology_center->radiology_center_name = $request->radiology_center_name;
            $radiology_center->save();

            return response()->json(['status'=>200,'message'=>'Radiology Center Added Successfully']);
        }
    }


    public function edit($id)
    {
        $radiology_center=MhpRadiologyCenter::find($id);
        return response()->json(['status'=>200,'radiology_center'=>$radiology_center]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'radiology_center_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_radiology_center=MhpRadiologyCenter::find($id);
            $update_radiology_center->radiology_center_name=$request->radiology_center_name;

            $update_radiology_center->update();

            return response()->json(['status'=>200,'message'=>'Radiology Center  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_radiology_center = MhpRadiologyCenter::find($id);

        if ($del_radiology_center)
        {
            if ($del_radiology_center['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_radiology_center->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Radio Center  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No radiology_center  Found',
            ]);
        }


    }
}
