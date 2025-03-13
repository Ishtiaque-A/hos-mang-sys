<?php

namespace App\Http\Controllers;

use App\Models\ItemNumbers;
use Illuminate\Http\Request;
use Validator;

class ItemNumbersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $itemNumbersName = ItemNumbers::with('dept')->orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  itemNumbersName",
            "itemNumbersName" => $itemNumbersName
        ]);
    }
    public function itemWithDepartment($id)
    {
        $itemNumbersName = ItemNumbers::orderBy('id', 'desc')->where('department', $id)->get();

        return response()->json([
            "status" => 200,
            "message" => "All  itemNumbersName",
            "itemNumbersName" => $itemNumbersName
        ]);
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
            'name' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $itemNumbersName = new ItemNumbers();
            $itemNumbersName->name = $request->name;
            $itemNumbersName->department = $request->department;
            $itemNumbersName->description = $request->description;
            $itemNumbersName->save();

            return response()->json(['status' => 200, 'message' => 'Item Numbers Inserted Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ItemNumbers  $itemNumbers
     * @return \Illuminate\Http\Response
     */
    public function show(ItemNumbers $itemNumbers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ItemNumbers  $itemNumbers
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = ItemNumbers::find($id);

        return response()->json([
            'status' => 200,
            "itemNumbersName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ItemNumbers  $itemNumbers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)

    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $update_path = ItemNumbers::find($id);
            $update_path->name = $request->name;
            $update_path->department = $request->department;
            $update_path->description = $request->description;
            $update_path->update();

            return response()->json(['status' => 200, 'message' => 'Item Numbers Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ItemNumbers  $itemNumbers
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $itemNumbersName = ItemNumbers::find($id);
        $itemNumbersName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Item Numbers Deleted Successfully'
        ]);
    }
}
