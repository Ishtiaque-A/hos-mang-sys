<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpUlser;
use Illuminate\Support\Facades\Validator;

class MhpUlserController extends Controller
{
    //
    public function index()
    {
        $Ulser = MhpUlser::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Ulser'=>$Ulser]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Ulser_name' => 'required|max:100',
       
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
           
            $Ulser = new MhpUlser();
            $Ulser->Ulser_name = $request->Ulser_name;

         $Ulser->save();

            return response()->json(['status'=>200,'message'=>'Ulser Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Ulser=MhpUlser::find($id);
        return response()->json(['status'=>200,'Ulser'=>$Ulser]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Ulser_name' => 'required|max:100',
         

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
           
            $update_Ulser=MhpUlser::find($id);
            $update_Ulser->Ulser_name=$request->Ulser_name;
            $update_Ulser->update();

            return response()->json(['status'=>200,'message'=>'Ulser Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Ulser = MhpUlser::find($id);
        if ($del_Ulser)
        {
            if ($del_Ulser['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Ulser->delete_status = $delete_status;
            $del_Ulser->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ulser deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ulser Found',
            ]);
        }

    }
}


