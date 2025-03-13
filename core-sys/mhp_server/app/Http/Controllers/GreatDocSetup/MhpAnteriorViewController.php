<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAnteriorView;
use Illuminate\Support\Facades\Validator;

class MhpAnteriorViewController extends Controller
{
    //
    public function index()
    {
        $AnteriorView = MhpAnteriorView::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'AnteriorView'=>$AnteriorView]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'AnteriorView_name' => 'required|max:100',
       
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
           
            $AnteriorView = new MhpAnteriorView();
            $AnteriorView->AnteriorView_name = $request->AnteriorView_name;

         $AnteriorView->save();

            return response()->json(['status'=>200,'message'=>'Anterior View Added Successfully']);
        }
    }


    public function edit($id)
    {
        $AnteriorView=MhpAnteriorView::find($id);
        return response()->json(['status'=>200,'AnteriorView'=>$AnteriorView]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'AnteriorView_name' => 'required|max:100',
         

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
           
            $update_AnteriorView=MhpAnteriorView::find($id);
            $update_AnteriorView->AnteriorView_name=$request->AnteriorView_name;
            $update_AnteriorView->update();

            return response()->json(['status'=>200,'message'=>'Anterior View Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_AnteriorView = MhpAnteriorView::find($id);
        if ($del_AnteriorView)
        {
            if ($del_AnteriorView['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_AnteriorView->delete_status = $delete_status;
            $del_AnteriorView->save();
            return response()->json([
                'status' => 200,
                'message' => 'Anterior View deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Anterior View Found',
            ]);
        }

    }
}

