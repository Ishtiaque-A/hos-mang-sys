<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsTheRadialNerve;
use Illuminate\Support\Facades\Validator;

class CnsTheRadialNerveController extends Controller
{
    //
    public function index()
    {
        $TheRadialNerve = CnsTheRadialNerve::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'TheRadialNerve'=>$TheRadialNerve]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'TheRadialNerve_name' => 'required|max:100',
       
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
           
            $TheRadialNerve = new CnsTheRadialNerve();
            $TheRadialNerve->TheRadialNerve_name = $request->TheRadialNerve_name;

         $TheRadialNerve->save();

            return response()->json(['status'=>200,'message'=>'The Radial Nerve Added Successfully']);
        }
    }


    public function edit($id)
    {
        $TheRadialNerve=CnsTheRadialNerve::find($id);
        return response()->json(['status'=>200,'TheRadialNerve'=>$TheRadialNerve]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'TheRadialNerve_name' => 'required|max:100',
         

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
           
            $update_TheRadialNerve=CnsTheRadialNerve::find($id);
            $update_TheRadialNerve->TheRadialNerve_name=$request->TheRadialNerve_name;
            $update_TheRadialNerve->update();

            return response()->json(['status'=>200,'message'=>'The Radial Nerve Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_TheRadialNerve = CnsTheRadialNerve::find($id);
        if ($del_TheRadialNerve)
        {
            if ($del_TheRadialNerve['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_TheRadialNerve->delete_status = $delete_status;
            $del_TheRadialNerve->save();
            return response()->json([
                'status' => 200,
                'message' => 'The Radial Nerve deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No The Radial Nerve Found',
            ]);
        }

    }
}


