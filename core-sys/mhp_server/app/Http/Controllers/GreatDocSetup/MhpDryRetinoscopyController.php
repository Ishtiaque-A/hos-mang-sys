<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDryRetinoscopy;
use Illuminate\Support\Facades\Validator;

class MhpDryRetinoscopyController extends Controller
{
    //
    public function index()
    {
        $DryRetinoscopy = MhpDryRetinoscopy::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'DryRetinoscopy'=>$DryRetinoscopy]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'DryRetinoscopy_name' => 'required|max:100',
       
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
           
            $DryRetinoscopy = new MhpDryRetinoscopy();
            $DryRetinoscopy->DryRetinoscopy_name = $request->DryRetinoscopy_name;

         $DryRetinoscopy->save();

            return response()->json(['status'=>200,'message'=>'Dry Retinoscopy Added Successfully']);
        }
    }


    public function edit($id)
    {
        $DryRetinoscopy=MhpDryRetinoscopy::find($id);
        return response()->json(['status'=>200,'DryRetinoscopy'=>$DryRetinoscopy]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'DryRetinoscopy_name' => 'required|max:100',
         

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
           
            $update_DryRetinoscopy=MhpDryRetinoscopy::find($id);
            $update_DryRetinoscopy->DryRetinoscopy_name=$request->DryRetinoscopy_name;
            $update_DryRetinoscopy->update();

            return response()->json(['status'=>200,'message'=>'Dry Retinoscopy Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_DryRetinoscopy = MhpDryRetinoscopy::find($id);
        if ($del_DryRetinoscopy)
        {
            if ($del_DryRetinoscopy['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_DryRetinoscopy->delete_status = $delete_status;
            $del_DryRetinoscopy->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dry Retinoscopy deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dry Retinoscopy Found',
            ]);
        }

    }
}


