<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDiarrhoea;
use Illuminate\Support\Facades\Validator;

class MhpDiarrhoeaController extends Controller
{
    //
    public function index()
    {
        $Diarrhoea = MhpDiarrhoea::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Diarrhoea'=>$Diarrhoea]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Diarrhoea_name' => 'required|max:100',
       
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
           
            $Diarrhoea = new MhpDiarrhoea();
            $Diarrhoea->Diarrhoea_name = $request->Diarrhoea_name;

         $Diarrhoea->save();

            return response()->json(['status'=>200,'message'=>'Diarrhoea Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Diarrhoea=MhpDiarrhoea::find($id);
        return response()->json(['status'=>200,'Diarrhoea'=>$Diarrhoea]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Diarrhoea_name' => 'required|max:100',
         

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
           
            $update_Diarrhoea=MhpDiarrhoea::find($id);
            $update_Diarrhoea->Diarrhoea_name=$request->Diarrhoea_name;
            $update_Diarrhoea->update();

            return response()->json(['status'=>200,'message'=>'Diarrhoea Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Diarrhoea = MhpDiarrhoea::find($id);
        if ($del_Diarrhoea)
        {
            if ($del_Diarrhoea['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Diarrhoea->delete_status = $delete_status;
            $del_Diarrhoea->save();
            return response()->json([
                'status' => 200,
                'message' => 'Diarrhoea deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Diarrhoea Found',
            ]);
        }

    }
}


