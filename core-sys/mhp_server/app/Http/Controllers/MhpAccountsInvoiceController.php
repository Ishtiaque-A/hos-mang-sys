<?php

namespace App\Http\Controllers;

use App\Models\MhpAccountsInvoice;
use App\Models\MhpAccountsInvoiceDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class MhpAccountsInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpAccountsInvoice::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'invoice' => $data,
            'message' => 'Data Retrieved Successfully',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // return $request->all();
        $data = new MhpAccountsInvoiceDetails();
        $data->invoice_id = $request->invoice_id;
        $data->item_name = $request->item_name;
        $data->account_group_id = $request->account_group_id;
        $data->item_id = $request->item_id;
        $data->account_group_name = $request->account_group_name;
        $data->account_type_id = $request->account_type_id;
        $data->account_id = $request->account_id;
        $data->saas_branch_id = $request->saas_branch_id;
        $data->saas_branch_name = $request->saas_branch_name;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'details' => $data
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
        $data = new MhpAccountsInvoice();
        $data->patient_id = $request->patient_id;
        $data->amount = $request->amount;
        $data->payment_method = $request->payment_method;
        $data->invoice_number = $request->invoice_number;
        $data->saas_branch_id = $request->saas_branch_id;
        $data->saas_branch_name = $request->saas_branch_name;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'invoice' => $data,
        ]);
    }
    public function month_data(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpAccountsInvoice::query();
        if ($branchData['super_admin'] == false) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $data = $query->orderBy('id', 'desc')->get();
        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $queryForMonth = clone $query;
            $monthlyIncome = new stdClass();
            $monthlyIncome->name = $value;
            $monthlyIncome->Income = $queryForMonth->whereYear('created_at', $currentYear)
                ->whereMonth('created_at', $key + 1)
                ->sum('amount');
            array_push($invoices, $monthlyIncome);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'all' => $data
        ]);
    }
    public function only_income_amount()
    {

        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $invoice = MhpAccountsInvoice::whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('amount');

            // $monthly_income = new stdClass();
            // $monthly_income->name = $value;
            // $monthly_income->Income = $invoice;
            array_push($invoices, $invoice);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'income' => $invoices,
        ]);
    }
    public function month_data_by_year($year, $group, $branch, Request $request)
    {
        $baseQuery = MhpAccountsInvoice::query();
        $branchData = getBranchData($request->header());

        if (!$branchData['super_admin']) {
            $baseQuery->where('saas_branch_id', $branchData['branch_id']);
        } elseif ($branch !== 'null' && $branch !== null) {
            $baseQuery->where('saas_branch_id', $branch);
        }

        if ($year !== 'null' && $group !== null) {
            $baseQuery->whereYear('created_at', $year);
        }

        if ($group !== 'null' && $year == 'null') {
            $baseQuery->whereHas('details', function ($query) use ($group) {
                $query->where('account_group_id', $group);
            });
        }

        $invoices = [];
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $allData = $baseQuery->get();

        foreach ($months as $key => $value) {
            $queryForMonth = clone $baseQuery;
            $queryForMonth->whereMonth('created_at', $key + 1);

            if ($group !== 'null' && $year == 'null') {
                $queryForMonth->whereHas('details', function ($query) use ($group) {
                    $query->where('account_group_id', $group);
                });
            }

            $invoice = $queryForMonth->sum('amount');

            $monthlyIncome = new stdClass();
            $monthlyIncome->name = $value;
            $monthlyIncome->Income = $invoice;
            array_push($invoices, $monthlyIncome);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'all' => $allData
        ]);
    }


    public function month_data_by_year_month($year, $month)
    {
        if ($year !== null && $month !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $allData = DB::table('mhp_accounts_invoices')->leftJoin('mhp_accounts_invoice_details', 'mhp_accounts_invoices.id', '=', 'mhp_accounts_invoice_details.invoice_id')
                ->whereRaw('YEAR(mhp_accounts_invoices.created_at) =' . $currentYear)
                ->whereRaw('MONTH(mhp_accounts_invoices.created_at) =' . $month)
                ->leftJoin('mhp_doctor_fee_names', 'mhp_accounts_invoice_details.account_group_id', '=', 'mhp_doctor_fee_names.id')
                ->leftJoin('mhp_patients', 'mhp_accounts_invoices.patient_id', '=', 'mhp_patients.id')->select('mhp_accounts_invoices.*', 'mhp_accounts_invoice_details.*', 'mhp_doctor_fee_names.*', 'mhp_patients.patient_first_name')
                ->get();

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $allData
            ]);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpAccountsInvoice  $mhpAccountsInvoice
     * @return \Illuminate\Http\Response
     */
    public function show(MhpAccountsInvoice $mhpAccountsInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpAccountsInvoice  $mhpAccountsInvoice
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpAccountsInvoice $mhpAccountsInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpAccountsInvoice  $mhpAccountsInvoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpAccountsInvoice $mhpAccountsInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpAccountsInvoice  $mhpAccountsInvoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpAccountsInvoice $mhpAccountsInvoice)
    {
        //
    }
}
