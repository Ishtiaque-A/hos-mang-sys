<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpToesRight;
use Illuminate\Support\Facades\Validator;

class MhpToesRightController extends Controller
{
    //
    public function index()
    {
        $toesRight = MhpToesRight::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'toesRight'=>$toesRight]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
       
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
           
            $toesRight = new MhpToesRight();
            $toesRight->name = $request->name;

         $toesRight->save();

            return response()->json(['status'=>200,'message'=>'Toes Right Added Successfully']);
        }
    }


    public function edit($id)
    {
        $toesRight=MhpToesRight::find($id);
        return response()->json(['status'=>200,'toesRight'=>$toesRight]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
         
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
           
            $update_toesRight=MhpToesRight::find($id);
            $update_toesRight->name=$request->name;
            $update_toesRight->update();

            return response()->json(['status'=>200,'message'=>'Toes Right Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_toesRight = MhpToesRight::find($id);
        if ($del_toesRight)
        {
            if ($del_toesRight['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_toesRight->delete_status = $delete_status;
            $del_toesRight->save();
            return response()->json([
                'status' => 200,
                'message' => 'Toes Right deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Toes Right Found',
            ]);
        }

    }
}



