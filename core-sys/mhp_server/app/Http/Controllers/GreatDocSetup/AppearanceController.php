<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheAppearance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppearanceController extends Controller
{
    //

    public function index()
    {
        $appearance = MheAppearance::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'appearance'=>$appearance]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'appearance_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $appearance = new MheAppearance();
            $appearance->appearance_name = $request->appearance_name;
            $appearance->status_id = $request->status_id;
            $appearance->selection_criteria = $request->selection_criteria;
            $appearance->save();

            return response()->json(['status'=>200,'message'=>'Appearance Added Successfully']);
        }
    }


    public function edit($id)
    {
        $appearance=MheAppearance::find($id);
        return response()->json(['status'=>200,'appearance'=>$appearance]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'appearance_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
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
            $update_appearance=MheAppearance::find($id);
            $update_appearance->appearance_name=$request->appearance_name;
            $update_appearance->status_id=$request->status_id;
            $update_appearance->selection_criteria=$request->selection_criteria;
            $update_appearance->update();

            return response()->json(['status'=>200,'message'=>'Appearance Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_appearance = MheAppearance::find($id);
        if ($del_appearance)
        {
            if ($del_appearance['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_appearance->delete_status = $delete_status;
            $del_appearance->save();
            return response()->json([
                'status' => 200,
                'message' => 'Appearance deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Appearance Found',
            ]);
        }


    }

}
