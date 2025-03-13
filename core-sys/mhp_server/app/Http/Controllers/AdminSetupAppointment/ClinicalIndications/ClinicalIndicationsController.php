<?php

namespace App\Http\Controllers\AdminSetupAppointment\ClinicalIndications;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\MhpClinicalIndications;

class ClinicalIndicationsController extends Controller
{
    public function index()
    {
        $clinical_indications = MhpClinicalIndications::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'clinical_indications'=>$clinical_indications]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'clinical_indications_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $clinical_indications = new MhpClinicalIndications();
            $clinical_indications->clinical_indications_name = $request->clinical_indications_name;
            $clinical_indications->save();

            return response()->json(['status'=>200,'message'=>'Clinical indications Added Successfully']);
        }
    }


    public function edit($id)
    {
        $clinical_indications=MhpClinicalIndications::find($id);
        return response()->json(['status'=>200,'clinical_indications'=>$clinical_indications]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'clinical_indications_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_clinical_indications=MhpClinicalIndications::find($id);
            $update_clinical_indications->clinical_indications_name=$request->clinical_indications_name;

            $update_clinical_indications->update();

            return response()->json(['status'=>200,'message'=>'Clinical indications  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_clinical_indications = MhpClinicalIndications::find($id);

        if ($del_clinical_indications)
        {
            if ($del_clinical_indications['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_clinical_indications->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Clinical indications  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No clinical_indications  Found',
            ]);
        }


    }
}
