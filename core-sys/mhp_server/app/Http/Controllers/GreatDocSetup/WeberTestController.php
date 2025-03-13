<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWeberTest;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class WeberTestController extends Controller
{
   public function index()
    {
        $weberTest=MhpWeberTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'weberTest'=>$weberTest]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'weberTest_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
       $weberTest=new MhpWeberTest();
       $weberTest->weberTest_name=$request->weberTest_name;
       $weberTest->status_id=$request->status_id;
       $weberTest->selection_criteria=$request->selection_criteria;
       $weberTest->save();

        return response()->json(['status'=>200,'message'=>'weberTest Added Successfully']);
    }
}


    public function edit($id)
    {
      $weberTest=MhpWeberTest::find($id);
        return response()->json(['status'=>200,'weberTest'=>$weberTest]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'weberTest_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],
        ['status_id.required'=>'Status field is required']
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $update_weberTest=MhpWeberTest::find($id);
        $update_weberTest->weberTest_name=$request->weberTest_name;
        $update_weberTest->status_id=$request->status_id;
        $update_weberTest->selection_criteria=$request->selection_criteria;
        $update_weberTest->update();

        return response()->json(['status'=>200,'message'=>'weberTest Updated Successfully']);
    }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del_weberTest = MhpWeberTest::find($id);
        if ($del_weberTest)
        {
            if ($del_weberTest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_weberTest->delete_status = $delete_status;
            $del_weberTest->save();
            return response()->json([
                'status' => 200,
                'message' => 'weberTest deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No weberTest Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
