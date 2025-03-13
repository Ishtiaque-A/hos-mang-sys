<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDysphagia;
use Illuminate\Support\Facades\Validator;
class MhpDysphagiaController extends Controller
{
    //
    public function index()
    {
        $Dysphagia = MhpDysphagia::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Dysphagia'=>$Dysphagia]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Dysphagia_name' => 'required|max:100',
       
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
           
            $Dysphagia = new MhpDysphagia();
            $Dysphagia->Dysphagia_name = $request->Dysphagia_name;

         $Dysphagia->save();

            return response()->json(['status'=>200,'message'=>'Dysphagia Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Dysphagia=MhpDysphagia::find($id);
        return response()->json(['status'=>200,'Dysphagia'=>$Dysphagia]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Dysphagia_name' => 'required|max:100',
         

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
           
            $update_Dysphagia=MhpDysphagia::find($id);
            $update_Dysphagia->Dysphagia_name=$request->Dysphagia_name;
            $update_Dysphagia->update();

            return response()->json(['status'=>200,'message'=>'Dysphagia Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Dysphagia = MhpDysphagia::find($id);
        if ($del_Dysphagia)
        {
            if ($del_Dysphagia['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Dysphagia->delete_status = $delete_status;
            $del_Dysphagia->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dysphagia deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dysphagia Found',
            ]);
        }

    }
}

