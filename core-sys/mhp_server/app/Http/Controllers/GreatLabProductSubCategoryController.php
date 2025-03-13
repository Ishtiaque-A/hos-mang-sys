<?php

namespace App\Http\Controllers;

use App\Models\GreatLabProductSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GreatLabProductSubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = GreatLabProductSubCategory::with('category')->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function subCategoryById($id)
    {
        $categories = GreatLabProductSubCategory::where('category_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'categories' => $categories]);
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
            'name' => 'required|unique:great_lab_product_sub_categories,name',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err['name'][0],
            ], 400);
        }
        $data = new GreatLabProductSubCategory();
        $data->category_id = $request->category_id;
        $data->name = $request->name;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Product Category Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabProductSubCategory  $GreatLabProductSubCategory
     * @return \Illuminate\Http\Response
     */
    public function show(GreatLabProductSubCategory $GreatLabProductSubCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabProductSubCategory  $GreatLabProductSubCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabProductSubCategory $GreatLabProductSubCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabProductSubCategory  $GreatLabProductSubCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabProductSubCategory::find($id);
        $data->subcategory_id = $request->subcategory_id;
        $data->name = $request->name;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Product Category Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabProductSubCategory  $GreatLabProductSubCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabProductSubCategory::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Product Category Deleted Successfully']);
    }
}
