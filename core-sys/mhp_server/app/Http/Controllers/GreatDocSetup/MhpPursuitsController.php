<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPursuits;
use Illuminate\Support\Facades\Validator;

class MhpPursuitsController extends Controller
{
    //
    public function index()
    {
        $Pursuits = MhpPursuits::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Pursuits'=>$Pursuits]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Pursuits_name' => 'required|max:100',
       
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
           
            $Pursuits = new MhpPursuits();
            $Pursuits->Pursuits_name = $request->Pursuits_name;

         $Pursuits->save();

            return response()->json(['status'=>200,'message'=>'Pursuits Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Pursuits=MhpPursuits::find($id);
        return response()->json(['status'=>200,'Pursuits'=>$Pursuits]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Pursuits_name' => 'required|max:100',
         

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
           
            $update_Pursuits=MhpPursuits::find($id);
            $update_Pursuits->Pursuits_name=$request->Pursuits_name;
            $update_Pursuits->update();

            return response()->json(['status'=>200,'message'=>'Pursuits Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Pursuits = MhpPursuits::find($id);
        if ($del_Pursuits)
        {
            if ($del_Pursuits['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Pursuits->delete_status = $delete_status;
            $del_Pursuits->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pursuits deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Pursuits Found',
            ]);
        }

    }
}


