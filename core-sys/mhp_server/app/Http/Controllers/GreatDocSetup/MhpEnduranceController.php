<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEndurance;
use Illuminate\Support\Facades\Validator;

class MhpEnduranceController extends Controller
{
    //
    public function index()
    {
        $endurance = MhpEndurance::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'endurance'=>$endurance]);
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
           
            $endurance = new MhpEndurance();
            $endurance->name = $request->name;

         $endurance->save();

            return response()->json(['status'=>200,'message'=>'Endurance Added Successfully']);
        }
    }


    public function edit($id)
    {
        $endurance=MhpEndurance::find($id);
        return response()->json(['status'=>200,'endurance'=>$endurance]);
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
           
            $update_endurance=MhpEndurance::find($id);
            $update_endurance->name=$request->name;
            $update_endurance->update();

            return response()->json(['status'=>200,'message'=>'Endurance Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_endurance = MhpEndurance::find($id);
        if ($del_endurance)
        {
            if ($del_endurance['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_endurance->delete_status = $delete_status;
            $del_endurance->save();
            return response()->json([
                'status' => 200,
                'message' => 'Endurance deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Endurance Found',
            ]);
        }

    }
}


