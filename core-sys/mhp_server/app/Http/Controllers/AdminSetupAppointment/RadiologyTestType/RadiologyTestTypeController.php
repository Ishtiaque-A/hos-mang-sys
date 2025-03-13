<?php

namespace App\Http\Controllers\AdminSetupAppointment\RadiologyTestType;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRadiologyTestType;
use Validator;
use DB;
class RadiologyTestTypeController extends Controller
{
  public function index()
    {
        $radiology_test_type = MhpRadiologyTestType::where('delete_status',0)->orderBy('id','desc')->get();  

    
        return response()->json(
            ['status'=>200,'radiology_test_type'=>$radiology_test_type]);
    }


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'radiology_test_type' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $radiology_test_type = new MhpRadiologyTestType();
            $radiology_test_type->radiology_test_type = $request->radiology_test_type;
            $radiology_test_type->save();

            return response()->json(['status'=>200,'message'=>'Radiology Test Type Added Successfully']);
        }
    }


    public function edit($id)
    {
        $radiology_test_type=MhpRadiologyTestType::find($id);
        return response()->json(['status'=>200,'radiology_test_type'=>$radiology_test_type]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'radiology_test_type' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_radiology_test_type=MhpRadiologyTestType::find($id);
            $update_radiology_test_type->radiology_test_type=$request->radiology_test_type;


            $update_radiology_test_type->update();

            return response()->json(['status'=>200,'message'=>'Radiology Test Type  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_radiology_test_type = MhpRadiologyTestType::find($id);

        if ($del_radiology_test_type)
        {
            if ($del_radiology_test_type['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_radiology_test_type->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Radiology Test Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No radiology_test_type  Found',
            ]);
        }


    }
}
