<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpThoracicKyphosis;
use Illuminate\Support\Facades\Validator;

class MhpThoracicKyphosisController extends Controller
{
    //
    public function index()
    {
        $ThoracicKyphosis = MhpThoracicKyphosis::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ThoracicKyphosis'=>$ThoracicKyphosis]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ThoracicKyphosis_name' => 'required|max:100',
       
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
           
            $ThoracicKyphosis = new MhpThoracicKyphosis();
            $ThoracicKyphosis->ThoracicKyphosis_name = $request->ThoracicKyphosis_name;

         $ThoracicKyphosis->save();

            return response()->json(['status'=>200,'message'=>'Thoracic Kyphosis Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ThoracicKyphosis=MhpThoracicKyphosis::find($id);
        return response()->json(['status'=>200,'ThoracicKyphosis'=>$ThoracicKyphosis]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'ThoracicKyphosis_name' => 'required|max:100',
         

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
           
            $update_ThoracicKyphosis=MhpThoracicKyphosis::find($id);
            $update_ThoracicKyphosis->ThoracicKyphosis_name=$request->ThoracicKyphosis_name;
            $update_ThoracicKyphosis->update();

            return response()->json(['status'=>200,'message'=>'Thoracic Kyphosis Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ThoracicKyphosis = MhpThoracicKyphosis::find($id);
        if ($del_ThoracicKyphosis)
        {
            if ($del_ThoracicKyphosis['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ThoracicKyphosis->delete_status = $delete_status;
            $del_ThoracicKyphosis->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thoracic Kyphosis deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Thoracic Kyphosis Found',
            ]);
        }

    }
}

