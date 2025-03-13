<?php

namespace App\Http\Controllers;

use App\Models\GreatLabPointRedeem;
use App\Models\PointsRedeemDetails;
use Illuminate\Http\Request;

class GreatLabPointRedeemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = GreatLabPointRedeem::with('details', 'doctor')->orderBy('id', 'desc')->get();
        $data->each(function ($planUser) {
            $totalPoints = 0;
        
            // Check if the details array is not empty
            if (!$planUser->details->isEmpty()) {
                // Loop through each detail for the current plan user
                $planUser->details->each(function ($detail) use (&$totalPoints) {
                    // Check if invoice relation exists and is not null
                    if ($detail->invoice && !$detail->invoice->details->isEmpty()) {
                        // Access the invoice details for each detail and sum up the points
                        $totalPoints += $detail->invoice->details->sum('point');
                    }
                });
            }
        
            // Update the total_point attribute for the current plan user
            $planUser->total_point = $totalPoints;
        });
        return response()->json($data);
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
        $redeem_no = GreatLabPointRedeem::max('id') + 1001;
        $plan = new GreatLabPointRedeem();
        $plan->redeem_no = $redeem_no;
        $plan->user_id = $request->user_id;
        $plan->total_point = $request->total_point;
        $plan->current_month_point = $request->current_month_point;
        $plan->due_point = $request->due_point;
        $plan->redeem_amount = $request->redeem_amount;
        $plan->billing_month = $request->billing_month;
        $plan->previous_due = $request->previous_due;
        $plan->redeem_by = $request->redeem_by;
        $plan->save();
        $details = $request->details;
        foreach ($details as $key => $value) {
            $detail = new PointsRedeemDetails();
            $detail->redeem_id = $plan->id;
            $detail->invoice_id = $value['id'];
            $detail->invoice_no = $value['invoiceNo'];
            $detail->save();
        }
        return response()->json($plan);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabPointRedeem  $greatLabPointRedeem
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $data = GreatLabPointRedeem::where('user_id', $id)->get();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabPointRedeem  $greatLabPointRedeem
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabPointRedeem $greatLabPointRedeem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabPointRedeem  $greatLabPointRedeem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GreatLabPointRedeem $greatLabPointRedeem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabPointRedeem  $greatLabPointRedeem
     * @return \Illuminate\Http\Response
     */
    public function destroy(GreatLabPointRedeem $greatLabPointRedeem)
    {
        //
    }
}
