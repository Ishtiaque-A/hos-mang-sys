<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCaruncle;
use Illuminate\Support\Facades\Validator;

class MhpCaruncleController extends Controller
{
    //
    public function index()
    {
        $Caruncle = MhpCaruncle::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Caruncle'=>$Caruncle]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Caruncle_name' => 'required|max:100',
       
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
           
            $Caruncle = new MhpCaruncle();
            $Caruncle->Caruncle_name = $request->Caruncle_name;

         $Caruncle->save();

            return response()->json(['status'=>200,'message'=>'Caruncle Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Caruncle=MhpCaruncle::find($id);
        return response()->json(['status'=>200,'Caruncle'=>$Caruncle]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Caruncle_name' => 'required|max:100',
         

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
           
            $update_Caruncle=MhpCaruncle::find($id);
            $update_Caruncle->Caruncle_name=$request->Caruncle_name;
            $update_Caruncle->update();

            return response()->json(['status'=>200,'message'=>'Caruncle Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Caruncle = MhpCaruncle::find($id);
        if ($del_Caruncle)
        {
            if ($del_Caruncle['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Caruncle->delete_status = $delete_status;
            $del_Caruncle->save();
            return response()->json([
                'status' => 200,
                'message' => 'Caruncle deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Caruncle Found',
            ]);
        }

    }
}


