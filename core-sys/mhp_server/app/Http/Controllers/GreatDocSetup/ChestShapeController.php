<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MreChestShape;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChestShapeController extends Controller
{
     //

    public function index()
    {
        $chestshape = MreChestShape::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'chestshape'=>$chestshape]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'chestshape_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
            'image'=>'required',
        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } 
        else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/chestshape/', $name);
        } 
            $chestshape = new MreChestShape();
            $chestshape->chestshape_name = $request->chestshape_name;
            $chestshape->status_id = $request->status_id;
            $chestshape->image = $name;
            $chestshape->selection_criteria = $request->selection_criteria;
         $chestshape->save();

            return response()->json(['status'=>200,'message'=>'Chest Shape  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $chestshape=MreChestShape::find($id);
        return response()->json(['status'=>200,'chestshape'=>$chestshape]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'chestshape_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
             'image'=>'required',

        ],
            ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
         else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/chestshape/', $name);
        } 
            $update_chestshape=MreChestShape::find($id);
            $update_chestshape->chestshape_name=$request->chestshape_name;
            $update_chestshape->status_id=$request->status_id;
            $update_chestshape->selection_criteria=$request->selection_criteria;
             if ($files != null) {
            $update_chestshape->image = $name;  
         }
          
            $update_chestshape->update();


            return response()->json(['status'=>200,'message'=>'Chest Shape  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_chestshape = MreChestShape::find($id);
        if ($del_chestshape)
        {
            if ($del_chestshape['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_chestshape->delete_status = $delete_status;
            $del_chestshape->save();
            return response()->json([
                'status' => 200,
                'message' => 'Chest Shape deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No chestshape Found',
            ]);
        }


    }
    public function examination_dropdown(){
        $status_list = MhpHistoryExaminationStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status'=>200,
            'status_list'=>$status_list
        ]);
    }
}
