<?php

namespace App\Http\Controllers\GreatDoc\MedicationChart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpUnit;
// use Illuminate\Support\Facades\Validator;
use Validator;
class UnitController extends Controller
{
         
 public function index()
    {
        $unit = MhpUnit::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'unit'=>$unit]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'unit_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $unit = new MhpUnit();
            $unit->unit_name = $request->unit_name;
            $unit->save();

            return response()->json(['status'=>200,'message'=>'unit Added Successfully']);
        }
    }


    public function edit($id)
    {
        $unit=MhpUnit::find($id);
        return response()->json(['status'=>200,'unit'=>$unit]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'unit_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_unit=MhpUnit::find($id);
            $update_unit->unit_name=$request->unit_name;

            $update_unit->update();

            return response()->json(['status'=>200,'message'=>'unit  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_unit = MhpUnit::find($id);

        if ($del_unit)
        {
            if ($del_unit['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_unit->delete();
            return response()->json([
                'status' => 200,
                'message' => 'unit  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No unit  Found',
            ]);
        }


    }
}
