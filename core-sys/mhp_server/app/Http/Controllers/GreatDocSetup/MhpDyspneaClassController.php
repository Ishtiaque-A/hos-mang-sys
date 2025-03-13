<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDyspneaClass;
use Illuminate\Support\Facades\Validator;

class MhpDyspneaClassController extends Controller
{
    //
    public function index()
    {
        $dyspneaClass = MhpDyspneaClass::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'dyspneaClass'=>$dyspneaClass]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'dyspneaClass_name' => 'required|max:100',
       
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
           
            $dyspneaClass = new MhpDyspneaClass();
            $dyspneaClass->dyspneaClass_name = $request->dyspneaClass_name;

         $dyspneaClass->save();

            return response()->json(['status'=>200,'message'=>'Dyspnea Class Added Successfully']);
        }
    }


    public function edit($id)
    {
        $dyspneaClass=MhpDyspneaClass::find($id);
        return response()->json(['status'=>200,'dyspneaClass'=>$dyspneaClass]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'dyspneaClass_name' => 'required|max:100',
         

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
           
            $update_dyspneaClass=MhpDyspneaClass::find($id);
            $update_dyspneaClass->dyspneaClass_name=$request->dyspneaClass_name;
            $update_dyspneaClass->update();

            return response()->json(['status'=>200,'message'=>'Dyspnea Class Updated Successfully']);
        }
    }

    public function destroy($id)
    {
      
        $del_dyspneaClass = MhpDyspneaClass::find($id);
        if ($del_dyspneaClass)
        {
            if ($del_dyspneaClass['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_dyspneaClass->delete_status = $delete_status;
            $del_dyspneaClass->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dyspnea Class deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dyspnea Class Found',
            ]);
        }

    }
}

