<?php

namespace App\Http\Controllers;

use App\Models\GreatLabBoothRequision;
use App\Models\GreatLabBoothStock;
use App\Models\GreatLabBranchRequisition;
use App\Models\GreatLabBranchRequisitionDetails;
use App\Models\GreatLabCentralStock;
use App\Models\GreatLabCentralStockOut;
use App\Models\GreatLabInventory;
use App\Models\GreatLabPurchaseIn;
use App\Models\GreatLabRequisitionDetails;
use App\Models\GreatLabStock;
use App\Models\GreatLabStockIn;
use App\Models\GreatLabStockInDetails;
use App\Models\GreatLabStockOut;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GreatLabInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inventories = GreatLabInventory::orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'products' => $inventories]);
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
            'name' => 'required|unique:great_lab_inventories,name',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err['name'][0],
            ], 400);
        }
        $itemCode = GreatLabInventory::max('id') + 1001;
        $data = new GreatLabInventory();
        $data->name = $request->name;
        $data->item_code = $itemCode;
        $data->description = $request->description;
        $data->manufacturer = $request->manufacturer;
        $data->mrp = $request->mrp;
        $data->expiry_date = $request->expiry_date;
        $data->category_id = $request->category_id;
        $data->sub_category_id = $request->sub_category_id;
        $data->opening_stock = $request->opening_stock;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Inventory Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabInventory  $greatLabInventory
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = GreatLabInventory::find($id);
        return response()->json(['status' => 200, 'data' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabInventory  $greatLabInventory
     * @return \Illuminate\Http\Response
     */
    public function branchStock($id)
    {
        $data = GreatLabStock::with('product', 'location')->where('branch_id', $id)->get();
        return response()->json(['status' => 200, 'stocks' => $data]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabInventory  $greatLabInventory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:great_lab_inventories,name,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ], 400);
        }
        $data = GreatLabInventory::find($id);
        $data->name = $request->name;
        $data->description = $request->description;
        $data->manufacturer = $request->manufacturer;
        $data->mrp = $request->mrp;
        $data->expiry_date = $request->expiry_date;
        $data->category_id = $request->category_id;
        $data->sub_category_id = $request->sub_category_id;
        $data->opening_stock = $request->opening_stock;
        $data->update();
        return response()->json(['status' => 200, 'message' => 'Great Lab Inventory Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabInventory  $greatLabInventory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        GreatLabInventory::where('id', $id)->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Inventory Deleted Successfully']);
    }
    public function stockIn(Request $request)
    {
        $txn_id = GreatLabStockIn::max('id') + 1001;
        $stockIn = new GreatLabStockIn();
        $stockIn->supplier = $request->supplier_id;
        $stockIn->remarks = $request->remarks;
        $stockIn->txn_id = $txn_id;
        $stockIn->total = $request->totalPrice;
        $stockIn->reference_invoice_no = $request->purchase_no;
        $stockIn->reference_order_no = $request->reference_order_no;
        $stockIn->stock_in_by = $request->created_by;
        $stockIn->location_id = 0;
        $stockIn->delivery_date = $request->delivery_date;
        $stockIn->status = 'Pending';
        $stockIn->save();
        $stockDetails = $request->stock_items;
        foreach ($stockDetails as $key => $value) {
            $stockInDetails = new GreatLabStockInDetails();
            $stockInDetails->stock_in_id = $stockIn->id;
            $stockInDetails->location_id = 0;
            $stockInDetails->product_id = $value['product_id'];
            $stockInDetails->quantity = $value['quantity'];
            $stockInDetails->vat = $value['vat'];
            $stockInDetails->bonus_quantity = $value['bonus_quantity'];
            $stockInDetails->purchase_price = $value['purchase_price'];
            $stockInDetails->save();
        }

        return response()->json(['status' => 200, 'message' => 'Great Lab Stock In Added Successfully']);
    }
    public function stockInUpdate(Request $request, $id)
    {
        $stockIn = GreatLabStockIn::find($id);
        $stockIn->supplier = $request->supplier;
        $stockIn->remarks = $request->remarks;
        $stockIn->total = $request->totalPrice;
        // $stockIn->reference_invoice_no = $request->reference_invoice_no;
        $stockIn->reference_order_no = $request->reference_order_no;
        // $stockIn->stock_in_by = $request->created_by;
        $stockIn->location_id = $request->location_id;
        $stockIn->delivery_date = $request->delivery_date;
        $stockIn->status = $request->status;
        $stockIn->save();
        $stockDetails = $request->stock_items;
        foreach ($stockDetails as $key => $value) {
            $existing = GreatLabStockInDetails::where(['stock_in_id' => $id, 'id' => $value['id']])->first();
            if ($existing) {
                $existing->quantity = $value['quantity'];
                $existing->vat = $value['vat'];
                $existing->location_id = $request->location_id;
                $existing->bonus_quantity = $value['bonus_quantity'];
                $existing->purchase_price = $value['purchase_price'];
                $existing->update();
            } else {
                $stockInDetails = new GreatLabStockInDetails();
                $stockInDetails->stock_in_id = $stockIn->id;
                $stockInDetails->location_id = $request->location_id;
                $stockInDetails->product_id = $value['id'];
                $stockInDetails->quantity = $value['quantity'];
                $stockInDetails->vat = $value['vat'];
                $stockInDetails->bonus_quantity = $value['bonus_quantity'];
                $stockInDetails->purchase_price = $value['purchase_price'];
                $stockInDetails->save();
            }
        }
        if ($stockIn->status == 'Approved') {
            $detailsItem = GreatLabStockInDetails::where('stock_in_id', $id)->get();
            foreach ($detailsItem as $key => $value) {
                $product = GreatLabCentralStock::where(['product_id' => $value['product_id']])->first();
                if ($product) {
                    $product->stock = $product->stock + $value['quantity'];
                    $product->bonus_qty = $product->bonus_qty + $value['bonus_quantity'];
                    $product->price = $value['purchase_price'];
                    $product->vat = $value['vat'];
                    $product->update();
                } else {
                    $product = new GreatLabCentralStock();
                    $product->product_id = $value['product_id'];
                    $product->stock = $value['quantity'];
                    $product->bonus_qty = $value['bonus_quantity'];
                    $product->price = $value['purchase_price'];
                    $product->vat = $value['vat'];
                    $product->opening_stock = $value['quantity'];
                    $product->save();
                }
            }
            $purchase = GreatLabPurchaseIn::where('purchase_no', $stockIn->reference_invoice_no)->first();
            if ($purchase) {
                $purchase->status = 'Stocked In';
                $purchase->update();
            }
        }
        return response()->json(['status' => 200, 'message' => 'Great Lab Stock In updated Successfully']);
    }
    public function deleteDetails($id)
    {
        GreatLabStockInDetails::where('id', $id)->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Stock In Details Deleted Successfully']);
    }
    public function currentStock()
    {
        $stock = GreatLabStock::with(
            'product:item_code,name,manufacturer,id,opening_stock',
            'stockIn:product_id,quantity,purchase_price,location_id',
            'stockOut:product_id,quantity,price,location_id',
            'location:id,name'
        )
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'stock' => $stock]);
    }
    public function stockInReport(Request $request)
    {
        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $stock = GreatLabStockIn::with('details:stock_in_id,product_id,quantity,vat,purchase_price,id,bonus_quantity', 'supplier_details:id,name')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->select('id', 'total', 'supplier', 'delivery_date', 'created_at', 'status', 'location_id', 'txn_id', 'reference_invoice_no', 'reference_order_no')
                ->orderBy('id', 'desc')
                ->get();
            return response()->json(['status' => 200, 'stock' => $stock]);
        }
        $stock = GreatLabStockIn::with('details:stock_in_id,product_id,quantity,vat,purchase_price,id,bonus_quantity', 'supplier_details:id,name', 'location')
            ->select('id', 'total', 'supplier', 'delivery_date', 'created_at', 'location_id', 'stock_in_by', 'status', 'txn_id', 'reference_invoice_no', 'reference_order_no')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'stock' => $stock]);
    }
    public function stockOutReport(Request $request)
    {
        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $stock = GreatLabStockOut::with('invoice', 'location')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->orderBy('id', 'desc')
                ->get();
            return response()->json(['status' => 200, 'stock' => $stock]);
        }
        $stock = GreatLabStockOut::with('invoice', 'location')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['status' => 200, 'stock' => $stock]);
    }
    public function stockOutFromCentral(Request $request, $id)
    {
        $req = GreatLabBranchRequisition::find($id);
        $stock_item = $request->stockItems;
        foreach ($stock_item as $value) {
            $stockItem = GreatLabCentralStock::where(['product_id' => $value['product_id']])->first();
            if ($stockItem) {
                $stockItem->stock = $stockItem->stock - $value['deliver'];
                $stockItem->update();
            }
            $stockOut = new GreatLabCentralStockOut();
            $stockOut->requisition_id = $id;
            $stockOut->product_id = $value['product_id'];
            $stockOut->branch_id = $req->branch_id;
            $stockOut->location_id = 0;
            $stockOut->name = $value['product']['name'];
            // $stockOut->manufacturer = $value['manufacturer'];
            $stockOut->quantity = $value['deliver'];
            $stockOut->price = $value['price'];
            $stockOut->save();
            $req_details = GreatLabBranchRequisitionDetails::where(['requisition_id' => $id, 'product_id' => $value['product_id']])->first();
            if ($req_details) {
                $req_details->central_pending = $req_details->quantity - ($value['deliver'] + $req_details->central_delivered);
                $req_details->central_delivered = $req_details->central_delivered + $value['deliver'];
                $req_details->update();
            }
        }
        $req->status = $request->status;
        $req->update();
        return response()->json(['status' => 200, 'message' => 'Great Lab Stock Out Updated Successfully']);
    }
    public function stockInToBranch(Request $request, $id)
    {
        $req = GreatLabBranchRequisition::find($id);
        $stock_item = $request->stockItems;
        foreach ($stock_item as $value) {
            foreach ($value['locations'] as $details) {
                $booth_stock = GreatLabStock::where(['product_id' => $value['product_id'], 'location_id' => $details['location'], 'branch_id' => $req->branch_id])->first();
                if ($booth_stock) {
                    $booth_stock->stock = $booth_stock->stock + $details['quantity'];
                    $booth_stock->price = $value['price'];
                    $booth_stock->update();
                } else {
                    $product = new GreatLabStock();
                    $product->branch_id = $req->branch_id;
                    $product->product_id = $value['product_id'];
                    $product->stock = $details['quantity'];
                    $product->price = $value['price'];
                    $product->vat = 0;
                    $product->name = $value['product']['name'];
                    $product->location_id = $details['location'];
                    $product->item_code = $value['product']['item_code'];
                    $product->opening_stock = $details['quantity'];
                    $product->save();
                }
                $req_details = GreatLabBranchRequisitionDetails::where(['requisition_id' => $id, 'product_id' => $value['product_id']])->first();
                if ($req_details) {
                    $req_details->pending_quantity = $req_details->quantity - ($details['quantity'] + $req_details->delivered_quantity);
                    $req_details->delivered_quantity = $req_details->delivered_quantity + $details['quantity'];
                    $req_details->update();
                }
            }
        }
        return response()->json(['status' => 200, 'message' => 'Great Lab Stock Out Updated Successfully']);
    }
    public function stockOutFromMain(Request $request, $id)
    {
        $req = GreatLabBoothRequision::find($id);
        $req->status = 'Delivered';
        $req->update();
        $stock_item = $request->stockItems;
        foreach ($stock_item as $value) {
            foreach ($value['locations'] as $details) {
                $stockItem = GreatLabStock::where([
                    'product_id' => $value['product_id'],
                    'location_id' => $details['location'],
                    'branch_id' => $req->branch_id
                ])->first();
                if ($stockItem) {
                    $stockItem->stock = $stockItem->stock - $details['quantity'];
                    $stockItem->update();
                }
                $stockOut = new GreatLabStockOut();
                $stockOut->invoice_id = $id;
                $stockOut->product_id = $value['product_id'];
                $stockOut->booth_id = $req->booth_id;
                $stockOut->branch_id = $req->branch_id;
                $stockOut->location_id = $details['location'];
                $stockOut->name = $value['product']['name'];
                // $stockOut->manufacturer = $value['manufacturer'];
                $stockOut->quantity = $details['quantity'];
                $stockOut->price = $value['price'];
                $stockOut->save();

                $req_details = GreatLabRequisitionDetails::where(['requisition_id' => $id, 'product_id' => $value['product_id']])->first();
                if ($req_details) {
                    $req_details->pending_quantity = $req_details->quantity - ($details['quantity'] + $req_details->delivered_quantity);
                    $req_details->delivered_quantity = $req_details->delivered_quantity + $details['quantity'];
                    $req_details->dispatched_quantity = $req_details->dispatched_quantity + $details['quantity'];
                    $req_details->update();
                }
            }
        }
        return response()->json(['status' => 200, 'message' => 'Great Lab Stock Out Updated Successfully']);
    }
    public function stockIntoBooth(Request $request, $id)
    {
        $req = GreatLabBoothRequision::find($id);
        // $stock_item = $request->stockItems;
        $req_details = GreatLabRequisitionDetails::where(['requisition_id' => $id])->get();
        foreach ($req_details as $value) {
            $booth_stock = GreatLabBoothStock::where(['booth_id' => $req->booth_id, 'product_id' => $value['product_id']])->first();
            if ($booth_stock) {
                $booth_stock->quantity = $booth_stock->quantity + $value['dispatched_quantity'];
                $booth_stock->update();
            } else {
                $product = GreatLabInventory::find($value['product_id']);
                $booth_stock = new GreatLabBoothStock();
                $booth_stock->booth_id = $req->booth_id;
                $booth_stock->product_id = $value['product_id'];
                $booth_stock->quantity = $value['dispatched_quantity'];
                $booth_stock->location_id = 0;
                $booth_stock->price = $value['price'];
                $booth_stock->name = $product->name;
                $booth_stock->save();
            }
            $req_details = GreatLabRequisitionDetails::where(['requisition_id' => $id, 'product_id' => $value['product_id']])->first();
            if ($req_details) {
                $req_details->dispatched_quantity = 0;
                $req_details->update();
            }
        }
        return response()->json(['status' => 200, 'message' => 'Great Lab Stock Out Updated Successfully']);
    }
}
