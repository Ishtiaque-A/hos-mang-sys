<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAbdomen;
use Illuminate\Support\Facades\Validator;

class MhpAbdomenController extends Controller
{
    //
    public function index()
    {
        $abdomen = MhpAbdomen::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'abdomen'=>$abdomen]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'abdomen_name' => 'required|max:100',
       
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
           
            $abdomen = new MhpAbdomen();
            $abdomen->abdomen_name = $request->abdomen_name;

         $abdomen->save();

            return response()->json(['status'=>200,'message'=>'Abdomen Added Successfully']);
        }
    }


    public function edit($id)
    {
        $abdomen=MhpAbdomen::find($id);
        return response()->json(['status'=>200,'abdomen'=>$abdomen]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'abdomen_name' => 'required|max:100',
         

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
           
            $update_abdomen=MhpAbdomen::find($id);
            $update_abdomen->abdomen_name=$request->abdomen_name;
            $update_abdomen->update();

            return response()->json(['status'=>200,'message'=>'Abdomen Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_abdomen = MhpAbdomen::find($id);
        if ($del_abdomen)
        {
            if ($del_abdomen['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_abdomen->delete_status = $delete_status;
            $del_abdomen->save();
            return response()->json([
                'status' => 200,
                'message' => 'Abdomen deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Abdomen Found',
            ]);
        }

    }
}


