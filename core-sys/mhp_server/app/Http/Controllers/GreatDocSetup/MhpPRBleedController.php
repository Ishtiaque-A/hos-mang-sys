<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPRBleed;
use Illuminate\Support\Facades\Validator;

class MhpPRBleedController extends Controller
{
    //
    public function index()
    {
        $PRBleed = MhpPRBleed::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PRBleed'=>$PRBleed]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PRBleed_name' => 'required|max:100',
       
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
           
            $PRBleed = new MhpPRBleed();
            $PRBleed->PRBleed_name = $request->PRBleed_name;

         $PRBleed->save();

            return response()->json(['status'=>200,'message'=>'PR Bleed Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PRBleed=MhpPRBleed::find($id);
        return response()->json(['status'=>200,'PRBleed'=>$PRBleed]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PRBleed_name' => 'required|max:100',
         

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
           
            $update_PRBleed=MhpPRBleed::find($id);
            $update_PRBleed->PRBleed_name=$request->PRBleed_name;
            $update_PRBleed->update();

            return response()->json(['status'=>200,'message'=>'PR Bleed Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PRBleed = MhpPRBleed::find($id);
        if ($del_PRBleed)
        {
            if ($del_PRBleed['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PRBleed->delete_status = $delete_status;
            $del_PRBleed->save();
            return response()->json([
                'status' => 200,
                'message' => 'PR Bleed deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No PR Bleed Found',
            ]);
        }

    }
}


