<?php

namespace App\Http\Controllers;

use App\Models\GreatLabBranchRequisition;
use App\Models\GreatLabBranchRequisitionDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class GreatLabBranchRequisitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $booths = GreatLabBranchRequisition::with('details')->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'booths' => $booths]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function requisitionNo()
    {
        $requisition_no = GreatLabBranchRequisition::max('id') + 1001;
        return response()->json(['status' => 200, 'requisition_no' => $requisition_no]);
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
            'requisition_no' => 'required|unique:great_lab_branch_requisitions,requisition_no',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err,
            ], 400);
        }
        $data = new GreatLabBranchRequisition();
        $data->branch_id = $request->branch_id;
        $data->branch_name = $request->branch_name;
        $data->requisition_no = $request->requisition_no;
        $data->status = "Pending";
        $data->requisitor_name = $request->requisitor;
        $data->date = $request->date;
        $data->remarks = $request->remarks;
        $data->save();
        $products = $request->products;
        foreach ($products as $key => $value) {
            $product = new GreatLabBranchRequisitionDetails();
            $product->requisition_id = $data->id;
            $product->product_id = $value['id'];
            $product->quantity = $value['quantity'];
            $product->pending_quantity = $value['quantity'];
            $product->price = $value['mrp'];
            $product->save();
        }
        return response()->json(['status' => 200, 'message' => 'Data Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabBranchRequisition  $GreatLabBranchRequisition
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = GreatLabBranchRequisition::with('details')->find($id);
        return response()->json(['status' => 200, 'data' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabBranchRequisition  $GreatLabBranchRequisition
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabBranchRequisition $GreatLabBranchRequisition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabBranchRequisition  $GreatLabBranchRequisition
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabBranchRequisition::find($id);
        $data->requisition_no = $request->requisition_no;
        $data->status = $request->status;
        $data->requisitor_name = $request->requisitor;
        $data->remarks = $request->remarks;
        $data->date = $request->date;
        $data->update();
        $products = $request->products;
        foreach ($products as $key => $value) {
            $exist_product = GreatLabBranchRequisitionDetails::where('requisition_id', $data->id)
                ->where('id', $value['id'])->first();
            if ($exist_product) {
                $exist_product->quantity = $value['quantity'];
                $exist_product->pending_quantity = $value['quantity'];
                $exist_product->price = $value['price'];
                $exist_product->save();
            } else {
                $product = new GreatLabBranchRequisitionDetails();
                $product->requisition_id = $data->id;
                $product->product_id = $value['id'];
                $product->quantity = $value['quantity'];
                $product->pending_quantity = $value['quantity'];
                $product->price = $value['mrp'];
                $product->save();
            }
        }
        return response()->json(['status' => 200, 'message' => 'Data Added Successfully']);
    }
    public function deleteReqDetails($id)
    {
        $data = GreatLabBranchRequisitionDetails::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Data Deleted Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabBranchRequisition  $GreatLabBranchRequisition
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabBranchRequisition::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Data Deleted Successfully']);
    }
}
