<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpMedicalHistory;
use Illuminate\Support\Facades\Validator;


class MhpMedicalHistoryController extends Controller
{
    //
    public function index()
    {
        $medicalhistory = MhpMedicalHistory::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'medicalhistory'=>$medicalhistory]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'medicalhistory_name' => 'required|max:100',
       
        ],
        // ['status_id.required' => 'Status field is required!'] 
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } 
        else{
           
            $medicalhistory = new MhpMedicalHistory();
            $medicalhistory->medicalhistory_name = $request->medicalhistory_name;

         $medicalhistory->save();

            return response()->json(['status'=>200,'message'=>'Medical History Added Successfully']);
        }
    }


    public function edit($id)
    {
        $medicalhistory=MhpMedicalHistory::find($id);
        return response()->json(['status'=>200,'medicalhistory'=>$medicalhistory]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'medicalhistory_name' => 'required|max:100',
         

        ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
         else{
           
            $update_medicalhistory=MhpMedicalHistory::find($id);
            $update_medicalhistory->medicalhistory_name=$request->medicalhistory_name;
            $update_medicalhistory->update();

            return response()->json(['status'=>200,'message'=>'Medical History  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_medicalhistory = MhpMedicalHistory::find($id);
        if ($del_medicalhistory)
        {
            if ($del_medicalhistory['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_medicalhistory->delete_status = $delete_status;
            $del_medicalhistory->save();
            return response()->json([
                'status' => 200,
                'message' => 'Medical History deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Medical History Found',
            ]);
        }

    }
}
