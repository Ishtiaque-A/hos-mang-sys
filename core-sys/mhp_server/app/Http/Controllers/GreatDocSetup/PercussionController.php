<?php

namespace App\Http\Controllers\GreatDocSetup;
use App\Http\Controllers\Controller;
use App\Models\MrePercussion;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PercussionController extends Controller
{
    //

    public function index()
    {
        $percussion = MrePercussion::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'percussion'=>$percussion]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'percussion_name' => 'required|max:100',
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
            $files->move('images/files/percussion/', $name);
        }
            $percussion = new MrePercussion();
            $percussion->percussion_name = $request->percussion_name;
            $percussion->status_id = $request->status_id;
            $percussion->selection_criteria = $request->selection_criteria;
            if($files!=null){
                
             $percussion->image = $name;
            }

            $percussion->save();

            return response()->json(['status'=>200,'message'=>'Percussion  Added Successfully']);
        }
    
    }


    public function edit($id)
    {
        $percussion=MrePercussion::find($id);
        return response()->json(['status'=>200,'percussion'=>$percussion]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'percussion_name' => 'required|max:100',
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
            $files->move('images/files/percussion/', $name);
        }
            $update_percussion=MrePercussion::find($id);
            $update_percussion->percussion_name=$request->percussion_name;
            $update_percussion->status_id=$request->status_id;
            $update_percussion->selection_criteria=$request->selection_criteria;

            if($files!=null){
            $update_percussion->image=$name;

            }
            $update_percussion->update();

            return response()->json(['status'=>200,'message'=>'Percussion Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_percussion = MrePercussion::find($id);
        if ($del_percussion)
        {
            if ($del_percussion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_percussion->delete_status = $delete_status;
            $del_percussion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Percussion deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No percussion Found',
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
