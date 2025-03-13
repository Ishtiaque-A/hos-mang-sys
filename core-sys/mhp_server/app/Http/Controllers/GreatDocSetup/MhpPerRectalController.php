<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPerRectal;
use Illuminate\Support\Facades\Validator;

class MhpPerRectalController extends Controller
{
    //
    public function index()
    {
        $perrectal = MhpPerRectal::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'perrectal'=>$perrectal]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'perrectal_name' => 'required|max:100',
       
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
           
            $perrectal = new MhpPerRectal();
            $perrectal->perrectal_name = $request->perrectal_name;

         $perrectal->save();

            return response()->json(['status'=>200,'message'=>'Per Rectal Added Successfully']);
        }
    }


    public function edit($id)
    {
        $perrectal=MhpPerRectal::find($id);
        return response()->json(['status'=>200,'perrectal'=>$perrectal]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'perrectal_name' => 'required|max:100',
         

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
           
            $update_perrectal=MhpPerRectal::find($id);
            $update_perrectal->perrectal_name=$request->perrectal_name;
            $update_perrectal->update();

            return response()->json(['status'=>200,'message'=>'Per Rectal Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_perrectal = MhpPerRectal::find($id);
        if ($del_perrectal)
        {
            if ($del_perrectal['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_perrectal->delete_status = $delete_status;
            $del_perrectal->save();
            return response()->json([
                'status' => 200,
                'message' => 'Per Rectal deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Per Rectal Found',
            ]);
        }

    }
}

