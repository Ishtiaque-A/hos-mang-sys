<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpExamHistSelectParam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamHistSelectParamController extends Controller
{
    //

    public function index()
    {
        $selection_parameter = MhpExamHistSelectParam::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'selection_parameter' => $selection_parameter,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'selection_parameter_code' => 'required|max:100',
            'selection_parameter_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $selection_parameter = new MhpExamHistSelectParam();
            $selection_parameter->selection_parameter_code = $request->selection_parameter_code;
            $selection_parameter->selection_parameter_name = $request->selection_parameter_name;
            $selection_parameter->save();

            return response()->json([
                'status' => 200,
                'message' => 'Selection Parameter Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $selection_parameter = MhpExamHistSelectParam::find($id);

        if ($selection_parameter)
        {
            return response()->json([
                'status' => 200,
                'selection_parameter' => $selection_parameter,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Selection Parameter Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'selection_parameter_code' => 'required|max:100',
            'selection_parameter_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $selection_parameter = MhpExamHistSelectParam::find($id);
            $selection_parameter->selection_parameter_code = $request->selection_parameter_code;
            $selection_parameter->selection_parameter_name = $request->selection_parameter_name;
            $selection_parameter->update();

            return response()->json([
                'status' => 200,
                'message' => 'Selection Parameter Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $selection_parameter = MhpExamHistSelectParam::find($id);
        if ($selection_parameter)
        {
            if ($selection_parameter['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $selection_parameter->delete_status = $delete_status;
            $selection_parameter->save();

            return response()->json([
                'status' => 200,
                'message' => 'Selection Parameter deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Selection Parameter Found',
            ]);
        }
    }

}
