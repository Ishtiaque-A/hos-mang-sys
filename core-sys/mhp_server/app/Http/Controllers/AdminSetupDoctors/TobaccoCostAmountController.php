<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTobaccoCostAmount;
use Illuminate\Support\Facades\Validator;

class TobaccoCostAmountController extends Controller
{
    //

    public function index()
    {
        $tobacco_cost_amounts = MhpTobaccoCostAmount::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'tobacco_cost_amounts' => $tobacco_cost_amounts,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'tobacco_cost_amounts_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpTobaccoCostAmount();
            $data->tobacco_cost_amounts_name = $request->tobacco_cost_amounts_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Tobacco Cost Amount Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $tobacco_cost_amounts = MhpTobaccoCostAmount::find($id);

        if ($tobacco_cost_amounts)
        {
            return response()->json([
                'status' => 200,
                'tobacco_cost_amounts' => $tobacco_cost_amounts,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tobacco Cost Amount Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpTobaccoCostAmount::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'tobacco_cost_amounts_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->tobacco_cost_amounts_name = $request->tobacco_cost_amounts_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Tobacco Cost Amount Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Tobacco Cost Amount Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $tobacco_cost_amount = MhpTobaccoCostAmount::find($id);
        if ($tobacco_cost_amount)
        {
            if ($tobacco_cost_amount['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $tobacco_cost_amount->delete_status = $delete_status;
            $tobacco_cost_amount->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tobacco Cost Amount deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tobacco Cost Amount Found',
            ]);
        }
    }


}
