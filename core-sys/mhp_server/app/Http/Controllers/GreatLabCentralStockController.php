<?php

namespace App\Http\Controllers;

use App\Models\GreatLabCentralStock;
use App\Models\GreatLabPurchaseIn;
use App\Models\GreatLabPurchaseInDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GreatLabCentralStockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = GreatLabCentralStock::with(['product'])
            ->select('product_id','stock','id','bonus_qty','price','expire_date','opening_stock')
            ->orderBy('id', 'desc')
            ->withSum('in', 'quantity')
            ->withSum('out', 'quantity')
            ->get();
        return response()->json([
            'stock' => $data,
            'status' => 200,
            'message' => 'success'
        ]);
    }
    public function purchaseInReport(Request $request)
    {
        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::parse($request->startDate)->startOfDay();
            $endDate = Carbon::parse($request->endDate)->endOfDay();
            $stock = GreatLabPurchaseIn::with('supplier', 'details')
                ->whereDate('date', '>=', $startDate)
                ->whereDate('date', '<=', $endDate)
                ->select('total', 'id', 'supplier_id', 'date', 'created_by', 'status', 'remarks', 'purchase_no')
                ->orderBy('id', 'desc')
                ->get();

            return response()->json(['status' => 200, 'stock' => $stock]);
        }
        $stock = GreatLabPurchaseIn::with('supplier', 'details')
            ->select('total', 'id', 'supplier_id', 'date', 'created_by', 'status', 'remarks', 'purchase_no')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'stock' => $stock]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function purchaseForStock()
    {
        $data = GreatLabPurchaseIn::with('supplier', 'details')
            ->select('total', 'id', 'supplier_id', 'date', 'created_by', 'status', 'remarks', 'purchase_no')
            ->where('status', 'Approved')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            'stock' => $data,
            'status' => 200,
            'message' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $purchase_no = GreatLabPurchaseIn::max('id') + 10001;
        $data = new GreatLabPurchaseIn();
        $data->purchase_no = $purchase_no;
        $data->supplier_id = $request->supplier_id;
        $data->date = $request->date;
        $data->created_by = $request->stock_in_by;
        // $data->reference_invoice = $request->reference_invoice;
        // $data->reference_order = $request->reference_order;
        $data->status = "Pending";
        $data->remarks = $request->remarks;
        $data->total = $request->totalPrice;
        // $data->paid = $request->paid;
        // $data->due = $request->due;
        // $data->discount = $request->discount;
        // $data->vat = $request->vat;
        $data->save();

        $details = $request->stock_items;
        foreach ($details as $detail) {
            $item = new GreatLabPurchaseInDetails();
            $item->purchase_id = $data->id;
            $item->product_id = $detail['id'];
            $item->name = $detail['name'];
            $item->quantity = $detail['quantity'];
            $item->bonus_quantity = $detail['bonus_quantity'];
            $item->purchase_price = $detail['purchase_price'];
            $item->vat = $detail['vat'];
            // $item->total = $detail['total'];
            // $item->discount = $detail['discount'];
            $item->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabCentralStock  $greatLabCentralStock
     * @return \Illuminate\Http\Response
     */
    public function deletePurchaseInDetails($id)
    {
        GreatLabPurchaseInDetails::where('id', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Data Deleted Successfully',
        ]);
    }
    public function show(GreatLabCentralStock $greatLabCentralStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabCentralStock  $greatLabCentralStock
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabCentralStock $greatLabCentralStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabCentralStock  $greatLabCentralStock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabPurchaseIn::find($id);
        $data->supplier_id = $request->supplier_id;
        $data->date = $request->date;
        $data->created_by = $request->stock_in_by;
        // $data->reference_invoice = $request->reference_invoice;
        // $data->reference_order = $request->reference_order;
        $data->status = $request->status;
        $data->remarks = $request->remarks;
        $data->total = $request->totalPrice;
        // $data->paid = $request->paid;
        // $data->due = $request->due;
        // $data->discount = $request->discount;
        // $data->vat = $request->vat;
        $data->update();

        $details = $request->stock_items;
        foreach ($details as $detail) {
            $exist = GreatLabPurchaseInDetails::where(['id' => $detail['id'], 'purchase_id' => $id])->first();
            if ($exist) {
                $item = GreatLabPurchaseInDetails::find($detail['id']);
                $item->name = $detail['name'];
                $item->quantity = $detail['quantity'];
                $item->bonus_quantity = $detail['bonus_quantity'] ;
                $item->purchase_price = $detail['purchase_price'];
                $item->vat = $detail['vat'];
                // $item->total = $detail['total'];
                // $item->discount = $detail['discount'];
                $item->update();
            } else {
                $item = new GreatLabPurchaseInDetails();
                $item->purchase_id = $data->id;
                $item->product_id = $detail['id'];
                $item->name = $detail['name'];
                $item->quantity = $detail['quantity'];
                $item->bonus_quantity = $detail['bonus_quantity'];
                $item->purchase_price = $detail['purchase_price'];
                $item->vat = $detail['vat'];
                // $item->total = $detail['total'];
                // $item->discount = $detail['discount'];
                $item->save();
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Updated Successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabCentralStock  $greatLabCentralStock
     * @return \Illuminate\Http\Response
     */
    public function destroy(GreatLabCentralStock $greatLabCentralStock)
    {
        //
    }
}
