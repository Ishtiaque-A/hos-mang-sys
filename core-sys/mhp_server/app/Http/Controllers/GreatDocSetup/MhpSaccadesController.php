<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSaccades;
use Illuminate\Support\Facades\Validator;

class MhpSaccadesController extends Controller
{
    //
    public function index()
    {
        $Saccades = MhpSaccades::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Saccades'=>$Saccades]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Saccades_name' => 'required|max:100',
       
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
           
            $Saccades = new MhpSaccades();
            $Saccades->Saccades_name = $request->Saccades_name;

         $Saccades->save();

            return response()->json(['status'=>200,'message'=>'Saccades Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Saccades=MhpSaccades::find($id);
        return response()->json(['status'=>200,'Saccades'=>$Saccades]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Saccades_name' => 'required|max:100',
         

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
           
            $update_Saccades=MhpSaccades::find($id);
            $update_Saccades->Saccades_name=$request->Saccades_name;
            $update_Saccades->update();

            return response()->json(['status'=>200,'message'=>'Saccades Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Saccades = MhpSaccades::find($id);
        if ($del_Saccades)
        {
            if ($del_Saccades['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Saccades->delete_status = $delete_status;
            $del_Saccades->save();
            return response()->json([
                'status' => 200,
                'message' => 'Saccades deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Saccades Found',
            ]);
        }

    }
}


