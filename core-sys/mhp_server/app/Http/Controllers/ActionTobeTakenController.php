<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActionTobeTaken;
use Illuminate\Support\Facades\Validator;

class ActionTobeTakenController extends Controller
{
     public function index()
    {
        $actionTobe = ActionTobeTaken::orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'actionTobe'=>$actionTobe]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'action_to_be_taken' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $actionTobe = new ActionTobeTaken();
            $actionTobe->action_to_be_taken = $request->action_to_be_taken;
            $actionTobe->save();

            return response()->json(['status'=>200,'message'=>'actionTobe Added Successfully']);
        }
    }


    public function edit($id)
    {
        $actionTobe=ActionTobeTaken::find($id);
        return response()->json(['status'=>200,'actionTobe'=>$actionTobe]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'action_to_be_taken' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_actionTobe=ActionTobeTaken::find($id);
            $update_actionTobe->action_to_be_taken=$request->action_to_be_taken;

            $update_actionTobe->update();

            return response()->json(['status'=>200,'message'=>'actionTobe  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_actionTobe = ActionTobeTaken::find($id);

        if ($del_actionTobe)
        {
         
            $del_actionTobe->delete();
            return response()->json([
                'status' => 200,
                'message' => 'actionTobe  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No actionTobe  Found',
            ]);
        }


    }
}
