<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAreolar;
use Illuminate\Support\Facades\Validator;

class MhpAreolarController extends Controller
{
    //
    public function index()
    {
        $Areolar = MhpAreolar::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Areolar'=>$Areolar]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Areolar_name' => 'required|max:100',
       
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
           
            $Areolar = new MhpAreolar();
            $Areolar->Areolar_name = $request->Areolar_name;

         $Areolar->save();

            return response()->json(['status'=>200,'message'=>'Areolar Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Areolar=MhpAreolar::find($id);
        return response()->json(['status'=>200,'Areolar'=>$Areolar]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Areolar_name' => 'required|max:100',
         

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
           
            $update_Areolar=MhpAreolar::find($id);
            $update_Areolar->Areolar_name=$request->Areolar_name;
            $update_Areolar->update();

            return response()->json(['status'=>200,'message'=>'Areolar Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Areolar = MhpAreolar::find($id);
        if ($del_Areolar)
        {
            if ($del_Areolar['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Areolar->delete_status = $delete_status;
            $del_Areolar->save();
            return response()->json([
                'status' => 200,
                'message' => 'Areolar deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Areolar Found',
            ]);
        }

    }
}


