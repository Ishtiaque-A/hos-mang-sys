<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTobaccoType;
use Illuminate\Support\Facades\Validator;

class TobaccoTypeController extends Controller
{
    public function index()
    {
        $tobacco_types = MhpTobaccoType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'tobacco_types' => $tobacco_types,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'tobacco_types_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpTobaccoType();
            $data->tobacco_types_name = $request->tobacco_types_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Tobacco Type Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $tobacco_types = MhpTobaccoType::find($id);

        if ($tobacco_types)
        {
            return response()->json([
                'status' => 200,
                'tobacco_types' => $tobacco_types,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tobacco Type Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpTobaccoType::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'tobacco_types_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->tobacco_types_name = $request->tobacco_types_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Tobacco Type Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Tobacco Type Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $tobacco_types = MhpTobaccoType::find($id);
        if ($tobacco_types)
        {
            if ($tobacco_types['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $tobacco_types->delete_status = $delete_status;
            $tobacco_types->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tobacco Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tobacco Type Found',
            ]);
        }

    }

}
