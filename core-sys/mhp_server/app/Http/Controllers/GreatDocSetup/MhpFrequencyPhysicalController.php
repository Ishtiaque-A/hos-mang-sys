<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFrequencyPhysical;
use Illuminate\Support\Facades\Validator;

class MhpFrequencyPhysicalController extends Controller
{
    //
    public function index()
    {
        $frequencyPhysical = MhpFrequencyPhysical::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'frequencyPhysical'=>$frequencyPhysical]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
       
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
           
            $frequencyPhysical = new MhpFrequencyPhysical();
            $frequencyPhysical->name = $request->name;

         $frequencyPhysical->save();

            return response()->json(['status'=>200,'message'=>'Frequency Physical Added Successfully']);
        }
    }


    public function edit($id)
    {
        $frequencyPhysical=MhpFrequencyPhysical::find($id);
        return response()->json(['status'=>200,'frequencyPhysical'=>$frequencyPhysical]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
         
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
           
            $update_frequencyPhysical=MhpFrequencyPhysical::find($id);
            $update_frequencyPhysical->name=$request->name;
            $update_frequencyPhysical->update();

            return response()->json(['status'=>200,'message'=>'Frequency Physical Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_frequencyPhysical = MhpFrequencyPhysical::find($id);
        if ($del_frequencyPhysical)
        {
            if ($del_frequencyPhysical['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_frequencyPhysical->delete_status = $delete_status;
            $del_frequencyPhysical->save();
            return response()->json([
                'status' => 200,
                'message' => 'Frequency Physical deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Frequency Physical Found',
            ]);
        }

    }
}



