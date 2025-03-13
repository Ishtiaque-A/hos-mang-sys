<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEarLesion;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class EarLesionController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ear_lesion=MhpEarLesion::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ear_lesion'=>$ear_lesion]);
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
            'earLesion_name' => 'required|max:100',
            'status' => 'required',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $earLesion=new MhpEarLesion();
        $earLesion->earLesion_name=$request->earLesion_name;
        $earLesion->status=$request->status;
        $earLesion->selection_criteria=$request->selection_criteria;
        $earLesion->save();

        return response()->json(['status'=>200,'message'=>'Ear Lesion Added Successfully']);
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
        $earLesion=MhpEarLesion::find($id);
        return response()->json(['status'=>200,'earLesion'=>$earLesion]);
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
            'earLesion_name' => 'required|max:100',
            'status' => 'required',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $update_carnal=MhpEarLesion::find($id);
        $update_carnal->earLesion_name=$request->earLesion_name;
        $update_carnal->status=$request->status;
        $update_carnal->selection_criteria=$request->selection_criteria;
        $update_carnal->update();

        return response()->json(['status'=>200,'message'=>'Ear Lesion Updated Successfully']);
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
        $del_lesion = MhpEarLesion::find($id);
        if ($del_lesion)
        {
            if ($del_lesion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_lesion->delete_status = $delete_status;
            $del_lesion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ear Lesion deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ear Lesion Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
