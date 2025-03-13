<?php

namespace App\Http\Controllers;

use App\Models\GreatLabSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GreatLabSupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suppliers = GreatLabSupplier::orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'suppliers' => $suppliers]);
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
            'address' => 'required',
            'mobile' => 'required',
        ]);

        if ($validator->fails()) {
            $err = $validator->errors()->toArray();
            return response()->json([
                'message' => $err,
            ], 400);
        }
        $supplier_code = GreatLabSupplier::max('id') + 1001;
        $data = new GreatLabSupplier();
        $data->name = $request->name;
        $data->supplier_code = $supplier_code;
        $data->address = $request->address;
        $data->phone = $request->phone;
        $data->email = $request->email;
        $data->mobile = $request->mobile;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabSupplier  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function show(GreatLabSupplier $greatLabSupplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabSupplier  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabSupplier $greatLabSupplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabSupplier  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabSupplier::find($id);
        $data->name = $request->name;
        $data->address = $request->address;
        $data->phone = $request->phone;
        $data->email = $request->email;
        $data->mobile = $request->mobile;
        $data->save();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabSupplier  $greatLabSupplier
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabSupplier::find($id);
        $data->delete();
        return response()->json(['status' => 200, 'message' => 'Great Lab Supplier Deleted Successfully']);
    }
}
