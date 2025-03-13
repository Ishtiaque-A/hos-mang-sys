<?php

namespace App\Http\Controllers;

use App\Models\DocPointPlanAssign;
use App\Models\DoctorsLabPointsPlan;
use App\Models\DoctorsLabPointsPlanDetails;
use App\Models\DoctorsLabPointsPlanShares;
use App\Models\GreatLabPointRedeem;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpGreatLabInvoice;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DoctorsLabPointsPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DoctorsLabPointsPlan::orderBy('id', 'desc')->get();
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
        $plan = new DoctorsLabPointsPlan();
        $plan->title = $request->title;
        $plan->total_share = $request->total_percentage;
        // $plan->effective_date = $request->effective_date;
        // $plan->expiry_date = $request->expiry_date;
        // $plan->others = $request->others;
        $plan->save();
        $details = $request->details;
        foreach ($details as $key => $value) {
            $detail = new DoctorsLabPointsPlanDetails();
            $detail->plan_id = $plan->id;
            $detail->test_id = $value['id'];
            $detail->point_percentage = $value['point_amount'];
            $detail->point_amount = $value['total_point_amount'];
            $detail->save();
        }
        $share = $request->share;
        foreach ($share as $key => $value) {
            $share = new DoctorsLabPointsPlanShares();
            $share->plan_id = $plan->id;
            $share->plan_master_id = $value['id'];
            $share->share_percentage = $value['share'];
            $share->total_percentage = $request->total_percentage;
            $share->save();
        }
        return response()->json(['status' => 'success', 'message' => 'Lab Points Plan Created Successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DoctorsLabPointsPlan  $doctorsLabPointsPlan
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = DoctorsLabPointsPlan::with('details', 'shares')->where('id', $id)->first();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DoctorsLabPointsPlan  $doctorsLabPointsPlan
     * @return \Illuminate\Http\Response
     */
    public function assignPlan(Request $request)
    {
        $plan = DoctorsLabPointsPlan::where(['id' => $request->plan_id, 'status' => 1])->first();
        $exist = DocPointPlanAssign::where(['plan_id' => $request->plan_id, 'share_user_id' => $request->share_user_id])->first();
        $assignedOthers = DocPointPlanAssign::where(['share_user_id' => $request->share_user_id])->get();
        if ($exist) {
            return response()->json(['status' => 'error', 'message' => 'Already Assigned'], 400);
        }
        if (!$plan) {
            return response()->json(['status' => 'error', 'message' => 'Plan Not Found'], 400);
        }
        $data = new DocPointPlanAssign();
        $data->plan_id = $request->plan_id;
        $data->plan_master_id = $request->plan_master_id;
        $data->share_user_id = $request->share_user_id;
        $data->share_type = $request->share_type;
        $data->save();
        if (count($assignedOthers) > 0) {
            foreach ($assignedOthers as $key => $value) {
                $value->status = 0;
                $value->save();
            }
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DoctorsLabPointsPlan  $doctorsLabPointsPlan
     * @return \Illuminate\Http\Response
     */
    public function disablePlan($id)
    {
        $plan = DoctorsLabPointsPlan::where('id', $id)->first();
        $plan->status = 0;
        $plan->save();
        return response()->json($plan);
    }
    public function update(Request $request, DoctorsLabPointsPlan $doctorsLabPointsPlan)
    {
        //
    }

    public function planReport()
    {
        // $invoices = MhpGreatLabInvoice::whereNotNull('point_plan')->orderBy('id', 'desc')->get();
        // ->orderBy('id', 'desc')->get();
        $planUsers = DocPointPlanAssign::where(['status' => 1, 'share_type' => 'doctor'])
            ->with(['doctor'])
            ->with(['invoice'])
            // ->with('plan')
            ->withSum('redeem', 'redeem_amount')
            ->orderBy('id', 'desc')
            ->get();
        $planUsers->each(function ($planUser) {
            $planUser->total_point = $planUser->invoice->sum('details_sum_point');
            unset($planUser->invoice);
        });
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $planUsers
        ]);
    }
    public function pointReport($id)
    {
        $startOfPreviousMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfPreviousMonth = Carbon::now()->subMonth()->endOfMonth();
        $earliestDate = MhpGreatLabInvoice::min('created_at');
        $currentMonthStartDate = Carbon::now()->startOfMonth();
        $todayDate = Carbon::now();
        $planUsers = DocPointPlanAssign::where(['status' => 1, 'share_type' => 'doctor', 'share_user_id' => $id])
            ->with('invoice')
            ->orderBy('id', 'desc')
            ->first();

        $planUsers->total_point = $planUsers->invoice->sum('details_sum_point');
        unset($planUsers->invoice);

        $all_last_month = MhpGreatLabInvoice::where(['referrer' => $id])
            ->whereNotNull('point_plan')
            ->whereBetween('created_at', [$earliestDate, $endOfPreviousMonth])
            ->withSum('details', 'point')
            ->get();
        $history = MhpGreatLabInvoice::where(['referrer' => $id])
            ->with('details')
            ->whereNotNull('point_plan')
            ->whereBetween('created_at', [$startOfPreviousMonth, $endOfPreviousMonth])
            ->select('id', 'invoiceNo', 'referrer', 'point_plan', 'point_plan_master', 'point_share', 'point_amount', 'totalBill', 'created_at')
            ->get();
        $history->each(function ($h) {
            $h->total_point = $h->details->sum('point');
        });
        $current_month_point = $history->sum('total_point');
        $redeem = GreatLabPointRedeem::where(['user_id' => $id])
            ->sum('redeem_amount');
        $available = $all_last_month->sum('details_sum_point') - $redeem;
        $all_current_month = MhpGreatLabInvoice::where(['referrer' => $id])
            ->withSum('details', 'point')
            ->whereBetween('created_at', [$currentMonthStartDate, $todayDate])
            ->get();
        $due = $planUsers->total_point - ($current_month_point + $all_current_month->sum('details_sum_point'));
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $planUsers,
            "history" => $history,
            "current" => $current_month_point,
            'month' => $startOfPreviousMonth->format('F Y'),
            'month_only' => $startOfPreviousMonth->format('F'),
            'all_last_month' => $all_last_month->sum('details_sum_point'),
            'redeem' => $redeem,
            'available' => $available,
            'due' => $due,
        ]);
    }
    public function assignedDoctors()
    {
        $uniqueDocIds = DocPointPlanAssign::distinct()->pluck('share_user_id');
        $doctors = MhpDoctorsMaster::with('specialist', 'title', 'academic')
            ->whereIn('id', $uniqueDocIds)
            ->select('id', 'dr_given_name', 'dr_middle_name', 'dr_last_name', 'dr_identity_no', 'specialists_id', 'title', 'dr_work_phone', 'dr_dob', 'dr_address_line_1', 'dr_email')
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "doctors" => $doctors
        ]);
    }
    public function planReportDetails($id)
    {

        $planUsers = MhpGreatLabInvoice::where(['referrer' => $id])
            ->with('details')
            ->whereNotNull('point_plan')
            ->select('invoiceNo', 'referrer', 'totalBill', 'point_plan', 'point_share', 'point_amount', 'discount', 'specialDiscount', 'id', 'created_at')
            ->get();
        $planUsers->each(function ($planUser) {
            // $planUser->total_point = $planUser->details->sum('point');
            $planUser->total_discount = $planUser->discount + $planUser->specialDiscount;
        });
        $grand_total = $planUsers->sum('point_amount');
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $planUsers,
            "grand_total" => $grand_total
        ]);
    }
    public function filterPlanReport(Request $request, $id)

    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
        $planUsers = MhpGreatLabInvoice::whereBetween('created_at', [$startDate, $endDate])->where(['referrer' => $id])
            // ->whereBetween('created_at', [$startDate, $endDate])
            ->with('plan', 'details')
            ->whereNotNull('point_plan')
            ->select('invoiceNo', 'referrer', 'totalBill', 'point_plan', 'point_amount', 'point_plan_master', 'discount', 'specialDiscount', 'id', 'created_at', 'updated_at')
            ->get();
        $planUsers->each(function ($planUser) {
            // $planUser->total_point = $planUser->details->sum('point');
            $planUser->total_discount = $planUser->discount + $planUser->specialDiscount;
        });
        $grand_total = $planUsers->sum('point_amount');
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $planUsers,
            "grand_total" => $grand_total
        ]);
    }
    public function assignedPlan()

    {

        $planUsers = DocPointPlanAssign::with(['doctor', 'plan'])
            ->get();

        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "plan" => $planUsers
        ]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DoctorsLabPointsPlan  $doctorsLabPointsPlan
     * @return \Illuminate\Http\Response
     */
    public function destroy(DoctorsLabPointsPlan $doctorsLabPointsPlan)
    {
        //
    }
}
