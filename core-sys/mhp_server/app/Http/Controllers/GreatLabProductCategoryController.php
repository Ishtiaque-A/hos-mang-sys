<?php

namespace App\Http\Controllers;

use App\Models\GreatLabProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GreatLabProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //ddd
    public function index()
    {
        $categories = GreatLabProductCategory::orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'categories' => $categories]);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:great_lab_product_categories,name',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err['name'][0],
            ], 400);
        }
        $data = new GreatLabProductCategory();
        $data->name = $request->name;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Product Category Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabProductCategory  $greatLabProductCategory
     * @return \Illuminate\Http\Response
     */
    public function show(GreatLabProductCategory $greatLabProductCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabProductCategory  $greatLabProductCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabProductCategory $greatLabProductCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabProductCategory  $greatLabProductCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabProductCategory::find($id);
        $data->name = $request->name;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Product Category Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabProductCategory  $greatLabProductCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabProductCategory::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Product Category Deleted Successfully']);
    }
}
