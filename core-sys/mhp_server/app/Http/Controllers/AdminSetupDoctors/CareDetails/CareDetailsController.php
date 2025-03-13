<?php

namespace App\Http\Controllers\AdminSetupDoctors\CareDetails;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCareDetails;
use Illuminate\Support\Facades\Validator;
class CareDetailsController extends Controller
{
    public function index() {
        $care_details = MhpCareDetails::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'care_details'=>$care_details]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'care_details_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $care_details = new MhpCareDetails();
            $care_details->care_details_name = $request->care_details_name;
            $care_details->save();

            return response()->json(['status'=>200,'message'=>'care_details Added Successfully']);
        }
    }


    public function edit($id)
    {
        $care_details=MhpCareDetails::find($id);
        return response()->json(['status'=>200,'care_details'=>$care_details]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'care_details_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_care_details=MhpCareDetails::find($id);
            $update_care_details->care_details_name=$request->care_details_name;

            $update_care_details->update();

            return response()->json(['status'=>200,'message'=>'care_details  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_care_details = MhpCareDetails::find($id);

        if ($del_care_details)
        {
            if ($del_care_details['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_care_details->delete();
            return response()->json([
                'status' => 200,
                'message' => 'care_details  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No care_details  Found',
            ]);
        }


    }
}
