<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBruit;
use Illuminate\Support\Facades\Validator;

class MhpBruitController extends Controller
{
    //
    public function index()
    {
        $bruit = MhpBruit::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'bruit'=>$bruit]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'bruit_name' => 'required|max:100',
       
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
           
            $bruit = new MhpBruit();
            $bruit->bruit_name = $request->bruit_name;

         $bruit->save();

            return response()->json(['status'=>200,'message'=>'Bruit Added Successfully']);
        }
    }


    public function edit($id)
    {
        $bruit=MhpBruit::find($id);
        return response()->json(['status'=>200,'bruit'=>$bruit]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'bruit_name' => 'required|max:100',
         

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
           
            $update_bruit=MhpBruit::find($id);
            $update_bruit->bruit_name=$request->bruit_name;
            $update_bruit->update();

            return response()->json(['status'=>200,'message'=>'Bruit Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_bruit = MhpBruit::find($id);
        if ($del_bruit)
        {
            if ($del_bruit['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_bruit->delete_status = $delete_status;
            $del_bruit->save();
            return response()->json([
                'status' => 200,
                'message' => 'Bruit deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Bruit Found',
            ]);
        }

    }
}



