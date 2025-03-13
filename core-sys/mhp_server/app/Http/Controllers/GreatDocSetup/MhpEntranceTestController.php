<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEntranceTest;
use Illuminate\Support\Facades\Validator;

class MhpEntranceTestController extends Controller
{
    //
    public function index()
    {
        $EntranceTest = MhpEntranceTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'EntranceTest'=>$EntranceTest]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'EntranceTest_name' => 'required|max:100',
       
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
           
            $EntranceTest = new MhpEntranceTest();
            $EntranceTest->EntranceTest_name = $request->EntranceTest_name;

         $EntranceTest->save();

            return response()->json(['status'=>200,'message'=>'Entrance Test Added Successfully']);
        }
    }


    public function edit($id)
    {
        $EntranceTest=MhpEntranceTest::find($id);
        return response()->json(['status'=>200,'EntranceTest'=>$EntranceTest]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'EntranceTest_name' => 'required|max:100',
         

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
           
            $update_EntranceTest=MhpEntranceTest::find($id);
            $update_EntranceTest->EntranceTest_name=$request->EntranceTest_name;
            $update_EntranceTest->update();

            return response()->json(['status'=>200,'message'=>'Entrance Test Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_EntranceTest = MhpEntranceTest::find($id);
        if ($del_EntranceTest)
        {
            if ($del_EntranceTest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_EntranceTest->delete_status = $delete_status;
            $del_EntranceTest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Entrance Test deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Entrance Test Found',
            ]);
        }

    }
}

