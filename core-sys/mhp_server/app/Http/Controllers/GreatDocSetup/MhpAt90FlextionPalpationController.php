<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAt90FlextionPalpation;
use Illuminate\Support\Facades\Validator;

class MhpAt90FlextionPalpationController extends Controller
{
    //
    public function index()
    {
        $at90Flextion = MhpAt90FlextionPalpation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'at90Flextion'=>$at90Flextion]);
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
           
            $at90Flextion = new MhpAt90FlextionPalpation();
            $at90Flextion->name = $request->name;

         $at90Flextion->save();

            return response()->json(['status'=>200,'message'=>'At 90 Flextion Palpation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $at90Flextion=MhpAt90FlextionPalpation::find($id);
        return response()->json(['status'=>200,'at90Flextion'=>$at90Flextion]);
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
           
            $update_at90Flextion=MhpAt90FlextionPalpation::find($id);
            $update_at90Flextion->name=$request->name;
            $update_at90Flextion->update();

            return response()->json(['status'=>200,'message'=>'At 90 Flextion Palpation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_at90Flextion = MhpAt90FlextionPalpation::find($id);
        if ($del_at90Flextion)
        {
            if ($del_at90Flextion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_at90Flextion->delete_status = $delete_status;
            $del_at90Flextion->save();
            return response()->json([
                'status' => 200,
                'message' => 'At 90 Flextion Palpation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No At 90 Flextion Palpation Found',
            ]);
        }

    }
}

