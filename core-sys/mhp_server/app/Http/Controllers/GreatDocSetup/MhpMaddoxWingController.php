<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMaddoxWing;
use Illuminate\Support\Facades\Validator;

class MhpMaddoxWingController extends Controller
{
    //
    public function index()
    {
        $MaddoxWing = MhpMaddoxWing::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'MaddoxWing'=>$MaddoxWing]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'MaddoxWing_name' => 'required|max:100',
       
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
           
            $MaddoxWing = new MhpMaddoxWing();
            $MaddoxWing->MaddoxWing_name = $request->MaddoxWing_name;

         $MaddoxWing->save();

            return response()->json(['status'=>200,'message'=>'Maddox Wing Added Successfully']);
        }
    }


    public function edit($id)
    {
        $MaddoxWing=MhpMaddoxWing::find($id);
        return response()->json(['status'=>200,'MaddoxWing'=>$MaddoxWing]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'MaddoxWing_name' => 'required|max:100',
         

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
           
            $update_MaddoxWing=MhpMaddoxWing::find($id);
            $update_MaddoxWing->MaddoxWing_name=$request->MaddoxWing_name;
            $update_MaddoxWing->update();

            return response()->json(['status'=>200,'message'=>'Maddox Wing Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_MaddoxWing = MhpMaddoxWing::find($id);
        if ($del_MaddoxWing)
        {
            if ($del_MaddoxWing['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_MaddoxWing->delete_status = $delete_status;
            $del_MaddoxWing->save();
            return response()->json([
                'status' => 200,
                'message' => 'Maddox Wing deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Maddox Wing Found',
            ]);
        }

    }
}


