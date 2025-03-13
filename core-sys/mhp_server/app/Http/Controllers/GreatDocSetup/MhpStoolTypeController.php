<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpStoolType;
use Illuminate\Support\Facades\Validator;

class MhpStoolTypeController extends Controller
{
    //
    public function index()
    {
        $StoolType = MhpStoolType::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'StoolType'=>$StoolType]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'StoolType_name' => 'required|max:100',
       
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
           
            $StoolType = new MhpStoolType();
            $StoolType->StoolType_name = $request->StoolType_name;

         $StoolType->save();

            return response()->json(['status'=>200,'message'=>'StoolType Added Successfully']);
        }
    }


    public function edit($id)
    {
        $StoolType=MhpStoolType::find($id);
        return response()->json(['status'=>200,'StoolType'=>$StoolType]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'StoolType_name' => 'required|max:100',
         

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
           
            $update_StoolType=MhpStoolType::find($id);
            $update_StoolType->StoolType_name=$request->StoolType_name;
            $update_StoolType->update();

            return response()->json(['status'=>200,'message'=>'StoolType Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_StoolType = MhpStoolType::find($id);
        if ($del_StoolType)
        {
            if ($del_StoolType['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_StoolType->delete_status = $delete_status;
            $del_StoolType->save();
            return response()->json([
                'status' => 200,
                'message' => 'StoolType deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No StoolType Found',
            ]);
        }

    }
}


