<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpShapeAndContour;
use Illuminate\Support\Facades\Validator;

class MhpShapeAndContourController extends Controller
{
    //
    public function index()
    {
        $ShapeAndContour = MhpShapeAndContour::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ShapeAndContour'=>$ShapeAndContour]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ShapeAndContour_name' => 'required|max:100',
       
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
           
            $ShapeAndContour = new MhpShapeAndContour();
            $ShapeAndContour->ShapeAndContour_name = $request->ShapeAndContour_name;

         $ShapeAndContour->save();

            return response()->json(['status'=>200,'message'=>'Shape & Contour Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ShapeAndContour=MhpShapeAndContour::find($id);
        return response()->json(['status'=>200,'ShapeAndContour'=>$ShapeAndContour]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'ShapeAndContour_name' => 'required|max:100',
         

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
           
            $update_ShapeAndContour=MhpShapeAndContour::find($id);
            $update_ShapeAndContour->ShapeAndContour_name=$request->ShapeAndContour_name;
            $update_ShapeAndContour->update();

            return response()->json(['status'=>200,'message'=>'Shape & Contour Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ShapeAndContour = MhpShapeAndContour::find($id);
        if ($del_ShapeAndContour)
        {
            if ($del_ShapeAndContour['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ShapeAndContour->delete_status = $delete_status;
            $del_ShapeAndContour->save();
            return response()->json([
                'status' => 200,
                'message' => 'Shape & Contour deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Shape & Contour Found',
            ]);
        }

    }
}

