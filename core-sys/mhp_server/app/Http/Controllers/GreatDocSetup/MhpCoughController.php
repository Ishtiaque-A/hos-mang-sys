<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpCough;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class MhpCoughController extends Controller
{
    //

    public function index()
    {
        $cough = MhpCough::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cough'=>$cough]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'cough_name' => 'required|max:100',
       
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
            $cough = new MhpCough();
            $cough->cough_name = $request->cough_name;

         $cough->save();

            return response()->json(['status'=>200,'message'=>'Cough  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cough=MhpCough::find($id);
        return response()->json(['status'=>200,'cough'=>$cough]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'cough_name' => 'required|max:100',
         

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
           
            $update_cough=MhpCough::find($id);
            $update_cough->cough_name=$request->cough_name;
            $update_cough->update();

            return response()->json(['status'=>200,'message'=>'Cough  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cough = MhpCough::find($id);
        if ($del_cough)
        {
            if ($del_cough['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cough->delete_status = $delete_status;
            $del_cough->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cough deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No cough Found',
            ]);
        }


    }
}
