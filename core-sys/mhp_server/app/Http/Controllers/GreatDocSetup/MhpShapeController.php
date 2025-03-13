<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpShape;
use Illuminate\Support\Facades\Validator;

class MhpShapeController extends Controller
{
    //
    public function index()
    {
        $Shape = MhpShape::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Shape'=>$Shape]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Shape_name' => 'required|max:100',
       
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
           
            $Shape = new MhpShape();
            $Shape->Shape_name = $request->Shape_name;

         $Shape->save();

            return response()->json(['status'=>200,'message'=>'Shape Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Shape=MhpShape::find($id);
        return response()->json(['status'=>200,'Shape'=>$Shape]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Shape_name' => 'required|max:100',
         

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
           
            $update_Shape=MhpShape::find($id);
            $update_Shape->Shape_name=$request->Shape_name;
            $update_Shape->update();

            return response()->json(['status'=>200,'message'=>'Shape Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Shape = MhpShape::find($id);
        if ($del_Shape)
        {
            if ($del_Shape['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Shape->delete_status = $delete_status;
            $del_Shape->save();
            return response()->json([
                'status' => 200,
                'message' => 'Shape deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Shape Found',
            ]);
        }

    }
}


