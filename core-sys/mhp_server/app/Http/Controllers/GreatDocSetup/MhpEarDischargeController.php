<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEarDischarge;
use Illuminate\Support\Facades\Validator;

class MhpEarDischargeController extends Controller
{
    //
    public function index()
    {
        $EarDischarge = MhpEarDischarge::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'EarDischarge'=>$EarDischarge]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'EarDischarge_name' => 'required|max:100',
       
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
           
            $EarDischarge = new MhpEarDischarge();
            $EarDischarge->EarDischarge_name = $request->EarDischarge_name;

         $EarDischarge->save();

            return response()->json(['status'=>200,'message'=>'Ear Discharge Added Successfully']);
        }
    }


    public function edit($id)
    {
        $EarDischarge=MhpEarDischarge::find($id);
        return response()->json(['status'=>200,'EarDischarge'=>$EarDischarge]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'EarDischarge_name' => 'required|max:100',
         

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
           
            $update_EarDischarge=MhpEarDischarge::find($id);
            $update_EarDischarge->EarDischarge_name=$request->EarDischarge_name;
            $update_EarDischarge->update();

            return response()->json(['status'=>200,'message'=>'Ear Discharge Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_EarDischarge = MhpEarDischarge::find($id);
        if ($del_EarDischarge)
        {
            if ($del_EarDischarge['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_EarDischarge->delete_status = $delete_status;
            $del_EarDischarge->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ear Discharge deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ear Discharge Found',
            ]);
        }

    }
}
