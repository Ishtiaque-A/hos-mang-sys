<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRadioFemoralDelay;
use Illuminate\Support\Facades\Validator;

class MhpRadioFemoralDelayController extends Controller
{
    //
    public function index()
    {
        $name = MhpRadioFemoralDelay::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'name'=>$name]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name_name' => 'required|max:100',
       
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
           
            $name = new MhpRadioFemoralDelay();
            $name->name_name = $request->name_name;

         $name->save();

            return response()->json(['status'=>200,'message'=>'Radio Femoral Delay Added Successfully']);
        }
    }


    public function edit($id)
    {
        $name=MhpRadioFemoralDelay::find($id);
        return response()->json(['status'=>200,'name'=>$name]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name_name' => 'required|max:100',
         

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
           
            $update_name=MhpRadioFemoralDelay::find($id);
            $update_name->name_name=$request->name_name;
            $update_name->update();

            return response()->json(['status'=>200,'message'=>'Radio Femoral Delay Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_name = MhpRadioFemoralDelay::find($id);
        if ($del_name)
        {
            if ($del_name['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_name->delete_status = $delete_status;
            $del_name->save();
            return response()->json([
                'status' => 200,
                'message' => 'Radio Femoral Delay deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Radio Femoral Delay Found',
            ]);
        }

    }
}
