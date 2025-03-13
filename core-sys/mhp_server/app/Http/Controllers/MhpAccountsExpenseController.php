<?php

namespace App\Http\Controllers;

use App\Models\MhpAccountsExpense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class MhpAccountsExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpAccountsExpense::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'expense' => $data,
            'message' => 'Data Retrieved Successfully',
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
        $data = new MhpAccountsExpense();
        $data->accounts_id = $request->accounts_id;
        $data->accounts_type_id = $request->accounts_type_id;
        $data->accounts_group_id = $request->accounts_group_id;
        $data->amount = $request->amount;
        $data->description = $request->description;
        $data->saas_branch_id = $request->saas_branch_id;
        $data->saas_branch_name = $request->saas_branch_name;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $data
        ]);
    }

    public function month_data(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpAccountsExpense::query();
        if ($branchData['super_admin'] == false) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $data = $query->orderBy('id', 'desc')->get();
        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $queryForMonth = clone $query;
            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Expense = $queryForMonth->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('amount');
            array_push($invoices, $monthly_income);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'all' => $data
        ]);
    }
    public function month_expense_amount()
    {

        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $invoice = MhpAccountsExpense::whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('amount');


            array_push($invoices, $invoice);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'expense' => $invoices,
        ]);
    }
    public function month_data_by_year($year, $group, $branch, Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpAccountsExpense::query();
        $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
        if ($branchData['super_admin'] == false) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        } else {
            if ($branch !== "null" && $branch !== null) {
                $query->where('saas_branch_id', $branch);
            }
        }
        if ($year !== "null" && $year !== null) {
            $query->whereRaw('YEAR(created_at) =' . $currentYear);
        }
        if ($group !== "null" && $group !== null) {
            $query->where('accounts_group_id', $group);
        }

        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $invoices = array();
        $allData = $query->get();
        foreach ($months as $key => $value) {
            $queryForMonth = clone $query;
            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Expense = $queryForMonth->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('amount');
            array_push($invoices, $monthly_income);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'all' => $allData
        ]);

        // if ($year !== 'null' && $group == 'null') {
        //     $allData = MhpAccountsExpense::whereRaw('YEAR(created_at) =' . $currentYear)->get();

        //     foreach ($months as $key => $value) {
        //         $invoice = MhpAccountsExpense::whereRaw('YEAR(created_at) =' . $currentYear)
        //             ->whereRaw('MONTH(created_at) =' . $key + 1)
        //             ->sum('amount');
        //         // ->get();

        //         $monthly_income = new stdClass();
        //         $monthly_income->name = $value;
        //         $monthly_income->Expense = $invoice;
        //         array_push($invoices, $monthly_income);
        //     }
        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'Data Added Successfully',
        //         'data' => $invoices,
        //         'all' => $allData
        //     ]);
        // } else if ($group !== 'null' && $year == 'null') {
        //     $invoices = array();
        //     $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        //     $allData = MhpAccountsExpense::where('accounts_group_id', $group)->get();
        //     foreach ($months as $key => $value) {
        //         $invoice = MhpAccountsExpense::where('accounts_group_id', $group)
        //             // ->whereRaw('YEAR(created_at) =' . $currentYear)
        //             ->whereRaw('MONTH(created_at) =' . $key + 1)
        //             ->sum('amount');
        //         // ->get();

        //         $monthly_income = new stdClass();
        //         $monthly_income->name = $value;
        //         $monthly_income->Expense = $invoice;
        //         array_push($invoices, $monthly_income);
        //     }
        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'Data Added Successfully',
        //         'data' => $invoices,
        //         'all' => $allData
        //     ]);
        // } else if ($year !== null && $group !== null) {
        //     $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
        //     $invoices = array();
        //     $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        //     $allData = MhpAccountsExpense::where('accounts_group_id', $group)
        //         ->whereRaw('YEAR(created_at) =' . $currentYear)
        //         ->get();
        //     foreach ($months as $key => $value) {
        //         $invoice = MhpAccountsExpense::where('accounts_group_id', $group)
        //             ->whereRaw('YEAR(created_at) =' . $currentYear)
        //             ->whereRaw('MONTH(created_at) =' . $key + 1)
        //             ->sum('amount');
        //         // ->get();

        //         $monthly_income = new stdClass();
        //         $monthly_income->name = $value;
        //         $monthly_income->Expense = $invoice;
        //         array_push($invoices, $monthly_income);
        //     }
        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'Data Added Successfully',
        //         'data' => $invoices,
        //         'all' => $allData
        //     ]);
        // }
    }
    public function expense_data_by_month($year, $month)
    {
        if ($year !== null && $month !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $allData = MhpAccountsExpense::whereRaw('YEAR(mhp_accounts_expenses.created_at) =' . $currentYear)
                ->whereRaw('MONTH(mhp_accounts_expenses.created_at) =' . $month)
                ->leftJoin('mhp_doctor_fee_names', 'mhp_accounts_expenses.accounts_group_id', '=', 'mhp_doctor_fee_names.id')
                ->leftJoin('mhp_accounts_types', 'mhp_accounts_expenses.accounts_type_id', '=', 'mhp_accounts_types.id')
                // ->leftJoin('mhp_patients', 'mhp_accounts_invoices.patient_id', '=', 'mhp_patients.id')->select('mhp_accounts_invoices.*', 'mhp_accounts_invoice_details.*', 'mhp_doctor_fee_names.*', 'mhp_patients.patient_first_name')
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
     * @param  \App\Models\MhpAccountsExpense  $mhpAccountsExpense
     * @return \Illuminate\Http\Response
     */
    public function show(MhpAccountsExpense $mhpAccountsExpense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpAccountsExpense  $mhpAccountsExpense
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpAccountsExpense $mhpAccountsExpense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpAccountsExpense  $mhpAccountsExpense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpAccountsExpense $mhpAccountsExpense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpAccountsExpense  $mhpAccountsExpense
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpAccountsExpense $mhpAccountsExpense)
    {
        //
    }
}
