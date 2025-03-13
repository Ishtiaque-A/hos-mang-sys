<?php

namespace App\Http\Controllers;

use App\Models\GreatLabBooth;
use App\Models\GreatLabBoothStock;
use App\Models\GreatLabBoothStockOut;
use App\Models\GreatLabStockOut;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GreatLabBoothController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $booths = GreatLabBooth::where('status', "Active")->orderBy('id', 'desc')->get();
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
            'name' => 'required',
            'booth_no' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err,
            ], 400);
        }
        $data = new GreatLabBooth();
        $data->name = $request->name;
        $data->branch_id = $request->branch_id;
        $data->booth_no = $request->booth_no;
        $data->status = $request->status;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabBooth  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = GreatLabBooth::with('stocks')->find($id);
        return response()->json(['status' => 200, 'data' => $data]);
    }
    public function stockAllBooth()
    {
        $data =  GreatLabBoothStock::with('booth', 'product')
            ->select('id', 'booth_id', 'quantity', 'product_id', 'price')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'data' => $data]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabBooth  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabBooth $greatLabSupplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabBooth  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabBooth::find($id);
        $data->name = $request->name;
        $data->branch_id = $request->branch_id;
        $data->booth_no = $request->booth_no;
        $data->status = $request->status;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabBooth  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabBooth::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Deleted Successfully']);
    }
    public function stockOutBranchReport(Request $request, $id)
    {
        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $stock = GreatLabStockOut::with('invoice')
                ->where('branch_id', $id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->orderBy('id', 'desc')
                ->get();
            return response()->json(['status' => 200, 'stock' => $stock]);
        }
        $stock = GreatLabStockOut::with('invoice')
            ->where('branch_id', $id)
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'stock' => $stock]);
    }
    public function stockOutReport(Request $request, $id)
    {
        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $stock = GreatLabBoothStockOut::with('invoice')
                ->where('booth_id', $id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->orderBy('id', 'desc')
                ->get();
            return response()->json(['status' => 200, 'stock' => $stock]);
        }
        $stock = GreatLabBoothStockOut::with('invoice')
            ->where('booth_id', $id)
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'stock' => $stock]);
    }
}
