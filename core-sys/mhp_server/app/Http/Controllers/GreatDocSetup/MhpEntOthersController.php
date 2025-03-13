<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEntOthers;
use Illuminate\Support\Facades\Validator;

class MhpEntOthersController extends Controller
{
    //
    public function index()
    {
        $EntOthers = MhpEntOthers::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'EntOthers'=>$EntOthers]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'EntOthers_name' => 'required|max:100',
       
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
           
            $EntOthers = new MhpEntOthers();
            $EntOthers->EntOthers_name = $request->EntOthers_name;

         $EntOthers->save();

            return response()->json(['status'=>200,'message'=>'Ent Others Added Successfully']);
        }
    }


    public function edit($id)
    {
        $EntOthers=MhpEntOthers::find($id);
        return response()->json(['status'=>200,'EntOthers'=>$EntOthers]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'EntOthers_name' => 'required|max:100',
         

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
           
            $update_EntOthers=MhpEntOthers::find($id);
            $update_EntOthers->EntOthers_name=$request->EntOthers_name;
            $update_EntOthers->update();

            return response()->json(['status'=>200,'message'=>'Ent Others Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_EntOthers = MhpEntOthers::find($id);
        if ($del_EntOthers)
        {
            if ($del_EntOthers['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_EntOthers->delete_status = $delete_status;
            $del_EntOthers->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ent Others deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ent Others Found',
            ]);
        }

    }
}

