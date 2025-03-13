<?php

namespace App\Http\Controllers;

use App\Models\MhpLabAgentExpense;
use App\Models\MhpLabAgentInvoice;
use App\Models\MhpLabAgentInvoiceDetails;
use App\Models\MhpLabAgentReportDeliveryInfo;
use App\Models\MhpLabAgentMoneRecipt;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class MhpLabAgentInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $data = MhpLabAgentInvoice::with('patient', 'tests')->find($id);
        return response()->json([
            "status" => 200,
            "message" => "Single invoice",
            "invoice" => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = new MhpLabAgentInvoice();
        $branchData = getBranchData($request->header());
        if (!$branchData['super_admin']) {
            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        } else {
            $data->saas_branch_id = $request->saas_branch_id;
            $data->saas_branch_name = $request->saas_branch_name;
        }
        $invoiceNo = MhpLabAgentInvoice::max('id') + 100001;
        $data->invoiceNo = $invoiceNo;
        $data->patient_id = $request->patient_id;
        $data->patient_first_name = $request->patient_first_name;
        $data->patient_mobile_phone = $request->patient_mobile_phone;
        $data->referredBy = $request->referredBy;
        $data->referrer = $request->referrer;
        $data->paymentMethod = $request->paymentMethod;
        $data->paymentOption = $request->paymentOption;
        $data->cardNumber = $request->cardNumber;
        $data->expireDate = $request->expireDate;
        $data->digitalPaymentNumber = $request->digitalPaymentNumber;
        $data->totalBill = $request->totalBill;
        $data->deliveryDate = $request->deliveryDate;
        $data->deliveryTime = $request->deliveryTime;
        $data->due = $request->due;
        $data->paidAmount = $request->paidAmount;
        $data->specialDiscount = $request->specialDiscount;
        $data->deliveryStatus = $request->deliveryStatus;
        $data->reportReadyStatus = $request->reportReadyStatus;
        $data->reportCollectionStatus = $request->reportCollectionStatus;
        $data->sampleCollectionStatus = $request->sampleCollectionStatus;
        $data->sampleCollectionDate = $request->sampleCollectionDate;
        $data->save();

        $tests = $request->tests;
        foreach ($tests as $key => $test) {
            $detail = new MhpLabAgentInvoiceDetails();
            $detail->invoiceNo = $data->invoiceNo;
            $detail->testName = $test['test_name'];
            $detail->testCode = $test['id'];
            $detail->fee = $test['fee'];
            $desc = ($test['discount'] * floatval($test['fee'])) / 100;
            $detail->discount = $desc ? $desc : 0;
            $detail->testCategory = $test['group']['test_group_name'];
            $detail->test_category_id = $test['test_category_id'];
            $detail->save();
        }

        return response()->json([
            "status" => 200,
            "message" => "Invoice created successfully",
            "invoice" => $data
        ]);
    }

    // update invoice
    public function updateInvoiceSampleCollection(Request $request, $id)
    {
        $data = MhpLabAgentInvoice::find($id);
        $data->sampleCollectionDate = $request->sampleCollectionDate;
        $data->remarkForSampleCollection = $request->remarkForSampleCollection;
        $data->sampleReceiverToLabRemark = $request->sampleReceiverToLabRemark;
        $data->reportReceiverFromLabRemark = $request->reportReceiverFromLabRemark;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Invoice Updated successfully",
            "invoice" => $data
        ]);
    }
    public function approveSampleCollection(Request $request, $id)
    {
        $data = MhpLabAgentInvoice::find($id);
        $data->isApprovedInSampleCollection = $request->isApprovedInSampleCollection;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Sample approved successfully",
            "invoice" => $data
        ]);
    }
    public function approveSendToLab(Request $request, $id)
    {
        $data = MhpLabAgentInvoice::find($id);
        $data->isApprovedInSendToLab = $request->isApprovedInSendToLab;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Sample approved successfully",
            "invoice" => $data
        ]);
    }
    public function approveReceiveReport(Request $request, $id)
    {
        $data = MhpLabAgentInvoice::find($id);
        $data->isApprovedInReceiveFromLab = $request->isApprovedInReceiveFromLab;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Receive report approved successfully",
            "invoice" => $data
        ]);
    }
    public function payDueAmount(Request $request, $id)
    {
        $data = MhpLabAgentInvoice::find($id);
        $data->paidAmount = $request->paidAmount;
        $data->due = $request->due;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Paid successfully",
            "invoice" => $data
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
        $header = $request->header();
        $branchData = getBranchData($header);
        $data = new MhpLabAgentInvoiceDetails();
        $data->invoiceNo = $request->invoiceNo;
        $data->saas_branch_id = $branchData['branch_id'];
        $data->saas_branch_name = $branchData['branch_name'];
        $data->testName = $request->testName;
        $data->testCode = $request->testCode;
        $data->fee = $request->fee;
        $data->discount = $request->discount;
        $data->collector = $request->collector;
        $data->remark = $request->remark;
        $data->collectionDate = $request->collectionDate;
        $data->testCategory = $request->testCategory;
        $data->test_category_id = $request->test_category_id;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Invoice details created successfully",
            "invoice" => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpLabAgentInvoice  $mhpLabAgentInvoice
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $branchData = getBranchData($request->header());
        $query = MhpLabAgentInvoice::query();
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $data = $query->with('patient', 'tests')->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $data
        ]);
    }


    public function invoiceDetails($invoiceNo)
    {
        $data = MhpLabAgentInvoiceDetails::where('invoiceNo', $invoiceNo)->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $data
        ]);
    }
    //invoice search by date 
    public function searchByDateRange(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = MhpLabAgentInvoice::whereBetween('created_at', [$startDate, $endDate])->with('patient', 'tests')->orderBy('id', 'desc')->get();
        // $data = MhpLabAgentInvoice::whereBetween('created_at', [$request->startDate,$request->endDate])->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "data" => $data
        ]);
    }
    // edit test
    public function editTest($id)
    {
        $data = MhpLabAgentInvoiceDetails::find($id);
        return response()->json([
            "status" => 200,
            "message" => "Test",
            "test" => $data
        ]);
    }
    // update test
    public function updateTest(Request $request, $id)
    {
        $data = MhpLabAgentInvoiceDetails::find($id);
        $data->collector = $request->collector;
        $data->remark = $request->remark;
        $data->collectionStatus = $request->collectionStatus;
        $data->collectionDate = $request->collectionDate;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test sample collected successfully",
            "test" => $data
        ]);
    }
    //sample sent to lab
    public function updateTestForLab(Request $request, $id)
    {
        $data = MhpLabAgentInvoiceDetails::find($id);
        $data->sampleReceiverToLab = $request->sampleReceiverToLab;
        $data->sampleReceiverToLabDate = $request->sampleReceiverToLabDate;
        $data->sampleReceiverToLabTime = $request->sampleReceiverToLabTime;
        $data->sampleReceiverToLabRemark = $request->sampleReceiverToLabRemark;
        $data->sampleReceiverToLabPhoneNo = $request->sampleReceiverToLabPhoneNo;
        $data->sampleCarrierToLab = $request->sampleCarrierToLab;
        $data->sentToLabStatus = $request->sentToLabStatus;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test sample sent successfully",
            "test" => $data
        ]);
    }
    // report collection from lab
    public function updateTestForReport(Request $request, $id)
    {
        $data = MhpLabAgentInvoiceDetails::find($id);
        $data->reportReceiverFromLab = $request->reportReceiverFromLab;
        $data->reportReceiverFromLabDate = $request->reportReceiverFromLabDate;
        $data->reportReceiverFromLabTime = $request->reportReceiverFromLabTime;
        $data->reportReceiverFromLabRemark = $request->reportReceiverFromLabRemark;
        $data->reportReceiverFromLabPhoneNo = $request->reportReceiverFromLabPhoneNo;
        $data->reportCollectionStatus = $request->reportCollectionStatus;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test report received successfully",
            "test" => $data
        ]);
    }
    // report delivery to patient
    public function updateForDelivery(Request $request, $id)
    {
        $data = MhpLabAgentInvoiceDetails::find($id);
        $data->deliveryStatus = $request->deliveryStatus;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test report updated successfully",
            "test" => $data
        ]);
    }

    // delivery details 

    public function saveDeliveryInfo(Request $request)
    {
        if ($files = $request->file('fileUpload')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }
        $header = $request->header();
        $branchData = getBranchData($header);
        $data = new MhpLabAgentReportDeliveryInfo();
        if ($branchData['super_admin'] == false) {

            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        } else {
            $data->saas_branch_id = $request->saas_branch_id;
            $data->saas_branch_name = $request->saas_branch_name;
        }
        $data->invoiceNo = $request->invoiceNo;
        $data->patient_id = $request->patient_id;
        $data->deliveryTime = $request->deliveryTime;
        $data->deliveryDate = $request->deliveryDate;
        $data->fileUpload = $request->name;
        $data->followUpDate = $request->followUpDate;
        $data->followUpComment = $request->followUpComment;
        $data->testList = $request->testList;
        $data->collectedBy = $request->collectedBy;
        $data->remark = $request->remark;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Delivery Info saved successfully",
            "invoice" => $data
        ]);
    }
    public function allDeliveryInfo(Request $request)
    {
        $header = $request->header();
        $branchData = getBranchData($header);
        $query = MhpLabAgentReportDeliveryInfo::query();
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $data = $query->with('invoice', 'patient')->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All delivery info",
            "delivery" => $data
        ]);
    }

    // delivery info by date
    public function deliveryInfoByDateRange(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = MhpLabAgentReportDeliveryInfo::whereBetween('created_at', [$startDate, $endDate])->with('patient', 'invoice')->orderBy('id', 'desc')->get();
        // $data = MhpLabAgentInvoice::whereBetween('created_at', [$request->startDate,$request->endDate])->get();
        return response()->json([
            "status" => 200,
            "message" => "All Delivery Info",
            "delivery" => $data
        ]);
    }


    public function createMoneyReceipt(Request $request)
    {
        $branchData = getBranchData($request->header());
        $data = new MhpLabAgentMoneRecipt();
        if ($branchData['super_admin'] == false) {
            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        } else {
            $data->saas_branch_id = $request->saas_branch_id;
            $data->saas_branch_name = $request->saas_branch_name;
        }
        $data->money_receipt_number = $request->money_receipt_number;
        $data->hn_number = $request->hn_number;
        $data->name = $request->name;
        $data->invoice_number = $request->invoice_number;
        $data->requested_amount = $request->requested_amount;
        $data->paid_amount = $request->paid_amount;
        $data->payment_date = $request->payment_date;
        $data->payment_time = $request->payment_time;
        $data->payment_method = $request->payment_method;
        $data->total_amount_paid = $request->total_amount_paid;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Money receipt created successfully",
            "receipt" => $data
        ]);
    }
    public function allMoneyReceipt()
    {
        // return $request->all();
        $data = MhpLabAgentMoneRecipt::orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All Money Receipt",
            "receipt" => $data
        ]);
    }
    // Money receipt by date range
    public function moneyReceiptByDateRange(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = MhpLabAgentMoneRecipt::whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'desc')->get();
        // $data = MhpLabAgentInvoice::whereBetween('created_at', [$request->startDate,$request->endDate])->get();
        return response()->json([
            "status" => 200,
            "message" => "All Delivery Info",
            "receipt" => $data
        ]);
    }

    //income api //
    public function lab_invoice_month_data(Request $request)

    {
        $header = $request->header();
        $branchData = getBranchData($header);
        $query = MhpLabAgentInvoice::query();
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $data = $query->with('patient', 'tests', 'reports')->orderBy('id', 'desc')->count();
        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $logInfo = array();
        foreach ($months as $key => $value) {
            $queryForChart = $query->clone();
            $queryForChart->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . ($key + 1));

            if (!$branchData['super_admin']) {
                $queryForChart->where('saas_branch_id', $branchData['branch_id']);
            }

            $invoice = $queryForChart->sum('totalBill');

            // Add debugging information
            $queryForChartSql = $queryForChart->toSql();
            $queryForChartBindings = $queryForChart->getBindings();
            $debugInfo = [
                'month' => $value,
                'query_sql' => $queryForChartSql,
                'query_bindings' => $queryForChartBindings,
                'invoice_amount' => $invoice,
            ];
            array_push($logInfo, $debugInfo);

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice;
            array_push($invoices, $monthly_income);
        }


        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $invoices,
            "log_info" => $logInfo,
            "all" => $data
        ]);
    }

    public function lab_invoice_month_data_by_year($year, $branch, Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpLabAgentInvoice::query();
        if (!$branchData["super_admin"]) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        if ($branch !== null) {
            $query->where('saas_branch_id', $branch);
        }
        $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $allData = $query->whereRaw('YEAR(created_at) =' . $currentYear)->count();
        foreach ($months as $key => $value) {
            $queryForChart = $query->clone();
            $invoice = $queryForChart->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('totalBill');

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice;
            array_push($invoices, $monthly_income);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'all' => $allData
        ]);
    }

    public function month_data_by_year_month($year, $month, $categroy)
    {
        if ($year !== null && $month !== null &&  $categroy == 'null') {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $allData = MhpLabAgentInvoiceDetails::whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $month)
                ->get();

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $allData
            ]);
        } else if ($year !== null && $month !== null &&  $categroy !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $allData = MhpLabAgentInvoiceDetails::whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $month)
                ->whereRaw('test_category_id =' . $categroy)
                ->get();

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $allData
            ]);
        }
    }
    public function month_data_by_year_search($year, $category, $test, $branch, Request $request)
    {
        $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
        $invoices = [];
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $branchData = getBranchData($request->header());
        foreach ($months as $key => $value) {
            $query = MhpLabAgentInvoiceDetails::whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . ($key + 1));

            if ($category !== 'null') {
                $query->where('test_category_id', '=', $category);
            }

            if ($test !== 'null') {
                $query->where('testCode', '=', $test);
            }
            if ($branch !== 'null') {
                $query->where('saas_branch_id', '=', $branch);
            }
            if (!$branchData['super_admin']) {
                $query->where('saas_branch_id', '=', $branchData['branch_id']);
            }

            $invoice = $query->sum('fee');
            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice - ($invoice * 10 / 100);
            array_push($invoices, $monthly_income);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'all' => $invoices
        ]);
    }
    //income api //
    //expense api
    public function save_lab_expense(Request $request)
    {
        $data = new MhpLabAgentExpense();
        $branchData = getBranchData($request->header());
        if (!$branchData['super_admin']) {
            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        } else {
            $data->saas_branch_id = $request->saas_branch_id;
            $data->saas_branch_name = $request->saas_branch_name;
        }
        $data->accounts_id = $request->accounts_id;
        $data->accounts_type_id = $request->accounts_type_id;
        $data->accounts_group_id = $request->accounts_group_id;
        $data->amount = $request->amount;
        $data->description = $request->description;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $data
        ]);
    }

    public function lab_expense_month_data(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpLabAgentExpense::query();
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }

        $currentYear = Carbon::now()->format('Y');
        $data = $query->orderBy('id', 'desc')->count();
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $logInfo = array();
        foreach ($months as $key => $value) {
            $queryForChart = $query->clone();
            $queryForChart->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . ($key + 1));

            if (!$branchData['super_admin']) {
                $queryForChart->where('saas_branch_id', $branchData['branch_id']);
            }

            $invoice = $queryForChart->sum('amount');

            // Add debugging information
            $queryForChartSql = $queryForChart->toSql();
            $queryForChartBindings = $queryForChart->getBindings();
            $debugInfo = [
                'month' => $value,
                'query_sql' => $queryForChartSql,
                'query_bindings' => $queryForChartBindings,
                'invoice_amount' => $invoice,
            ];
            array_push($logInfo, $debugInfo);

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice;
            array_push($invoices, $monthly_income);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'log_info' => $logInfo,
            'all' => $data
        ]);
    }
    public function month_expense_amount()
    {

        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $invoice = MhpLabAgentExpense::whereRaw('YEAR(created_at) =' . $currentYear)
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
    public function lab_expense_month_data_by_year($year, $group, $branch, Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpLabAgentExpense::query();
        $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (!$branchData["super_admin"]) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        if ($branch !== 'null' && $branchData['super_admin']) {
            $query->where('saas_branch_id', $branch);
        }
        if ($group !== 'null') {
            $query->where('accounts_group_id', $group);
        }
        if ($year !== 'null') {
            $query->whereRaw('YEAR(created_at) =' . $currentYear);
        }

        $allData = $query->get()->count();
        foreach ($months as $key => $value) {
            // Clone the original query before modifying it inside the loop
            $queryForChart = clone $query;
            $invoice = $queryForChart->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . ($key + 1))
                ->sum('amount');

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice;
            array_push($invoices, $monthly_income);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'data' => $invoices,
            'all' => $allData,
            'query' => $query->toSql()
        ]);
    }


    public function expense_data_by_month($year, $month)
    {
        if ($year !== null && $month !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $allData = MhpLabAgentExpense::with('accounts_group', 'accounts_type')
                ->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $month)
                ->get();

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $allData
            ]);
        }
    }
    //expense api

}
