<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVomiting;
use Illuminate\Support\Facades\Validator;
class MhpVomitingController extends Controller
{
    //
    public function index()
    {
        $Vomiting = MhpVomiting::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Vomiting'=>$Vomiting]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Vomiting_name' => 'required|max:100',
       
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
           
            $Vomiting = new MhpVomiting();
            $Vomiting->Vomiting_name = $request->Vomiting_name;

         $Vomiting->save();

            return response()->json(['status'=>200,'message'=>'Vomiting Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Vomiting=MhpVomiting::find($id);
        return response()->json(['status'=>200,'Vomiting'=>$Vomiting]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Vomiting_name' => 'required|max:100',
         

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
           
            $update_Vomiting=MhpVomiting::find($id);
            $update_Vomiting->Vomiting_name=$request->Vomiting_name;
            $update_Vomiting->update();

            return response()->json(['status'=>200,'message'=>'Vomiting Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Vomiting = MhpVomiting::find($id);
        if ($del_Vomiting)
        {
            if ($del_Vomiting['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Vomiting->delete_status = $delete_status;
            $del_Vomiting->save();
            return response()->json([
                'status' => 200,
                'message' => 'Vomiting deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Vomiting Found',
            ]);
        }

    }
}

