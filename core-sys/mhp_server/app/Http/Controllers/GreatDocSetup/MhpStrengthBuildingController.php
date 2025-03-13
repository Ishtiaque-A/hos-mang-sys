<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpStrengthBuilding;
use Illuminate\Support\Facades\Validator;

class MhpStrengthBuildingController extends Controller
{
    //
    public function index()
    {
        $strengthBuilding = MhpStrengthBuilding::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'strengthBuilding'=>$strengthBuilding]);
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
           
            $strengthBuilding = new MhpStrengthBuilding();
            $strengthBuilding->name = $request->name;

         $strengthBuilding->save();

            return response()->json(['status'=>200,'message'=>'Strength Building Added Successfully']);
        }
    }


    public function edit($id)
    {
        $strengthBuilding=MhpStrengthBuilding::find($id);
        return response()->json(['status'=>200,'strengthBuilding'=>$strengthBuilding]);
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
           
            $update_strengthBuilding=MhpStrengthBuilding::find($id);
            $update_strengthBuilding->name=$request->name;
            $update_strengthBuilding->update();

            return response()->json(['status'=>200,'message'=>'Strength Building Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_strengthBuilding = MhpStrengthBuilding::find($id);
        if ($del_strengthBuilding)
        {
            if ($del_strengthBuilding['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_strengthBuilding->delete_status = $delete_status;
            $del_strengthBuilding->save();
            return response()->json([
                'status' => 200,
                'message' => 'Strength Building deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Strength Building Found',
            ]);
        }

    }
}


