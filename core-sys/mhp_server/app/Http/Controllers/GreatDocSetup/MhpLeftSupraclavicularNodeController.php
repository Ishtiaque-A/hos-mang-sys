<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLeftSupraclavicularNode;
use Illuminate\Support\Facades\Validator;

class MhpLeftSupraclavicularNodeController extends Controller
{
    //
    public function index()
    {
        $leftsupraclavicularnode = MhpLeftSupraclavicularNode::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'leftsupraclavicularnode'=>$leftsupraclavicularnode]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'leftsupraclavicularnode_name' => 'required|max:100',
       
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
           
            $leftsupraclavicularnode = new MhpLeftSupraclavicularNode();
            $leftsupraclavicularnode->leftsupraclavicularnode_name = $request->leftsupraclavicularnode_name;

         $leftsupraclavicularnode->save();

            return response()->json(['status'=>200,'message'=>'Left Supraclavicular Node Added Successfully']);
        }
    }


    public function edit($id)
    {
        $leftsupraclavicularnode=MhpLeftSupraclavicularNode::find($id);
        return response()->json(['status'=>200,'leftsupraclavicularnode'=>$leftsupraclavicularnode]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'leftsupraclavicularnode_name' => 'required|max:100',
         

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
           
            $update_leftsupraclavicularnode=MhpLeftSupraclavicularNode::find($id);
            $update_leftsupraclavicularnode->leftsupraclavicularnode_name=$request->leftsupraclavicularnode_name;
            $update_leftsupraclavicularnode->update();

            return response()->json(['status'=>200,'message'=>'Left Supraclavicular Node Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_leftsupraclavicularnode = MhpLeftSupraclavicularNode::find($id);
        if ($del_leftsupraclavicularnode)
        {
            if ($del_leftsupraclavicularnode['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_leftsupraclavicularnode->delete_status = $delete_status;
            $del_leftsupraclavicularnode->save();
            return response()->json([
                'status' => 200,
                'message' => 'Left Supraclavicular Node deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Left Supraclavicular Node Found',
            ]);
        }

    }
}



