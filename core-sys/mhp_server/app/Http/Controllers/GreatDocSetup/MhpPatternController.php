<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpPattern;
use Illuminate\Support\Facades\Validator;

class MhpPatternController extends Controller
{
    //
    public function index()
    {
        $Pattern = MhpPattern::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Pattern'=>$Pattern]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Pattern_name' => 'required|max:100',
       
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
           
            $Pattern = new MhpPattern();
            $Pattern->Pattern_name = $request->Pattern_name;

         $Pattern->save();

            return response()->json(['status'=>200,'message'=>'Pattern Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Pattern=MhpPattern::find($id);
        return response()->json(['status'=>200,'Pattern'=>$Pattern]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Pattern_name' => 'required|max:100',
         

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
           
            $update_Pattern=MhpPattern::find($id);
            $update_Pattern->Pattern_name=$request->Pattern_name;
            $update_Pattern->update();

            return response()->json(['status'=>200,'message'=>'Pattern Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Pattern = MhpPattern::find($id);
        if ($del_Pattern)
        {
            if ($del_Pattern['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Pattern->delete_status = $delete_status;
            $del_Pattern->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pattern deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Pattern Found',
            ]);
        }

    }
}
