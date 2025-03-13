<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNailSign;
use Illuminate\Support\Facades\Validator;

class MhpNailSignController extends Controller
{
    //
    public function index()
    {
        $nailSign = MhpNailSign::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'nailSign'=>$nailSign]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'nailSign_name' => 'required|max:100',
       
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
           
            $nailSign = new MhpNailSign();
            $nailSign->nailSign_name = $request->nailSign_name;

         $nailSign->save();

            return response()->json(['status'=>200,'message'=>'Nail Sign Added Successfully']);
        }
    }


    public function edit($id)
    {
        $nailSign=MhpNailSign::find($id);
        return response()->json(['status'=>200,'nailSign'=>$nailSign]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'nailSign_name' => 'required|max:100',
         

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
           
            $update_nailSign=MhpNailSign::find($id);
            $update_nailSign->nailSign_name=$request->nailSign_name;
            $update_nailSign->update();

            return response()->json(['status'=>200,'message'=>'Nail Sign Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_nailSign = MhpNailSign::find($id);
        if ($del_nailSign)
        {
            if ($del_nailSign['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_nailSign->delete_status = $delete_status;
            $del_nailSign->save();
            return response()->json([
                'status' => 200,
                'message' => 'Nail Sign deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Nail Sign Found',
            ]);
        }

    }
}

