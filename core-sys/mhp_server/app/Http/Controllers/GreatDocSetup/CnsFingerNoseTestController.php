<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsFingerNoseTest;
use Illuminate\Support\Facades\Validator;

class CnsFingerNoseTestController extends Controller
{
    //
    public function index()
    {
        $FingerNoseTest = CnsFingerNoseTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'FingerNoseTest'=>$FingerNoseTest]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'FingerNoseTest_name' => 'required|max:100',
       
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
           
            $FingerNoseTest = new CnsFingerNoseTest();
            $FingerNoseTest->FingerNoseTest_name = $request->FingerNoseTest_name;

         $FingerNoseTest->save();

            return response()->json(['status'=>200,'message'=>'Finger Nose Test Added Successfully']);
        }
    }


    public function edit($id)
    {
        $FingerNoseTest=CnsFingerNoseTest::find($id);
        return response()->json(['status'=>200,'FingerNoseTest'=>$FingerNoseTest]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'FingerNoseTest_name' => 'required|max:100',
         

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
           
            $update_FingerNoseTest=CnsFingerNoseTest::find($id);
            $update_FingerNoseTest->FingerNoseTest_name=$request->FingerNoseTest_name;
            $update_FingerNoseTest->update();

            return response()->json(['status'=>200,'message'=>'Finger Nose Test Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_FingerNoseTest = CnsFingerNoseTest::find($id);
        if ($del_FingerNoseTest)
        {
            if ($del_FingerNoseTest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_FingerNoseTest->delete_status = $delete_status;
            $del_FingerNoseTest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Finger Nose Test deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Finger Nose Test Found',
            ]);
        }

    }
}


