<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAllBodyPartFrontBack;
use Illuminate\Support\Facades\Validator;

class MhpAllBodyPartFrontBackController extends Controller
{
    //
    public function index()
    {
        $AllBodyPartFrontBack = MhpAllBodyPartFrontBack::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'AllBodyPartFrontBack'=>$AllBodyPartFrontBack]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'AllBodyPartFrontBack_name' => 'required|max:100',
       
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
           
            $AllBodyPartFrontBack = new MhpAllBodyPartFrontBack();
            $AllBodyPartFrontBack->AllBodyPartFrontBack_name = $request->AllBodyPartFrontBack_name;

         $AllBodyPartFrontBack->save();

            return response()->json(['status'=>200,'message'=>'All Body Part Front Back Added Successfully']);
        }
    }


    public function edit($id)
    {
        $AllBodyPartFrontBack=MhpAllBodyPartFrontBack::find($id);
        return response()->json(['status'=>200,'AllBodyPartFrontBack'=>$AllBodyPartFrontBack]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'AllBodyPartFrontBack_name' => 'required|max:100',
         

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
           
            $update_AllBodyPartFrontBack=MhpAllBodyPartFrontBack::find($id);
            $update_AllBodyPartFrontBack->AllBodyPartFrontBack_name=$request->AllBodyPartFrontBack_name;
            $update_AllBodyPartFrontBack->update();

            return response()->json(['status'=>200,'message'=>'All Body Part Front Back Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_AllBodyPartFrontBack = MhpAllBodyPartFrontBack::find($id);
        if ($del_AllBodyPartFrontBack)
        {
            if ($del_AllBodyPartFrontBack['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_AllBodyPartFrontBack->delete_status = $delete_status;
            $del_AllBodyPartFrontBack->save();
            return response()->json([
                'status' => 200,
                'message' => 'All Body Part Front Back deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No All Body Part Front Back Found',
            ]);
        }

    }
}


