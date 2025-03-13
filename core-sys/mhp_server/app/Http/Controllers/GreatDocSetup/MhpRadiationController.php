<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRadiation;
use Illuminate\Support\Facades\Validator;

class MhpRadiationController extends Controller
{
    //
    public function index()
    {
        $Radiation = MhpRadiation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Radiation'=>$Radiation]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Radiation_name' => 'required|max:100',
       
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
           
            $Radiation = new MhpRadiation();
            $Radiation->Radiation_name = $request->Radiation_name;

         $Radiation->save();

            return response()->json(['status'=>200,'message'=>'Radiation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Radiation=MhpRadiation::find($id);
        return response()->json(['status'=>200,'Radiation'=>$Radiation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Radiation_name' => 'required|max:100',
         

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
           
            $update_Radiation=MhpRadiation::find($id);
            $update_Radiation->Radiation_name=$request->Radiation_name;
            $update_Radiation->update();

            return response()->json(['status'=>200,'message'=>'Radiation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Radiation = MhpRadiation::find($id);
        if ($del_Radiation)
        {
            if ($del_Radiation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Radiation->delete_status = $delete_status;
            $del_Radiation->save();
            return response()->json([
                'status' => 200,
                'message' => 'Radiation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Radiation Found',
            ]);
        }

    }
}
