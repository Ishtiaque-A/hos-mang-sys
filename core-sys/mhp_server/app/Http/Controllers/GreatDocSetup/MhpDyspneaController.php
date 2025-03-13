<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpDyspnea;
// use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class MhpDyspneaController extends Controller
{
    //

    public function index()
    {
        $dyspnea = MhpDyspnea::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'dyspnea'=>$dyspnea]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'dyspnea_name' => 'required|max:100',
       
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
           
            $dyspnea = new MhpDyspnea();
            $dyspnea->dyspnea_name = $request->dyspnea_name;

         $dyspnea->save();

            return response()->json(['status'=>200,'message'=>'Dyspnea  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $dyspnea=MhpDyspnea::find($id);
        return response()->json(['status'=>200,'dyspnea'=>$dyspnea]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'dyspnea_name' => 'required|max:100',
         

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
           
            $update_dyspnea=MhpDyspnea::find($id);
            $update_dyspnea->dyspnea_name=$request->dyspnea_name;
            $update_dyspnea->update();

            return response()->json(['status'=>200,'message'=>'Dyspnea  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_dyspnea = MhpDyspnea::find($id);
        if ($del_dyspnea)
        {
            if ($del_dyspnea['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_dyspnea->delete_status = $delete_status;
            $del_dyspnea->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dyspnea deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dyspnea Found',
            ]);
        }

    }
    // public function examination_dropdown(){
    //     $status_list = MhpHistoryExaminationStatus::where('delete_status',0)->orderBy('id','desc')->get();
    //     return response()->json([
    //         'status'=>200,
    //         'status_list'=>$status_list
    //     ]);
    // }
}

