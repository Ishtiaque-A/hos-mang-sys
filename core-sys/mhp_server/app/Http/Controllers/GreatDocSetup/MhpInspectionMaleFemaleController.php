<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpInspectionMaleFemale;
use Illuminate\Support\Facades\Validator;

class MhpInspectionMaleFemaleController extends Controller
{
    //
    public function index()
    {
        $inspectionMaleFemale = MhpInspectionMaleFemale::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'inspectionMaleFemale'=>$inspectionMaleFemale]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
       
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
           
            $inspectionMaleFemale = new MhpInspectionMaleFemale();
            $inspectionMaleFemale->name = $request->name;

         $inspectionMaleFemale->save();

            return response()->json(['status'=>200,'message'=>'Inspection Male Female Added Successfully']);
        }
    }


    public function edit($id)
    {
        $inspectionMaleFemale=MhpInspectionMaleFemale::find($id);
        return response()->json(['status'=>200,'inspectionMaleFemale'=>$inspectionMaleFemale]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
         
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
           
            $update_inspectionMaleFemale=MhpInspectionMaleFemale::find($id);
            $update_inspectionMaleFemale->name=$request->name;
            $update_inspectionMaleFemale->update();

            return response()->json(['status'=>200,'message'=>'Inspection Male Female Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_inspectionMaleFemale = MhpInspectionMaleFemale::find($id);
        if ($del_inspectionMaleFemale)
        {
            if ($del_inspectionMaleFemale['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_inspectionMaleFemale->delete_status = $delete_status;
            $del_inspectionMaleFemale->save();
            return response()->json([
                'status' => 200,
                'message' => 'Inspection Male Female deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Inspection Male Female Found',
            ]);
        }

    }
}

