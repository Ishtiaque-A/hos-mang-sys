<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpEpigastric;
use Illuminate\Support\Facades\Validator;

class MhpEpigastricController extends Controller
{
    //
    public function index()
    {
        $Epigastric = MhpEpigastric::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Epigastric'=>$Epigastric]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Epigastric_name' => 'required|max:100',
       
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
           
            $Epigastric = new MhpEpigastric();
            $Epigastric->Epigastric_name = $request->Epigastric_name;

         $Epigastric->save();

            return response()->json(['status'=>200,'message'=>'Epigastric Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Epigastric=MhpEpigastric::find($id);
        return response()->json(['status'=>200,'Epigastric'=>$Epigastric]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Epigastric_name' => 'required|max:100',
         

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
           
            $update_Epigastric=MhpEpigastric::find($id);
            $update_Epigastric->Epigastric_name=$request->Epigastric_name;
            $update_Epigastric->update();

            return response()->json(['status'=>200,'message'=>'Epigastric Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Epigastric = MhpEpigastric::find($id);
        if ($del_Epigastric)
        {
            if ($del_Epigastric['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Epigastric->delete_status = $delete_status;
            $del_Epigastric->save();
            return response()->json([
                'status' => 200,
                'message' => 'Epigastric deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Epigastric Found',
            ]);
        }

    }
}

