<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTemparature;
use Illuminate\Support\Facades\Validator;

class MhpTemparatureController extends Controller
{
    //
    public function index()
    {
        $Temparature = MhpTemparature::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Temparature'=>$Temparature]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Temparature_name' => 'required|max:100',
       
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
           
            $Temparature = new MhpTemparature();
            $Temparature->Temparature_name = $request->Temparature_name;

         $Temparature->save();

            return response()->json(['status'=>200,'message'=>'Temparature Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Temparature=MhpTemparature::find($id);
        return response()->json(['status'=>200,'Temparature'=>$Temparature]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Temparature_name' => 'required|max:100',
         

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
           
            $update_Temparature=MhpTemparature::find($id);
            $update_Temparature->Temparature_name=$request->Temparature_name;
            $update_Temparature->update();

            return response()->json(['status'=>200,'message'=>'Temparature Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Temparature = MhpTemparature::find($id);
        if ($del_Temparature)
        {
            if ($del_Temparature['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Temparature->delete_status = $delete_status;
            $del_Temparature->save();
            return response()->json([
                'status' => 200,
                'message' => 'Temparature deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Temparature Found',
            ]);
        }

    }
}


