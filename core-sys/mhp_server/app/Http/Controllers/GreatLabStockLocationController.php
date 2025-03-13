<?php

namespace App\Http\Controllers;

use App\Models\GreatLabStock;
use App\Models\GreatLabStockLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GreatLabStockLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $booths = GreatLabStockLocation::orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'booths' => $booths]);
    }
    public function branchLocation($id)
    {
        $booths = GreatLabStockLocation::where('branch_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'booths' => $booths]);
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
            'name' => 'required|unique:great_lab_stock_locations,name',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err['name'][0],
            ], 400);
        }
        $data = new GreatLabStockLocation();
        $data->name = $request->name;
        $data->branch_id = $request->branch_id;
        $data->status = $request->status;
        $data->save();

        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabStockLocation  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function show(GreatLabStockLocation $greatLabSupplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabStockLocation  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabStockLocation $greatLabSupplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabStockLocation  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:great_lab_stock_locations,name,' . $id,
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err['name'][0],
            ], 400);
        }
        if ($request->status == 'Inactive') {
            $data = GreatLabStock::where('location_id', $id)
                ->where('stock', '>', 0)
                ->get();
            if (count($data) > 0) {
                return response()->json(['status' => 400, 'message' => 'You can not inactive this location unless there is no stock.'], 400);
            }
        }
        $data = GreatLabStockLocation::find($id);
        $data->name = $request->name;
        $data->status = $request->status;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabStockLocation  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabStockLocation::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Deleted Successfully']);
    }
}
