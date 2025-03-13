<?php

namespace App\Http\Controllers;

use App\Models\TestNameConfig;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class TestNameConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $rules = [
            'test_name_id' => 'required',
            'parameter_id' => 'required',
            'child_lower_value' => 'required',
            'child_upper_value' => 'required',
            'child_normal_value' => 'required',
            'male_lower_value' => 'required',
            'male_upper_value' => 'required',
            'male_normal_value' => 'required',
            'female_lower_value' => 'required',
            'female_upper_value' => 'required',
            'female_normal_value' => 'required',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
                "message" => "Validation Failed",
            ]);
        }
        $exitsParameter = TestNameConfig::where('parameter_id', $request->parameter_id)->first();
        if ($exitsParameter) {
            $exitsParameter->test_name_id = $request->test_name_id;
            $exitsParameter->child_lower_value = $request->child_lower_value;
            $exitsParameter->child_upper_value = $request->child_upper_value;
            $exitsParameter->child_normal_value = $request->child_normal_value;
            $exitsParameter->male_lower_value = $request->male_lower_value;
            $exitsParameter->male_upper_value = $request->male_upper_value;
            $exitsParameter->male_normal_value = $request->male_normal_value;
            $exitsParameter->female_lower_value = $request->female_lower_value;
            $exitsParameter->female_upper_value = $request->female_upper_value;
            $exitsParameter->female_normal_value = $request->female_normal_value;
            $exitsParameter->save();
            return response()->json([
                'status' => 200,
                'data' => $exitsParameter,
                'message' => 'Updated successfully',
            ]);
        }

        $test_name_configs = TestNameConfig::create($request->all());
        return response()->json([
            'status' => 201,
            "data" => $test_name_configs,
            "message" => "Added successfully",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TestNameConfig  $testNameConfig
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $config = TestNameConfig::where("parameter_id", $id)->first();
        return response()->json($config, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TestNameConfig  $testNameConfig
     * @return \Illuminate\Http\Response
     */
    public function edit(TestNameConfig $testNameConfig)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TestNameConfig  $testNameConfig
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TestNameConfig $testNameConfig)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TestNameConfig  $testNameConfig
     * @return \Illuminate\Http\Response
     */
    public function destroy(TestNameConfig $testNameConfig)
    {
        //
    }
}
