<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GreatDocSetup\MhpGuidelinesOnly;
// use Illuminate\Support\Facades\Validator;
use Validator;

class MhpGuidelinesOnlyController extends Controller
{
    //
    public function index()
    {
        $guidelinesOnly = MhpGuidelinesOnly::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'guidelinesOnly'=>$guidelinesOnly]);
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
           
            $guidelinesOnly = new MhpGuidelinesOnly();
            $guidelinesOnly->name = $request->name;

         $guidelinesOnly->save();

            return response()->json(['status'=>200,'message'=>'Guidelines only Added Successfully']);
        }
    }


    public function edit($id)
    {
        $guidelinesOnly=MhpGuidelinesOnly::find($id);
        return response()->json(['status'=>200,'guidelinesOnly'=>$guidelinesOnly]);
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
           
            $update_guidelinesOnly=MhpGuidelinesOnly::find($id);
            $update_guidelinesOnly->name=$request->name;
            $update_guidelinesOnly->update();

            return response()->json(['status'=>200,'message'=>'Guidelines only Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_guidelinesOnly = MhpGuidelinesOnly::find($id);
        if ($del_guidelinesOnly)
        {
            if ($del_guidelinesOnly['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_guidelinesOnly->delete_status = $delete_status;
            $del_guidelinesOnly->save();
            return response()->json([
                'status' => 200,
                'message' => 'Guidelines only deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Guidelines only Found',
            ]);
        }

    }
}
