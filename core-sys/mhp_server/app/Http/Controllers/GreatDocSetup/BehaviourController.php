<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheBehaviour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BehaviourController extends Controller
{
    //

    public function index()
    {
        $behaviour = MheBehaviour::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'behaviour'=>$behaviour]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'behaviour_name' => 'required|max:100',
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
            $behaviour = new MheBehaviour();
            $behaviour->behaviour_name = $request->behaviour_name;
            $behaviour->status_id = $request->status_id;
            $behaviour->selection_criteria = $request->selection_criteria;
            $behaviour->save();

            return response()->json(['status'=>200,'message'=>'Behaviour Added Successfully']);
        }
    }


    public function edit($id)
    {
        $behaviour=MheBehaviour::find($id);
        return response()->json(['status'=>200,'behaviour'=>$behaviour]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'behaviour_name' => 'required|max:100',
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
            $update_behaviour=MheBehaviour::find($id);
            $update_behaviour->behaviour_name=$request->behaviour_name;
            $update_behaviour->status_id=$request->status_id;
            $update_behaviour->selection_criteria=$request->selection_criteria;
            $update_behaviour->update();

            return response()->json(['status'=>200,'message'=>'Behaviour Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_behaviour = MheBehaviour::find($id);
        if ($del_behaviour)
        {
            if ($del_behaviour['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_behaviour->delete_status = $delete_status;
            $del_behaviour->save();
            return response()->json([
                'status' => 200,
                'message' => 'Behaviour deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Behaviour Found',
            ]);
        }


    }

}
