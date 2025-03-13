<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPastAlcoholConsumption;
use Illuminate\Support\Facades\Validator;

class PastAlcoholConsumptionController extends Controller
{
    //

    public function index()
    {
        $alcoholconsumption = MhpPastAlcoholConsumption::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'alcoholconsumption' => $alcoholconsumption,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'alcohol_consumption_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpPastAlcoholConsumption();
            $data->alcohol_consumption_name = $request->alcohol_consumption_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Alcohol Consumption Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $alcoholconsumption = MhpPastAlcoholConsumption::find($id);

        if ($alcoholconsumption)
        {
            return response()->json([
                'status' => 200,
                'alcoholconsumption' => $alcoholconsumption,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Alcohol Consumption Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpPastAlcoholConsumption::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'alcohol_consumption_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->alcohol_consumption_name = $request->alcohol_consumption_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Alcohol Consumption Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Alcohol Consumption Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $alcoholconsumption = MhpPastAlcoholConsumption::find($id);
        if ($alcoholconsumption)
        {
            if ($alcoholconsumption['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $alcoholconsumption->delete_status = $delete_status;
            $alcoholconsumption->save();
            return response()->json([
                'status' => 200,
                'message' => 'Alcohol Consumption deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Alcohol Consumption Found',
            ]);
        }
    }


}
