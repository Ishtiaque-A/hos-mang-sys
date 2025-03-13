<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDorsumOfFoot;
use Illuminate\Support\Facades\Validator;

class MhpDorsumOfFootController extends Controller
{
    //
    public function index()
    {
        $dorsumOfFoot = MhpDorsumOfFoot::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'dorsumOfFoot'=>$dorsumOfFoot]);
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
           
            $dorsumOfFoot = new MhpDorsumOfFoot();
            $dorsumOfFoot->name = $request->name;

         $dorsumOfFoot->save();

            return response()->json(['status'=>200,'message'=>'Dorsum Of Foot Added Successfully']);
        }
    }


    public function edit($id)
    {
        $dorsumOfFoot=MhpDorsumOfFoot::find($id);
        return response()->json(['status'=>200,'dorsumOfFoot'=>$dorsumOfFoot]);
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
           
            $update_dorsumOfFoot=MhpDorsumOfFoot::find($id);
            $update_dorsumOfFoot->name=$request->name;
            $update_dorsumOfFoot->update();

            return response()->json(['status'=>200,'message'=>'Dorsum Of Foot Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_dorsumOfFoot = MhpDorsumOfFoot::find($id);
        if ($del_dorsumOfFoot)
        {
            if ($del_dorsumOfFoot['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_dorsumOfFoot->delete_status = $delete_status;
            $del_dorsumOfFoot->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dorsum Of Foot deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dorsum Of Foot Found',
            ]);
        }

    }
}


