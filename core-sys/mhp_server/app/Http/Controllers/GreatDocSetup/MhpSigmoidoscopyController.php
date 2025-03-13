<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSigmoidoscopy;
use Illuminate\Support\Facades\Validator;

class MhpSigmoidoscopyController extends Controller
{
    //
    public function index()
    {
        $sigmoidoscopy = MhpSigmoidoscopy::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'sigmoidoscopy'=>$sigmoidoscopy]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'sigmoidoscopy_name' => 'required|max:100',
       
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
           
            $sigmoidoscopy = new MhpSigmoidoscopy();
            $sigmoidoscopy->sigmoidoscopy_name = $request->sigmoidoscopy_name;

         $sigmoidoscopy->save();

            return response()->json(['status'=>200,'message'=>'Sigmoidoscopy Added Successfully']);
        }
    }


    public function edit($id)
    {
        $sigmoidoscopy=MhpSigmoidoscopy::find($id);
        return response()->json(['status'=>200,'sigmoidoscopy'=>$sigmoidoscopy]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'sigmoidoscopy_name' => 'required|max:100',
         

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
           
            $update_sigmoidoscopy=MhpSigmoidoscopy::find($id);
            $update_sigmoidoscopy->sigmoidoscopy_name=$request->sigmoidoscopy_name;
            $update_sigmoidoscopy->update();

            return response()->json(['status'=>200,'message'=>'Sigmoidoscopy Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_sigmoidoscopy = MhpSigmoidoscopy::find($id);
        if ($del_sigmoidoscopy)
        {
            if ($del_sigmoidoscopy['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_sigmoidoscopy->delete_status = $delete_status;
            $del_sigmoidoscopy->save();
            return response()->json([
                'status' => 200,
                'message' => 'Sigmoidoscopy deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Sigmoidoscopy Found',
            ]);
        }

    }
}
