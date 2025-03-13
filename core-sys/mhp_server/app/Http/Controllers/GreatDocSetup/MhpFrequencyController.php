<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFrequency;
use Illuminate\Support\Facades\Validator;

class MhpFrequencyController extends Controller
{
    //
    public function index()
    {
        $Frequency = MhpFrequency::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Frequency'=>$Frequency]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Frequency_name' => 'required|max:100',
       
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
           
            $Frequency = new MhpFrequency();
            $Frequency->Frequency_name = $request->Frequency_name;

         $Frequency->save();

            return response()->json(['status'=>200,'message'=>'Frequency Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Frequency=MhpFrequency::find($id);
        return response()->json(['status'=>200,'Frequency'=>$Frequency]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Frequency_name' => 'required|max:100',
         

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
           
            $update_Frequency=MhpFrequency::find($id);
            $update_Frequency->Frequency_name=$request->Frequency_name;
            $update_Frequency->update();

            return response()->json(['status'=>200,'message'=>'Frequency Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Frequency = MhpFrequency::find($id);
        if ($del_Frequency)
        {
            if ($del_Frequency['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Frequency->delete_status = $delete_status;
            $del_Frequency->save();
            return response()->json([
                'status' => 200,
                'message' => 'Frequency deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Frequency Found',
            ]);
        }

    }
}

