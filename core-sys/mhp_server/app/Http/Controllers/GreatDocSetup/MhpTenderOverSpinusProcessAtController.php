<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTenderOverSpinusProcessAt;
use Illuminate\Support\Facades\Validator;

class MhpTenderOverSpinusProcessAtController extends Controller
{
    //
    public function index()
    {
        $TenderOverSpinusProcessAt = MhpTenderOverSpinusProcessAt::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'TenderOverSpinusProcessAt'=>$TenderOverSpinusProcessAt]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'TenderOverSpinusProcessAt_name' => 'required|max:100',
       
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
           
            $TenderOverSpinusProcessAt = new MhpTenderOverSpinusProcessAt();
            $TenderOverSpinusProcessAt->TenderOverSpinusProcessAt_name = $request->TenderOverSpinusProcessAt_name;

         $TenderOverSpinusProcessAt->save();

            return response()->json(['status'=>200,'message'=>'Tender Over Spinus Process At Added Successfully']);
        }
    }


    public function edit($id)
    {
        $TenderOverSpinusProcessAt=MhpTenderOverSpinusProcessAt::find($id);
        return response()->json(['status'=>200,'TenderOverSpinusProcessAt'=>$TenderOverSpinusProcessAt]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'TenderOverSpinusProcessAt_name' => 'required|max:100',
         

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
           
            $update_TenderOverSpinusProcessAt=MhpTenderOverSpinusProcessAt::find($id);
            $update_TenderOverSpinusProcessAt->TenderOverSpinusProcessAt_name=$request->TenderOverSpinusProcessAt_name;
            $update_TenderOverSpinusProcessAt->update();

            return response()->json(['status'=>200,'message'=>'Tender Over Spinus Process At Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_TenderOverSpinusProcessAt = MhpTenderOverSpinusProcessAt::find($id);
        if ($del_TenderOverSpinusProcessAt)
        {
            if ($del_TenderOverSpinusProcessAt['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_TenderOverSpinusProcessAt->delete_status = $delete_status;
            $del_TenderOverSpinusProcessAt->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tender Over Spinus Process At deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tender Over Spinus Process At Found',
            ]);
        }

    }
}


