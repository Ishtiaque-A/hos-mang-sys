<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreChestExpansion;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class ChestExpansionController extends Controller
{
       

    public function index()
    {
        $chestexpansion = MreChestExpansion::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'chestexpansion'=>$chestexpansion]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'chestexpansion_name' => 'required|max:100',
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

        }else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/chestexpansion/', $name);
        } 
            $chestexpansion = new MreChestExpansion();
            $chestexpansion->chestexpansion_name = $request->chestexpansion_name;
            $chestexpansion->status_id = $request->status_id;
            $chestexpansion->selection_criteria = $request->selection_criteria;
            if($files!=null){
                 $chestexpansion->image= $name;
            }

            $chestexpansion->save();

            return response()->json(['status'=>200,'message'=>'Chest Expansion  Added Successfully']);
        }
             
      
        
    }


    public function edit($id)
    {
        $chestexpansion=MreChestExpansion::find($id);
        return response()->json(['status'=>200,'chestexpansion'=>$chestexpansion]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'chestexpansion_name' => 'required|max:100',
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

        }else{
               if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/chestexpansion/', $name);
        } 
            $update_chestexpansion=MreChestExpansion::find($id);
            $update_chestexpansion->chestexpansion_name=$request->chestexpansion_name;
            $update_chestexpansion->status_id=$request->status_id;
            $update_chestexpansion->selection_criteria=$request->selection_criteria;
            if ($files != null) {
         $update_chestexpansion->image = $name;   
               }
            $update_chestexpansion->update();

        

            return response()->json(['status'=>200,'message'=>'Chest Expansion Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_chestexpansion = MreChestExpansion::find($id);
        if ($del_chestexpansion)
        {
            if ($del_chestexpansion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_chestexpansion->delete_status = $delete_status;
            $del_chestexpansion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Chest Expansion deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No chestexpansion Found',
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
