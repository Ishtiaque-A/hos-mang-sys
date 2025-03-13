<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFlore;
use Illuminate\Support\Facades\Validator;

class MhpFloreController extends Controller
{
    //
    public function index()
    {
        $Flore = MhpFlore::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Flore'=>$Flore]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Flore_name' => 'required|max:100',
       
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
           
            $Flore = new MhpFlore();
            $Flore->Flore_name = $request->Flore_name;

         $Flore->save();

            return response()->json(['status'=>200,'message'=>'Flore Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Flore=MhpFlore::find($id);
        return response()->json(['status'=>200,'Flore'=>$Flore]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Flore_name' => 'required|max:100',
         

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
           
            $update_Flore=MhpFlore::find($id);
            $update_Flore->Flore_name=$request->Flore_name;
            $update_Flore->update();

            return response()->json(['status'=>200,'message'=>'Flore Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Flore = MhpFlore::find($id);
        if ($del_Flore)
        {
            if ($del_Flore['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Flore->delete_status = $delete_status;
            $del_Flore->save();
            return response()->json([
                'status' => 200,
                'message' => 'Flore deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Flore Found',
            ]);
        }

    }
}


