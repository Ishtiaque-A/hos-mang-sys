<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpSleepApnoeaRisk;
use Illuminate\Support\Facades\Validator;

class MhpSleepApnoeaRiskController extends Controller
{
    //
    public function index()
    {
        $sleepapnoearisk = MhpSleepApnoeaRisk::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'sleepapnoearisk'=>$sleepapnoearisk]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'sleepapnoearisk_name' => 'required|max:100',
       
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
           
            $sleepapnoearisk = new MhpSleepApnoeaRisk();
            $sleepapnoearisk->sleepapnoearisk_name = $request->sleepapnoearisk_name;

         $sleepapnoearisk->save();

            return response()->json(['status'=>200,'message'=>'Sleep Apnoea Risk Added Successfully']);
        }
    }


    public function edit($id)
    {
        $sleepapnoearisk=MhpSleepApnoeaRisk::find($id);
        return response()->json(['status'=>200,'sleepapnoearisk'=>$sleepapnoearisk]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'sleepapnoearisk_name' => 'required|max:100',
         

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
           
            $update_sleepapnoearisk=MhpSleepApnoeaRisk::find($id);
            $update_sleepapnoearisk->sleepapnoearisk_name=$request->sleepapnoearisk_name;
            $update_sleepapnoearisk->update();

            return response()->json(['status'=>200,'message'=>'Sleep Apnoea Risk  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        
        $del_sleepapnoearisk = MhpSleepApnoeaRisk::find($id);
        if ($del_sleepapnoearisk)
        {
            if ($del_sleepapnoearisk['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_sleepapnoearisk->delete_status = $delete_status;
            $del_sleepapnoearisk->save();
            return response()->json([
                'status' => 200,
                'message' => 'Sleep Apnoea Risk deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Sleep Apnoea Risk Found',
            ]);
        }

    }
}
