<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCoverTest;
use Illuminate\Support\Facades\Validator;

class MhpCoverTestController extends Controller
{
    //
    public function index()
    {
        $CoverTest = MhpCoverTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'CoverTest'=>$CoverTest]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'CoverTest_name' => 'required|max:100',
       
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
           
            $CoverTest = new MhpCoverTest();
            $CoverTest->CoverTest_name = $request->CoverTest_name;

         $CoverTest->save();

            return response()->json(['status'=>200,'message'=>'Cover Test Added Successfully']);
        }
    }


    public function edit($id)
    {
        $CoverTest=MhpCoverTest::find($id);
        return response()->json(['status'=>200,'CoverTest'=>$CoverTest]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'CoverTest_name' => 'required|max:100',
         

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
           
            $update_CoverTest=MhpCoverTest::find($id);
            $update_CoverTest->CoverTest_name=$request->CoverTest_name;
            $update_CoverTest->update();

            return response()->json(['status'=>200,'message'=>'Cover Test Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_CoverTest = MhpCoverTest::find($id);
        if ($del_CoverTest)
        {
            if ($del_CoverTest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_CoverTest->delete_status = $delete_status;
            $del_CoverTest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cover Test deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Cover Test Found',
            ]);
        }

    }
}


