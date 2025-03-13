<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHerniasInguinal;
use Illuminate\Support\Facades\Validator;

class MhpHerniasInguinalController extends Controller
{
    //
    public function index()
    {
        $herniasinguinal = MhpHerniasInguinal::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'herniasinguinal'=>$herniasinguinal]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'herniasinguinal_name' => 'required|max:100',
       
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
           
            $herniasinguinal = new MhpHerniasInguinal();
            $herniasinguinal->herniasinguinal_name = $request->herniasinguinal_name;

         $herniasinguinal->save();

            return response()->json(['status'=>200,'message'=>'Hernias  Inguinal Added Successfully']);
        }
    }


    public function edit($id)
    {
        $herniasinguinal=MhpHerniasInguinal::find($id);
        return response()->json(['status'=>200,'herniasinguinal'=>$herniasinguinal]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'herniasinguinal_name' => 'required|max:100',
         

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
           
            $update_herniasinguinal=MhpHerniasInguinal::find($id);
            $update_herniasinguinal->herniasinguinal_name=$request->herniasinguinal_name;
            $update_herniasinguinal->update();

            return response()->json(['status'=>200,'message'=>'Hernias  Inguinal Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_herniasinguinal = MhpHerniasInguinal::find($id);
        if ($del_herniasinguinal)
        {
            if ($del_herniasinguinal['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_herniasinguinal->delete_status = $delete_status;
            $del_herniasinguinal->save();
            return response()->json([
                'status' => 200,
                'message' => 'Hernias  Inguinal deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Hernias  Inguinal Found',
            ]);
        }

    }
}

