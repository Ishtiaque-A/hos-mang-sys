<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHaloes;
use Illuminate\Support\Facades\Validator;

class MhpHaloesController extends Controller
{
    //
    public function index()
    {
        $Haloes = MhpHaloes::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Haloes'=>$Haloes]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Haloes_name' => 'required|max:100',
       
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
           
            $Haloes = new MhpHaloes();
            $Haloes->Haloes_name = $request->Haloes_name;

         $Haloes->save();

            return response()->json(['status'=>200,'message'=>'Haloes Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Haloes=MhpHaloes::find($id);
        return response()->json(['status'=>200,'Haloes'=>$Haloes]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Haloes_name' => 'required|max:100',
         

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
           
            $update_Haloes=MhpHaloes::find($id);
            $update_Haloes->Haloes_name=$request->Haloes_name;
            $update_Haloes->update();

            return response()->json(['status'=>200,'message'=>'Haloes Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Haloes = MhpHaloes::find($id);
        if ($del_Haloes)
        {
            if ($del_Haloes['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Haloes->delete_status = $delete_status;
            $del_Haloes->save();
            return response()->json([
                'status' => 200,
                'message' => 'Haloes deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Haloes Found',
            ]);
        }

    }
}

