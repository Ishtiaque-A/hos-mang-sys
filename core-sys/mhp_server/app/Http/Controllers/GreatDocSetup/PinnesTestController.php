<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsPinnesTest;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class PinnesTestController extends Controller
{
    public function index()
    {
        $pinnestest=CnsPinnesTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'pinnestest'=>$pinnestest]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'pinnestest_name' => 'required|max:100',
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
       $pinnestest=new CnsPinnesTest();
       $pinnestest->pinnestest_name=$request->pinnestest_name;
       $pinnestest->status_id=$request->status_id;
       $pinnestest->selection_criteria=$request->selection_criteria;
       $pinnestest->save();

        return response()->json(['status'=>200,'message'=>'Rinnes Test Added Successfully']);
    }
}


    public function edit($id)
    {
      $pinnestest=CnsPinnesTest::find($id);
        return response()->json(['status'=>200,'pinnestest'=>$pinnestest]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'pinnestest_name' => 'required|max:100',
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
        $update_pinnestest=CnsPinnesTest::find($id);
        $update_pinnestest->pinnestest_name=$request->pinnestest_name;
        $update_pinnestest->status_id=$request->status_id;
        $update_pinnestest->selection_criteria=$request->selection_criteria;
        $update_pinnestest->update();

        return response()->json(['status'=>200,'message'=>'Rinnes Test Updated Successfully']);
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
        $del_pinnestest = CnsPinnesTest::find($id);
        if ($del_pinnestest)
        {
            if ($del_pinnestest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_pinnestest->delete_status = $delete_status;
            $del_pinnestest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Rinnes Test deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No pinnestest Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
