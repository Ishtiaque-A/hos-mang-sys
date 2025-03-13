<?php

namespace App\Http\Controllers\NewLabModule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNewLabModuleTestParameter;
use App\Models\MhpLabTestParameterNameAndUnit;
use Illuminate\Support\Facades\Validator;
use DB;

class NewTestParameterController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'parameter' => 'required',
            'gender' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $existing = MhpNewLabModuleTestParameter::where('parameter', $request->parameter)
                ->where('gender', $request->gender)
                ->where('test_name_id', $request->test_name_id)
                ->first();
            if ($existing) {
                $test_category_param = MhpNewLabModuleTestParameter::find($existing->id);
                $test_category_param->parameter = $request->parameter;
                $test_category_param->gender = $request->gender;
                $test_category_param->minimum_age = $request->minimum_age;
                $test_category_param->maximum_age = $request->maximum_age;
                $test_category_param->lower_value = $request->lower_value;
                $test_category_param->upper_value = $request->upper_value;
                $test_category_param->in_words = $request->in_words;
                $test_category_param->normal_value = $request->normal_value;
                $test_category_param->test_name_id = $request->test_name_id;
                $test_category_param->update();
            } else {
                $test_category_param = new MhpNewLabModuleTestParameter();
                $test_category_param->parameter = $request->parameter;
                $test_category_param->gender = $request->gender;
                $test_category_param->minimum_age = $request->minimum_age;
                $test_category_param->maximum_age = $request->maximum_age;
                $test_category_param->lower_value = $request->lower_value;
                $test_category_param->upper_value = $request->upper_value;
                $test_category_param->in_words = $request->in_words;
                $test_category_param->normal_value = $request->normal_value;
                $test_category_param->test_name_id = $request->test_name_id;
                $test_category_param->save();
            }


            return response()->json(['status' => 200, 'message' => 'Test Name Added Successfully']);
        }
    }
    public function index()
    {
        $data = MhpNewLabModuleTestParameter::get();
        return response()->json([
            "status" => 200,
            "message" => "Test Parameter",
            "data" => $data
        ]);
    }
    public function all_unit()
    {
        $data = MhpLabTestParameterNameAndUnit::get();
        return response()->json([
            "status" => 200,
            "message" => "Test Parameter",
            "data" => $data
        ]);
    }
    public function save_unit(Request $request)
    {
        $data = new MhpLabTestParameterNameAndUnit();
        $data->test_id = $request->test_id;
        $data->parameter_name = $request->parameter_name;
        $data->parameter_unit = $request->parameter_unit;
        $data->parameter_group_id = $request->parameter_group_id;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Test Parameter added",
            "data" => $data
        ]);
    }
    public function update_unit(Request $request, $id)
    {
        $data = MhpLabTestParameterNameAndUnit::find($id);
        $data->test_id = $request->test_id;
        $data->parameter_name = $request->parameter_name;
        $data->parameter_unit = $request->parameter_unit;
        $data->parameter_group_id = $request->parameter_group_id;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test Parameter added",
            "data" => $data
        ]);
    }
    public function update_unit_reference(Request $request, $id)
    {
        $data = MhpLabTestParameterNameAndUnit::find($id);
        $data->reference_value = $request->reference_value;
        $data->show_options = $request->show_options;
        $data->options = $request->options;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test Parameter added",
            "data" => $data
        ]);
    }
    public function destroy_unit($id)
    {
        $data = MhpLabTestParameterNameAndUnit::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Test Parameter added",
            "data" => $data
        ]);
    }
}
