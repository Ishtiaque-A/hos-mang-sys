<?php

namespace App\Http\Controllers\NewLabModule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLabModuleTestCatgeory;
use App\Models\MhpNewLabModuleTestGroup;
use App\Models\MhpLabTestParameterNameAndUnit;
use App\Models\MhpNewLabModuleTestName;
use Illuminate\Support\Facades\Validator;
use DB;

class NewTestNameController extends Controller
{
    public function index()
    {
        $test_name = MhpNewLabModuleTestName::with('category', 'group', 'subCategory', 'parameter', 'accounts', 'accounts_group', 'accounts_type')->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }
    public function radiology()
    {
        $test_name = MhpNewLabModuleTestName::where('test_group_id', 1)->with('category', 'group', 'subCategory')->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }
    public function pathology()
    {
        $test_name = MhpNewLabModuleTestName::where('test_group_id', 2)->with('category', 'group', 'subCategory')->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }
    public function getTestNameForPathology()
    {
        $test_name = MhpNewLabModuleTestName::select('id', 'test_name')->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }
    public function single_test($id)
    {
        $test_name = MhpNewLabModuleTestName::with('category', 'group', 'subCategory', 'parameterGroup', 'parameter')->find($id);

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }
    public function lab_single_test($id)
    {
        $test_name = MhpNewLabModuleTestName::with('category', 'group', 'subCategory', 'parameterGroup', 'lab_parameter')->find($id);

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }




    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'test_group_id' => 'required|max:100',
            'test_category_id' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = new MhpNewLabModuleTestName();
            $data->test_group_id = $request->test_group_id;
            $data->test_category_id = $request->test_category_id;
            $data->test_sub_category_id = $request->test_sub_category_id;
            $data->test_name = $request->test_name;
            $data->fee = $request->fee;
            // $data->accounts_id = $request->accounts_id;
            // $data->accounts_type_id = $request->accounts_type_id;
            // $data->accounts_group_id = $request->accounts_group_id;
            $data->specimen_id = $request->specimen_id;
            $data->discount = $request->discount;
            $data->hide_test_name = $request->hide_test_name;
            $data->item_code = $request->item_code;
            $data->save();

            return response()->json(['status' => 200, 'data' => $data, 'message' => 'Test Name Added Successfully']);
        }
    }


    public function edit($id)
    {
        $test_name = MhpNewLabModuleTestName::with('category', 'group', 'subCategory', 'parameter')->find($id);

        return response()->json(['status' => 200, 'test_name' => $test_name]);
    }

    public function testParameter($id)
    {
        $parameter = MhpLabTestParameterNameAndUnit::where('test_id', $id)->get();

        return response()->json(['status' => 200, 'parameter' => $parameter]);
    }


    public function update(Request $request, $id)
    {

        $test_category = MhpNewLabModuleTestName::find($id);
        $test_category->test_group_id = $request->test_group_id;
        $test_category->test_category_id = $request->test_category_id;
        $test_category->test_name = $request->test_name;
        $test_category->fee = $request->fee;
        $test_category->test_parameter = $request->test_parameter;
        // $test_category->accounts_id = $request->accounts_id;
        // $test_category->accounts_type_id = $request->accounts_type_id;
        // $test_category->accounts_group_id = $request->accounts_group_id;
        $test_category->discount = $request->discount;
        $test_category->hide_test_name = $request->hide_test_name;
        $test_category->item_code = $request->item_code;
        $test_category->update();
        $parameters = json_decode($request->parameter_data, true);
        if (count($parameters) > 0) {
            foreach ($parameters as $key => $group) {
                if (count($group['parameter']) > 0) {
                    foreach ($group['parameter'] as $key => $parameter) {
                        if ($parameter['id'] && $parameter['parameter_name']) {
                            $test_parameter = MhpLabTestParameterNameAndUnit::find($parameter['id']);
                            $test_parameter->parameter_name = $parameter['parameter_name'];
                            $test_parameter->parameter_group_id = $group['id'];
                            $test_parameter->test_id = $id;
                            $test_parameter->parameter_unit = $parameter['parameter_unit'];
                            $test_parameter->update();
                        } else if ($parameter['parameter_name']) {
                            $test_parameter = new MhpLabTestParameterNameAndUnit();
                            $test_parameter->parameter_name = $parameter['parameter_name'];
                            $test_parameter->parameter_group_id = $group['id'];
                            $test_parameter->test_id = $id;
                            $test_parameter->parameter_unit = $parameter['parameter_unit'];
                            $test_parameter->save();
                        }
                    }
                }
            }
        }
        return response()->json(['status' => 200, 'message' => 'Test Name Updated Successfully']);
    }


    public function destroy($id)
    {
        $del_test_name = MhpNewLabModuleTestName::find($id);

        $del_test_name->delete();
        return response()->json([
            'status' => 200,
            'test_name' => $del_test_name,

            'message' => 'Test Name  deleted successfully',
        ]);
    }

    public function testNameById($id)
    {
        $all_name = MhpNewLabModuleTestName::where('test_category_id', $id)->get();
        return response()->json([
            'status' => 200,
            'all_name' => $all_name,
        ]);
    }
    public function testNameByCategory($category)
    {
        $test_name = DB::table('mhp_new_lab_module_test_names')->leftJoin('mhp_lab_module_test_catgeories', 'mhp_lab_module_test_catgeories.id', 'mhp_new_lab_module_test_names.test_category_id')->leftJoin('mhp_new_lab_module_test_groups', 'mhp_new_lab_module_test_names.test_group_id', 'mhp_new_lab_module_test_groups.id')->select('mhp_lab_module_test_catgeories.*', 'mhp_new_lab_module_test_groups.*', 'mhp_new_lab_module_test_names.*')->where('mhp_new_lab_module_test_names.test_group_name', $category)->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name
        ]);
    }

    public function testNameByGroupId($id)
    {
        $test_name = MhpNewLabModuleTestName::with('category', 'group')->where('test_group_id', $id)->get();
        $category = MhpLabModuleTestCatgeory::where('test_group_id', $id)->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
            'category' => $category
        ]);
    }
    public function testNameByCategoryId($id)
    {
        $test_name = MhpNewLabModuleTestName::with('category', 'group')->where('test_category_id', $id)->get();

        return response()->json([
            'status' => 200,
            'test_name' => $test_name,
        ]);
    }
}
