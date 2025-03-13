<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAtFullFlextionPalpation;
use Illuminate\Support\Facades\Validator;

class MhpAtFullFlextionPalpationController extends Controller
{
    //
    public function index()
    {
        $atFullFlextionPalpation = MhpAtFullFlextionPalpation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'atFullFlextionPalpation'=>$atFullFlextionPalpation]);
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
           
            $atFullFlextionPalpation = new MhpAtFullFlextionPalpation();
            $atFullFlextionPalpation->name = $request->name;

         $atFullFlextionPalpation->save();

            return response()->json(['status'=>200,'message'=>'At Full Flextion Palpation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $atFullFlextionPalpation=MhpAtFullFlextionPalpation::find($id);
        return response()->json(['status'=>200,'atFullFlextionPalpation'=>$atFullFlextionPalpation]);
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
           
            $update_atFullFlextionPalpation=MhpAtFullFlextionPalpation::find($id);
            $update_atFullFlextionPalpation->name=$request->name;
            $update_atFullFlextionPalpation->update();

            return response()->json(['status'=>200,'message'=>'At Full Flextion Palpation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_atFullFlextionPalpation = MhpAtFullFlextionPalpation::find($id);
        if ($del_atFullFlextionPalpation)
        {
            if ($del_atFullFlextionPalpation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_atFullFlextionPalpation->delete_status = $delete_status;
            $del_atFullFlextionPalpation->save();
            return response()->json([
                'status' => 200,
                'message' => 'At Full Flextion Palpation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No At Full Flextion Palpation Found',
            ]);
        }

    }
}


