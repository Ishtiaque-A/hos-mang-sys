<?php

namespace App\Http\Controllers\AdminSetupAppointment\RadiologyTestName;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRadiologyTestName;
use Validator;
use DB;
class RadiologyTestNameController extends Controller
{
    
    public function index()
    {
    

     $radiology_test_name = DB::table('mhp_radiology_test_names')->leftJoin('mhp_radiology_test_types','mhp_radiology_test_names.radiology_test_type_id','=','mhp_radiology_test_types.id')->where('mhp_radiology_test_names.delete_status',0)->orderBy('mhp_radiology_test_names.id','desc')->select('mhp_radiology_test_names.*','mhp_radiology_test_types.radiology_test_type')->get();


        return response()->json(
            ['status'=>200,'radiology_test_name'=>$radiology_test_name]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'radiology_test_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $radiology_test_name = new MhpRadiologyTestName();
            $radiology_test_name->radiology_test_name = $request->radiology_test_name;
            $radiology_test_name->radiology_test_type_id = $request->radiology_test_type_id;
            $radiology_test_name->save();

            return response()->json(['status'=>200,'message'=>'Radiology Test Name Added Successfully']);
        }
    }


    public function edit($id)
    {
        $radiology_test_name=MhpRadiologyTestName::find($id);
        return response()->json(['status'=>200,'radiology_test_name'=>$radiology_test_name]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'radiology_test_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_radiology_test_name=MhpRadiologyTestName::find($id);
            $update_radiology_test_name->radiology_test_name=$request->radiology_test_name;
            $update_radiology_test_name->radiology_test_type_id = $request->radiology_test_type_id;


            $update_radiology_test_name->update();

            return response()->json(['status'=>200,'message'=>'Radiology Test Name  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_radiology_test_name = MhpRadiologyTestName::find($id);

        if ($del_radiology_test_name)
        {
            if ($del_radiology_test_name['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_radiology_test_name->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Radiology Test Name deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No radiology_test_name  Found',
            ]);
        }


    }

    public function getAllRadiologyTestName($id){

        $all_test_names=MhpRadiologyTestName::where('radiology_test_type_id',$id)->where('delete_status',0)->get();

           return response()->json([
                'status' => 200,
                'all_test_names' =>$all_test_names,
            ]);
    }
}
