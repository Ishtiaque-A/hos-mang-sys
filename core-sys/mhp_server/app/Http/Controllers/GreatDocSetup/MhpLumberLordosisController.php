<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLumberLordosis;
use Illuminate\Support\Facades\Validator;

class MhpLumberLordosisController extends Controller
{
    //
    public function index()
    {
        $LumberLordosis = MhpLumberLordosis::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'LumberLordosis'=>$LumberLordosis]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'LumberLordosis_name' => 'required|max:100',
       
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
           
            $LumberLordosis = new MhpLumberLordosis();
            $LumberLordosis->LumberLordosis_name = $request->LumberLordosis_name;

         $LumberLordosis->save();

            return response()->json(['status'=>200,'message'=>'Lumber Lordosis Added Successfully']);
        }
    }


    public function edit($id)
    {
        $LumberLordosis=MhpLumberLordosis::find($id);
        return response()->json(['status'=>200,'LumberLordosis'=>$LumberLordosis]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'LumberLordosis_name' => 'required|max:100',
         

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
           
            $update_LumberLordosis=MhpLumberLordosis::find($id);
            $update_LumberLordosis->LumberLordosis_name=$request->LumberLordosis_name;
            $update_LumberLordosis->update();

            return response()->json(['status'=>200,'message'=>'Lumber Lordosis Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_LumberLordosis = MhpLumberLordosis::find($id);
        if ($del_LumberLordosis)
        {
            if ($del_LumberLordosis['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_LumberLordosis->delete_status = $delete_status;
            $del_LumberLordosis->save();
            return response()->json([
                'status' => 200,
                'message' => 'Lumber Lordosis deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Lumber Lordosis Found',
            ]);
        }

    }
}

