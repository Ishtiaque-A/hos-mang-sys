<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpColorVision;
use Illuminate\Support\Facades\Validator;

class MhpColorVisionController extends Controller
{
    //
    public function index()
    {
        $ColorVision = MhpColorVision::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ColorVision'=>$ColorVision]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ColorVision_name' => 'required|max:100',
       
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
           
            $ColorVision = new MhpColorVision();
            $ColorVision->ColorVision_name = $request->ColorVision_name;

         $ColorVision->save();

            return response()->json(['status'=>200,'message'=>'Color Vision Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ColorVision=MhpColorVision::find($id);
        return response()->json(['status'=>200,'ColorVision'=>$ColorVision]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'ColorVision_name' => 'required|max:100',
         

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
           
            $update_ColorVision=MhpColorVision::find($id);
            $update_ColorVision->ColorVision_name=$request->ColorVision_name;
            $update_ColorVision->update();

            return response()->json(['status'=>200,'message'=>'Color Vision Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ColorVision = MhpColorVision::find($id);
        if ($del_ColorVision)
        {
            if ($del_ColorVision['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ColorVision->delete_status = $delete_status;
            $del_ColorVision->save();
            return response()->json([
                'status' => 200,
                'message' => 'Color Vision deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Color Vision Found',
            ]);
        }

    }
}



