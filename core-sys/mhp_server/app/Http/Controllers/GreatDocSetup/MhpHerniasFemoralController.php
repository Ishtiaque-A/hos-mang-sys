<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHerniasFemoral;
use Illuminate\Support\Facades\Validator;
class MhpHerniasFemoralController extends Controller
{
    //
    public function index()
    {
        $herniasfemoral = MhpHerniasFemoral::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'herniasfemoral'=>$herniasfemoral]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'herniasfemoral_name' => 'required|max:100',
       
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
           
            $herniasfemoral = new MhpHerniasFemoral();
            $herniasfemoral->herniasfemoral_name = $request->herniasfemoral_name;

         $herniasfemoral->save();

            return response()->json(['status'=>200,'message'=>'Hernias FemoralAdded Successfully']);
        }
    }


    public function edit($id)
    {
        $herniasfemoral=MhpHerniasFemoral::find($id);
        return response()->json(['status'=>200,'herniasfemoral'=>$herniasfemoral]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'herniasfemoral_name' => 'required|max:100',
         

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
           
            $update_herniasfemoral=MhpHerniasFemoral::find($id);
            $update_herniasfemoral->herniasfemoral_name=$request->herniasfemoral_name;
            $update_herniasfemoral->update();

            return response()->json(['status'=>200,'message'=>'Hernias FemoralUpdated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_herniasfemoral = MhpHerniasFemoral::find($id);
        if ($del_herniasfemoral)
        {
            if ($del_herniasfemoral['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_herniasfemoral->delete_status = $delete_status;
            $del_herniasfemoral->save();
            return response()->json([
                'status' => 200,
                'message' => 'Hernias Femoraldeleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Hernias FemoralFound',
            ]);
        }

    }
}

