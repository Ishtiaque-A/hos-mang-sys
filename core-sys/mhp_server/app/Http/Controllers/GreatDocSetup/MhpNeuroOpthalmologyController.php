<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNeuroOpthalmology;
use Illuminate\Support\Facades\Validator;

class MhpNeuroOpthalmologyController extends Controller
{
    //
    public function index()
    {
        $NeuroOpthalmology = MhpNeuroOpthalmology::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'NeuroOpthalmology'=>$NeuroOpthalmology]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'NeuroOpthalmology_name' => 'required|max:100',
       
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
           
            $NeuroOpthalmology = new MhpNeuroOpthalmology();
            $NeuroOpthalmology->NeuroOpthalmology_name = $request->NeuroOpthalmology_name;

         $NeuroOpthalmology->save();

            return response()->json(['status'=>200,'message'=>'Neuro Opthalmology Added Successfully']);
        }
    }


    public function edit($id)
    {
        $NeuroOpthalmology=MhpNeuroOpthalmology::find($id);
        return response()->json(['status'=>200,'NeuroOpthalmology'=>$NeuroOpthalmology]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'NeuroOpthalmology_name' => 'required|max:100',
         

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
           
            $update_NeuroOpthalmology=MhpNeuroOpthalmology::find($id);
            $update_NeuroOpthalmology->NeuroOpthalmology_name=$request->NeuroOpthalmology_name;
            $update_NeuroOpthalmology->update();

            return response()->json(['status'=>200,'message'=>'Neuro Opthalmology Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_NeuroOpthalmology = MhpNeuroOpthalmology::find($id);
        if ($del_NeuroOpthalmology)
        {
            if ($del_NeuroOpthalmology['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_NeuroOpthalmology->delete_status = $delete_status;
            $del_NeuroOpthalmology->save();
            return response()->json([
                'status' => 200,
                'message' => 'Neuro Opthalmology deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Neuro Opthalmology Found',
            ]);
        }

    }
}
