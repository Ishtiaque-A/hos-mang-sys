<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAutoFill;
use App\Models\MhpGreatDocAutoFill;
use Illuminate\Support\Facades\Validator;

class MhpAutoFillController extends Controller
{
    //
    public function index()
    {
        $autoFill = MhpAutoFill::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'autoFill'=>$autoFill]);
    }

    public function dia_pro_reason($type)
    {
        $data = MhpAutoFill::where('autoFill_name','like','%'.$type.'%')->where('delete_status',0)->orderBy('id','asc')->get();


        return response()->json(
            ['status'=>200,'data'=>$data]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'autoFill_name' => 'required|max:100',
            'autoFill_text' => 'required',
            'autoFill_history' => 'required',
       
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
           
            $autoFill = new MhpAutoFill();
            $autoFill->autoFill_name = $request->autoFill_name;
            $autoFill->autoFill_text = $request->autoFill_text;
            $autoFill->autoFill_history = $request->autoFill_history;

         $autoFill->save();

            return response()->json(['status'=>200,'message'=>'Auto Fill Added Successfully']);
        }
    }


    public function edit($id)
    {
        $autoFill=MhpAutoFill::find($id);
        return response()->json(['status'=>200,'autoFill'=>$autoFill]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'autoFill_name' => 'required|max:100',
            'autoFill_text' => 'required',
            'autoFill_history' => 'required',
         

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
           
            $update_autoFill=MhpAutoFill::find($id);
            $update_autoFill->autoFill_name=$request->autoFill_name;
            $update_autoFill->autoFill_text=$request->autoFill_text;
            $update_autoFill->autoFill_history=$request->autoFill_history;
            $update_autoFill->update();

            return response()->json(['status'=>200,'message'=>'Auto Fill Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_autoFill = MhpAutoFill::find($id);
        if ($del_autoFill)
        {
            if ($del_autoFill['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_autoFill->delete_status = $delete_status;
            $del_autoFill->save();
            return response()->json([
                'status' => 200,
                'message' => 'Auto Fill deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Auto Fill Found',
            ]);
        }

    }
   public function autoFillById($id){
        $autoFill = MhpAutoFill::where('id',$id)->first();
 return response()->json([
                'status' => 200,
                'autoFill'=>$autoFill
            ]);
   }

   public function saveGreatDocAutoFill(Request $request){
    //     $validator = Validator::make($request->all(),[
    //         'auto_fill_id' => 'required|max:100',
    //         'auto_fill_text' => 'required|max:100',
    //         'auto_fill_history' => 'required|max:100',
       
    //     ],
    // );

    //     if ($validator->fails())
    //     {
    //         return response()->json([
    //             'status' => 400,
    //             'errors' => $validator->messages(),
    //         ]);

    //     } 
    //     else{
        $greatDocAutofill = new MhpGreatDocAutoFill();
            $greatDocAutofill->auto_fill_id = $request->auto_fill_id;
            $greatDocAutofill->auto_fill_text  = $request->auto_fill_text ;
            $greatDocAutofill->auto_fill_history = $request->auto_fill_history;
            $greatDocAutofill->patient_id = $request->patient_id;
            $greatDocAutofill->save();

            return response()->json(['status'=>200,'message'=>'Great AutoFill  Added Successfully']);
   // }
}
}


