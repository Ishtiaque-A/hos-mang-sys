<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEarCanal;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class EarCanalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ear_canal=MhpEarCanal::where('delete_status',0)->orderBy('id','desc')->get();

        return response()->json(
            ['status'=>200,'ear_canal'=>$ear_canal]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'canal_name' => 'required|max:100',
            'canal_status' => 'required',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $earCanal=new MhpEarCanal();
        $earCanal->canal_name=$request->canal_name;
        $earCanal->canal_status=$request->canal_status;
        $earCanal->selection_criteria=$request->selection_criteria;
        $earCanal->save();

        return response()->json(['status'=>200,'message'=>'Ear Canal Added Successfully']);
    }
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $EarCanal=MhpEarCanal::find($id);
        return response()->json(['status'=>200,'EarCanal'=>$EarCanal]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'canal_name' => 'required|max:100',
            'canal_status' => 'required',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $update_carnal=MhpEarCanal::find($id);
        $update_carnal->canal_name=$request->canal_name;
        $update_carnal->canal_status=$request->canal_status;
        $update_carnal->selection_criteria=$request->selection_criteria;
        $update_carnal->update();

        return response()->json(['status'=>200,'message'=>'Ear Canal Updated Successfully']);
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
        $del_canal = MhpEarCanal::find($id);
        if ($del_canal)
        {
            if ($del_canal['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_canal->delete_status = $delete_status;
            $del_canal->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ear canal deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ear Canal Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}