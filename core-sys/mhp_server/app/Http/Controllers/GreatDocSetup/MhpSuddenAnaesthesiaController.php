<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSuddenAnaesthesia;
use Illuminate\Support\Facades\Validator;

class MhpSuddenAnaesthesiaController extends Controller
{
    //
    public function index()
    {
        $SuddenAnaesthesia = MhpSuddenAnaesthesia::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'SuddenAnaesthesia'=>$SuddenAnaesthesia]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'SuddenAnaesthesia_name' => 'required|max:100',
       
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
           
            $SuddenAnaesthesia = new MhpSuddenAnaesthesia();
            $SuddenAnaesthesia->SuddenAnaesthesia_name = $request->SuddenAnaesthesia_name;

         $SuddenAnaesthesia->save();

            return response()->json(['status'=>200,'message'=>'Sudden Anaesthesia Added Successfully']);
        }
    }


    public function edit($id)
    {
        $SuddenAnaesthesia=MhpSuddenAnaesthesia::find($id);
        return response()->json(['status'=>200,'SuddenAnaesthesia'=>$SuddenAnaesthesia]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'SuddenAnaesthesia_name' => 'required|max:100',
         

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
           
            $update_SuddenAnaesthesia=MhpSuddenAnaesthesia::find($id);
            $update_SuddenAnaesthesia->SuddenAnaesthesia_name=$request->SuddenAnaesthesia_name;
            $update_SuddenAnaesthesia->update();

            return response()->json(['status'=>200,'message'=>'Sudden Anaesthesia Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_SuddenAnaesthesia = MhpSuddenAnaesthesia::find($id);
        if ($del_SuddenAnaesthesia)
        {
            if ($del_SuddenAnaesthesia['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_SuddenAnaesthesia->delete_status = $delete_status;
            $del_SuddenAnaesthesia->save();
            return response()->json([
                'status' => 200,
                'message' => 'Sudden Anaesthesia deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Sudden Anaesthesia Found',
            ]);
        }

    }
}
