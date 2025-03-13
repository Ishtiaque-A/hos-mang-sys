<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpScore;
use Illuminate\Support\Facades\Validator;

class MhpScoreController extends Controller
{
    //
    public function index()
    {
        $Score = MhpScore::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Score'=>$Score]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Score_name' => 'required|max:100',
       
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
           
            $Score = new MhpScore();
            $Score->Score_name = $request->Score_name;

         $Score->save();

            return response()->json(['status'=>200,'message'=>'Score Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Score=MhpScore::find($id);
        return response()->json(['status'=>200,'Score'=>$Score]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Score_name' => 'required|max:100',
         

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
           
            $update_Score=MhpScore::find($id);
            $update_Score->Score_name=$request->Score_name;
            $update_Score->update();

            return response()->json(['status'=>200,'message'=>'Score Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Score = MhpScore::find($id);
        if ($del_Score)
        {
            if ($del_Score['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Score->delete_status = $delete_status;
            $del_Score->save();
            return response()->json([
                'status' => 200,
                'message' => 'Score deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Score Found',
            ]);
        }

    }
}

