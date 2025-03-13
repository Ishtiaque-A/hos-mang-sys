<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsPower;
use Illuminate\Support\Facades\Validator;

class CnsPowerController extends Controller
{
    //
    public function index()
    {
        $Power = CnsPower::where('delete_status',0)->orderBy('id','asc')->get();


        return response()->json(
            ['status'=>200,'Power'=>$Power]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Power_name' => 'required|max:100',
       
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
           
            $Power = new CnsPower();
            $Power->Power_name = $request->Power_name;

         $Power->save();

            return response()->json(['status'=>200,'message'=>'Power Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Power=CnsPower::find($id);
        return response()->json(['status'=>200,'Power'=>$Power]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Power_name' => 'required|max:100',
         

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
           
            $update_Power=CnsPower::find($id);
            $update_Power->Power_name=$request->Power_name;
            $update_Power->update();

            return response()->json(['status'=>200,'message'=>'Power Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Power = CnsPower::find($id);
        if ($del_Power)
        {
            if ($del_Power['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Power->delete_status = $delete_status;
            $del_Power->save();
            return response()->json([
                'status' => 200,
                'message' => 'Power deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Power Found',
            ]);
        }

    }
}

