<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFlextion0to150Examination;
use Illuminate\Support\Facades\Validator;

class MhpFlextion0to150ExaminationController extends Controller
{
    //
    public function index()
    {
        $flextion0to150Examination = MhpFlextion0to150Examination::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'flextion0to150Examination'=>$flextion0to150Examination]);
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
           
            $flextion0to150Examination = new MhpFlextion0to150Examination();
            $flextion0to150Examination->name = $request->name;

         $flextion0to150Examination->save();

            return response()->json(['status'=>200,'message'=>'Flextion 0 to 150 Examination Added Successfully']);
        }
    }


    public function edit($id)
    {
        $flextion0to150Examination=MhpFlextion0to150Examination::find($id);
        return response()->json(['status'=>200,'flextion0to150Examination'=>$flextion0to150Examination]);
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
           
            $update_flextion0to150Examination=MhpFlextion0to150Examination::find($id);
            $update_flextion0to150Examination->name=$request->name;
            $update_flextion0to150Examination->update();

            return response()->json(['status'=>200,'message'=>'Flextion 0 to 150 Examination Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_flextion0to150Examination = MhpFlextion0to150Examination::find($id);
        if ($del_flextion0to150Examination)
        {
            if ($del_flextion0to150Examination['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_flextion0to150Examination->delete_status = $delete_status;
            $del_flextion0to150Examination->save();
            return response()->json([
                'status' => 200,
                'message' => 'Flextion 0 to 150 Examination deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Flextion 0 to 150 Examination Found',
            ]);
        }

    }
}

