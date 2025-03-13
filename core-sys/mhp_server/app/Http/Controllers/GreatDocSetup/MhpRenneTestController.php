<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRenneTest;
use Illuminate\Support\Facades\Validator;

class MhpRenneTestController extends Controller
{
    //
    public function index()
    {
        $RenneTest = MhpRenneTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'RenneTest'=>$RenneTest]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'RenneTest_name' => 'required|max:100',
       
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
           
            $RenneTest = new MhpRenneTest();
            $RenneTest->RenneTest_name = $request->RenneTest_name;

         $RenneTest->save();

            return response()->json(['status'=>200,'message'=>'Renne Test Added Successfully']);
        }
    }


    public function edit($id)
    {
        $RenneTest=MhpRenneTest::find($id);
        return response()->json(['status'=>200,'RenneTest'=>$RenneTest]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'RenneTest_name' => 'required|max:100',
         

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
           
            $update_RenneTest=MhpRenneTest::find($id);
            $update_RenneTest->RenneTest_name=$request->RenneTest_name;
            $update_RenneTest->update();

            return response()->json(['status'=>200,'message'=>'Renne Test Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_RenneTest = MhpRenneTest::find($id);
        if ($del_RenneTest)
        {
            if ($del_RenneTest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_RenneTest->delete_status = $delete_status;
            $del_RenneTest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Renne Test deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Renne Test Found',
            ]);
        }

    }
}

