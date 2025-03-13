<?php

namespace App\Http\Controllers;

use App\Models\DocPointPlanAssign;
use App\Models\DoctorsLabPointsPlanDetails;
use App\Models\DoctorsLabPointsPlanShares;
use App\Models\EyeGlassPrescription;
use App\Models\GreatLabBoothStock;
use App\Models\GreatLabBoothStockOut;
use App\Models\GreatLabInventory;
use App\Models\GreatLabInvoiceInventory;
use App\Models\GreatLabStock;
use App\Models\GreatLabStockOut;
use App\Models\MhpAccountsInvoice;
use App\Models\MhpBirthSex;
use App\Models\MhpDoctor;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpGreatLabExpense;
use App\Models\MhpGreatLabInvoice;
use App\Models\MhpGreatLabInvoiceDetails;
use App\Models\MhpGreatLabReportDeliveryInfo;
use App\Models\MhpGreatLabMoneRecipt;
use App\Models\MhpGreatLabReport;
use App\Models\MhpGreatLabReportDetails;
use App\Models\MhpLabCenterDetails;
use App\Models\MhpLabModuleTestCatgeory;
use App\Models\MhpNewLabModuleTestName;
use App\Models\MhpPatient;
use App\Models\PtnBloodGroup;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Hamcrest\Arrays\IsArray;
use Illuminate\Support\Facades\DB;
use stdClass;

class MhpGreatLabInvoiceController extends Controller
{

    public function masterSetupData(Request $request, $id)
    {
        $gender = MhpBirthSex::where('delete_status', 0)->orderBy('id', 'desc')->get();
        $blood_group = PtnBloodGroup::where('delete_status', 0)->orderBy('id', 'desc')->get();
        $inventories = GreatLabInventory::orderBy('id', 'desc')->get();
        $test_name = MhpNewLabModuleTestName::with('category', 'group', 'subCategory', 'parameter', 'accounts', 'accounts_group', 'accounts_type')->orderBy('id', 'desc')->get();

        $header = $request->header();
        $branchData = getBranchData($header);
        $doctors = [];
        if ($branchData['super_admin'] == false) {
            $doctors = MhpDoctorsMaster::where('saas_branch_id', $branchData['branch_id'])->with('title', 'birth_sex', 'usual_provider', 'department', 'specialist', 'academic')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        } else {
            $doctors = MhpDoctorsMaster::with('title', 'birth_sex', 'usual_provider', 'department', 'specialist', 'academic')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        }

        $user = null;
        if (isset($id)) {
            $user = User::find($id);
        }

        $test_category = MhpLabModuleTestCatgeory::with('testGroup')->orderBy('test_category_name', 'asc')->get();
        $center = MhpLabCenterDetails::with('city', 'country')->orderBy('id', 'desc')->first();


        return response()->json([
            "status" => 200,
            "message" => "Master setup data",
            "gender" => $gender,
            "blood_group" => $blood_group,
            "inventories" => $inventories,
            "test_name" => $test_name,
            'doctors' => $doctors,
            'user' => $user,
            'test_category' => $test_category,
            'center' => $center
        ]);
    }

    public function index($id)
    {
        $data = MhpGreatLabInvoice::with('patient', 'tests')->find($id);
        return response()->json([
            "status" => 200,
            "message" => "Single invoice",
            "invoice" => $data
        ]);
    }

    public function search($invoice)
    {
        $data = MhpGreatLabInvoice::with('patient', 'tests', 'money_recipts')->where('invoiceNo', $invoice)->first();
        return response()->json([
            "status" => 200,
            "message" => "Single invoice",
            "invoice" => $data
        ]);
    }

    public function searchByPhone($searchTerm)
    {
        $data = MhpGreatLabInvoice::with('patient', 'tests', 'money_recipts', 'doctor')
            ->Where('patient_mobile_phone', 'like', '%' . $searchTerm . '%')
            ->orwhere('patient_first_name', 'like', '%' . $searchTerm . '%')
            ->orWhere('invoiceNo', 'like', '%' . $searchTerm . '%')
            ->get();

        return response()->json([
            "status" => 200,
            "message" => "Search invoice",
            "invoice" => $data
        ]);
    }



    /**
     * Create a new invoice.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $assigned_plan = $this->getAssignedPlan($request->referrer);
        $plan_share = $assigned_plan ? $this->getPlanShare($assigned_plan) : null;

        $header = $request->header();
        $branchData = $this->getBranchData($header);
        $shift = $this->currentShift();
        $invoice = $this->createInvoiceRecord($request, $branchData, $assigned_plan, $plan_share, $shift);
        $this->createInvoiceInventory($request->inventoryItems, $invoice->id);
        $this->createInvoiceDetails($request->tests, $invoice->invoiceNo, $request->referrer, $assigned_plan);

        return response()->json([
            "status" => 200,
            "message" => "Invoice created successfully",
            "invoice" => $invoice
        ]);
    }

    private function getAssignedPlan($referrer)
    {
        if ($referrer) {
            return DocPointPlanAssign::where(['share_user_id' => $referrer, 'status' => 1])->first();
        }
        return null;
    }

    private function getPlanShare($assigned_plan)
    {
        return DoctorsLabPointsPlanShares::where([
            'plan_id' => $assigned_plan->plan_id,
            'plan_master_id' => $assigned_plan->plan_master_id
        ])->first();
    }

    private function getBranchData($header)
    {
        return getBranchData($header);
    }

    private function createInvoiceRecord($request, $branchData, $assigned_plan, $plan_share, $shift)
    {
        $invoice = new MhpGreatLabInvoice();
        $invoice->invoiceNo = MhpGreatLabInvoice::max('id') + 100001;

        if (!$branchData['super_admin']) {
            $invoice->saas_branch_id = $branchData['branch_id'];
            $invoice->saas_branch_name = $branchData['branch_name'];
        } else {
            $invoice->saas_branch_id = $request->saas_branch_id;
            $invoice->saas_branch_name = $request->saas_branch_name;
        }

        $this->populateInvoiceData($invoice, $request);

        if ($request->referrer && $assigned_plan && $plan_share) {
            $invoice->point_plan = $assigned_plan->id;
            $invoice->point_plan_master = $assigned_plan->plan_master_id;
            $invoice->point_share = $plan_share->share_percentage;
            $invoice->point_amount = ($request->totalBill - $request->discount - $request->specialDiscount) * $plan_share->share_percentage / 100;
        }

        if ($shift) {
            $invoice->shift_id = $shift->id;
        }

        $invoice->save();
        return $invoice;
    }

    private function populateInvoiceData($invoice, $request)
    {
        $invoice->patient_id = $request->patient_id;
        $invoice->patient_first_name = $request->patient_first_name;
        $invoice->patient_mobile_phone = $request->patient_mobile_phone;
        $invoice->referredBy = $request->referredBy;
        $invoice->referrer = $request->referrer;
        $invoice->paymentMethod = $request->paymentMethod;
        $invoice->paymentOption = $request->paymentOption;
        $invoice->cardNumber = $request->cardNumber;
        $invoice->expireDate = $request->expireDate;
        $invoice->digitalPaymentNumber = $request->digitalPaymentNumber;
        $invoice->totalBill = $request->totalBill;
        $invoice->deliveryDate = $request->deliveryDate;
        $invoice->deliveryTime = $request->deliveryTime;
        $invoice->due = $request->due;
        $invoice->discount = $request->discount;
        $invoice->paidAmount = $request->paidAmount - $request->returnAmount;
        $invoice->specialDiscount = $request->specialDiscount;

        $invoice->discount_percentage = $request->discount_percentage;

        $invoice->deliveryStatus = $request->deliveryStatus;
        $invoice->reportReadyStatus = $request->reportReadyStatus;
        $invoice->reportCollectionStatus = $request->reportCollectionStatus;
        $invoice->sampleCollectionStatus = $request->sampleCollectionStatus;
        $invoice->sampleCollectionDate = $request->sampleCollectionDate;
        $invoice->created_by = $request->created_by;
        $invoice->created_by_id = $request->created_by_id;
        $invoice->marketer = $request->marketer;
    }

    private function currentShift()
    {

        $currentTime = Carbon::now()->format('H:i:s');

        // Retrieve all shifts with active status
        $shifts = DB::table('lab_shifts')
            ->where('status', 1) // Assuming 1 means active
            ->get();

        foreach ($shifts as $shift) {
            $startTime = Carbon::parse($shift->start_time);
            $endTime = Carbon::parse($shift->end_time);

            // Check if the shift spans midnight
            if ($endTime->lessThan($startTime)) {
                // If it spans midnight, check if current time is after start or before end
                if ($currentTime >= $startTime->format('H:i:s') || $currentTime <= $endTime->format('H:i:s')) {
                    return $shift;
                }
            } else {
                // Regular shift (does not span midnight)
                if ($currentTime >= $startTime->format('H:i:s') && $currentTime <= $endTime->format('H:i:s')) {
                    return $shift;
                }
            }
        }
        return null;
    }

    private function createInvoiceInventory($inventoryItems, $invoiceId)
    {
        foreach ($inventoryItems as $item) {
            $inventory = new GreatLabInvoiceInventory();
            $inventory->invoice_id = $invoiceId;
            $inventory->product_id = $item['id'];
            $inventory->quantity = $item['quantity'];
            $inventory->price = $item['mrp'];
            $inventory->name = $item['name'];
            $inventory->save();
        }
    }

    private function createInvoiceDetails($tests, $invoiceNo, $referrer, $assigned_plan)
    {
        foreach ($tests as $test) {
            $commission = $referrer && $assigned_plan ? $this->getTestCommission($assigned_plan, $test['id']) : null;

            $detail = new MhpGreatLabInvoiceDetails();
            $detail->invoiceNo = $invoiceNo;
            $detail->testName = $test['test_name'];
            $detail->testCode = $test['id'];
            $detail->fee = $test['fee'];

            $discountAmount = ($test['discount'] * floatval($test['fee'])) / 100;
            $detail->discount = $discountAmount ? $discountAmount : 0;

            if ($commission) {
                $detail->point = (($discountAmount ? $test['fee'] - $discountAmount : $test['fee']) * $commission->point_percentage) / 100;
                $detail->point_percent = $commission->point_percentage;
            }

            $detail->testCategory = $test['group']['test_group_name'] ?? null;
            $detail->test_category_id = $test['test_category_id'];
            $detail->save();
        }
    }

    private function getTestCommission($assigned_plan, $test_id)
    {
        return DoctorsLabPointsPlanDetails::where([
            'plan_id' => $assigned_plan->plan_id,
            'test_id' => $test_id
        ])->first();
    }


    // update invoice
    public function updateInvoiceSampleCollection(Request $request, $id)
    {
        // remarkForSampleCollection
        $data = MhpGreatLabInvoice::find($id);
        $data->sampleCollectionDate = $request->sampleCollectionDate;
        $data->remarkForSampleCollection = $request->remarkForSampleCollection;
        // $data->sampleReceiverToLabRemark = $request->sampleReceiverToLabRemark;
        // $data->reportReceiverFromLabRemark = $request->reportReceiverFromLabRemark;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Invoice Updated successfully",
            "invoice" => $data
        ]);
    }
    public function approveSampleCollection(Request $request, $id)
    {
        $data = MhpGreatLabInvoice::find($id);
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
        $data = MhpGreatLabInvoice::find($id);
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
        $data = MhpGreatLabInvoice::find($id);
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
        $data = MhpGreatLabInvoice::find($id);
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
        $data = new MhpGreatLabInvoiceDetails();
        $data->invoiceNo = $request->invoiceNo;
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
     * @param  \App\Models\MhpGreatLabInvoice  $MhpGreatLabInvoice
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $header  =  $request->header();
        $branchData = getBranchData($header);
        $page = $request->page ?? 1;
        $limit = $request->limit ?? 10;
        $search = $request->search ?? null;
        $data = [];
        if ($branchData['super_admin'] == false) {

            $data = MhpGreatLabInvoice::where('saas_branch_id', $branchData['branch_id'])
                ->with('patient', 'tests', 'reports', 'inventory', 'doctor')
                ->when($search, function ($query, $search) {
                    return $query
                        ->where('patient_first_name', 'like', '%' . $search . '%')
                        ->orWhere('patient_mobile_phone', 'like', '%' . $search . '%')
                        ->orWhere('invoiceNo', 'like', '%' . $search . '%');
                })
                ->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);
        } else {
            $data = MhpGreatLabInvoice::with('patient', 'tests', 'reports', 'inventory', 'doctor')
                ->orderBy('id', 'desc')
                ->paginate($limit, ['*'], 'page', $page);
        }
        return response()->json($data);
    }
    public function transactions()
    {
        // Use DB transaction for safety
        return DB::transaction(function () {
            // Fetch the totals from 'mhp_great_lab_invoices' table

            // $transactions = DB::table('mhp_great_lab_invoices')
            //     ->selectRaw('
            //     SUM(totalBill - IFNULL(discount, 0) - IFNULL(specialDiscount, 0)) as total_invoice, 
            //     SUM(paidAmount - IFNULL(refundAmount, 0)) as total_received, 
            //     SUM(due) as total_due
            // ')
            //     ->first();

            $transactions = DB::table('mhp_great_lab_invoices')
                ->selectRaw('
            SUM(totalBill - IFNULL(discount, 0) - IFNULL(specialDiscount, 0)) as total_invoice, 

            SUM(paidAmount) as total_received, 
            SUM(due) as total_due,
             SUM(refundAmount) as total_refund_amount
        ')
                ->first();

            // Fetch the result
            $moneyReceipt = MhpGreatLabMoneRecipt::where(['money_receipt_type' => 'due']);


            $dueCollection = $moneyReceipt->sum('paid_amount');
            // Return the result as an object with total_invoice, total_received, total_due
            return [
                'total_invoice' => $transactions->total_invoice,
                'total_received' => $transactions->total_received,
                'total_due' => $transactions->total_due,
                'total_refund_amount' => $transactions->total_refund_amount,
                'due_collection' => $dueCollection
            ];
        });
    }



    public function forReportList(Request $request)
    {
        $header  =  $request->header();
        $branchData = getBranchData($header);
        $data = [];
        if ($branchData['super_admin'] == false) {
            $data = MhpGreatLabInvoice::where('saas_branch_id', $branchData['branch_id'])->with('patient', 'tests', 'reports', 'inventory', 'doctor')->orderBy('id', 'desc')->get();
        } else {
            $data = MhpGreatLabInvoice::with('patient', 'tests', 'reports', 'inventory', 'doctor')->orderBy('id', 'desc')->get();
        }
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $data
        ]);
    }
    public function lab_invoice_month_data(Request $request)
    {
        $header = $request->header();
        $branchData = getBranchData($header);
        $invoices = array();
        $data = [];
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $currentYear = Carbon::now()->format('Y');
        if ($branchData['super_admin'] == false) {
            $data = MhpGreatLabInvoice::with('patient', 'tests', 'reports')->where('saas_branch_id', $branchData['branch_id'])->orderBy('id', 'desc')->count();
            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoice::where('saas_branch_id', $branchData['branch_id'])->whereRaw('YEAR(created_at) =' . $currentYear)
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('totalBill');

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "invoice" => $invoices,
                "all" => $data
            ]);
        } else {
            $data = MhpGreatLabInvoice::with('patient', 'tests', 'reports')->orderBy('id', 'desc')->count();
            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoice::whereRaw('YEAR(created_at) =' . $currentYear)
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('totalBill');

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "invoice" => $invoices,
                "all" => $data
            ]);
        }
    }
    //income api //

    public function only_income_amount()
    {

        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $invoice = MhpAccountsInvoice::whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('amount');

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice;
            array_push($invoices, $invoice);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'income' => $invoices,
        ]);
    }
    public function lab_invoice_month_data_by_year($year, $branch, Request $request)
    {
        $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $header = $request->header();
        $branchData = getBranchData($header);
        if ($branchData['super_admin'] == false) {
            $data = MhpGreatLabInvoice::where('saas_branch_id', $branchData['branch_id'])->whereRaw('YEAR(created_at) =' . $currentYear)->count();
            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoice::where('saas_branch_id', $branchData['branch_id'])->whereRaw('YEAR(created_at) =' . $currentYear)
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('totalBill');

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "invoice" => $invoices,
                "all" => $data
            ]);
        } else {

            $allData = MhpGreatLabInvoice::whereRaw('YEAR(created_at) =' . $currentYear)->where('saas_branch_id', $branch)->count();
            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoice::whereRaw('YEAR(created_at) =' . $currentYear)
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->where('saas_branch_id', $branch)
                    ->sum('totalBill');

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice;
                array_push($invoices, $monthly_income);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'invoice' => $invoices,
                'all' => $allData
            ]);
        }
    }

    public function month_data_by_year_month($year, $month, $category, Request $request)
    {
        $branchData = getBranchData($request->header());
        // Base query
        $query = MhpGreatLabInvoiceDetails::query();

        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }

        // Apply filters
        if ($year !== null) {
            $query->whereYear('created_at', Carbon::createFromFormat('Y', $year)->format('Y'));
        }
        if ($month !== null) {
            $query->whereMonth('created_at', $month);
        }
        if ($category !== null && $category !== 'null') {
            $query->where('test_category_id', $category);
        }

        // Fetch data
        $allData = $query->get();

        // Return response
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'all' => $allData
        ]);
    }

    public function month_data_by_year_search($year,  $categroy, $branch, $test, Request $request)
    {
        $header = $request->header();
        $branchData = getBranchData($header);
        $isBranchFilter = false;
        $branch_id = null;
        if ($branchData['super_admin'] == false) {
            $isBranchFilter = true;
            $branch_id = $branchData['branch_id'];
        } else {
            if ($branch !== null && $branch !== "null") {
                $isBranchFilter = true;
                $branch_id = $branch;
            }
        }
        if ($year !== null &&  $categroy == 'null' &&  $test == 'null') {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $invoices = array();
            $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoiceDetails::whereRaw('YEAR(created_at) =' . $currentYear)
                    ->when($isBranchFilter, function ($query) use ($branch_id) {
                        return $query->where('saas_branch_id', $branch_id);
                    })
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('fee');

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice - $invoice * 10 / 100;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $invoices
            ]);
        } else if ($year !== null  &&  $categroy == 'null' &&  $test !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $invoices = array();
            $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoiceDetails::where('testCode', '=', $test)
                    ->whereRaw('YEAR(created_at) =' . $currentYear)
                    ->when($isBranchFilter, function ($query) use ($branch_id) {
                        return $query->where('saas_branch_id', $branch_id);
                    })
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('fee');
                // ->get();

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice - $invoice * 10 / 100;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $invoices
            ]);
        } else if ($year !== null &&  $categroy !== null &&  $test == 'null') {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $invoices = array();
            $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoiceDetails::where('test_category_id', '=', $categroy)
                    ->when($isBranchFilter, function ($query) use ($branch_id) {
                        return $query->where('saas_branch_id', $branch_id);
                    })
                    ->whereRaw('YEAR(created_at) =' . $currentYear)
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('fee');
                // ->get();
                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice - $invoice * 10 / 100;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $invoices
            ]);
        } else if ($year !== null  &&  $categroy !== null &&  $test !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $invoices = array();
            $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            foreach ($months as $key => $value) {
                $invoice = MhpGreatLabInvoiceDetails::where('test_category_id', '=', $categroy)
                    ->where('testCode', '=', $test)
                    ->when($isBranchFilter, function ($query) use ($branch_id) {
                        return $query->where('saas_branch_id', $branch_id);
                    })
                    ->whereRaw('YEAR(created_at) =' . $currentYear)
                    ->whereRaw('MONTH(created_at) =' . $key + 1)
                    ->sum('fee');
                // ->get();

                $monthly_income = new stdClass();
                $monthly_income->name = $value;
                $monthly_income->Income = $invoice - $invoice * 10 / 100;
                array_push($invoices, $monthly_income);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'all' => $invoices
            ]);
        }
    }
    // public function month_data_by_year_search($year = null, $categroy = null, $branch = null,  Request $request)
    // {
    //     $header = $request->header();
    //     $branchData = getBranchData($header);
    //     $invoices = array();
    //     $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //     $currentYear = Carbon::now()->format('Y');
    //     if ($year !== null || $year !== "null") {
    //         $year = $currentYear;
    //     }
    //     $query =  MhpGreatLabInvoice::query();
    //     $query->whereRaw('YEAR(created_at) =' . 2024);
    //     if ($categroy !== "null" && $categroy !== null) {
    //         $queryForDetails = MhpGreatLabInvoiceDetails::where('test_category_id', $categroy);
    //         $query->whereIn('invoiceNo', $queryForDetails->pluck('invoiceNo')->toArray());
    //     }
    //     $query->whereRaw('YEAR(created_at) =' . $currentYear);
    //     if ($branchData['super_admin'] == true) {
    //         if ($branch !== "null" && $branch !== null) {
    //             $query->where('saas_branch_id', $branch);
    //         }
    //         foreach ($months as $key => $value) {
    //             $invoice = $query->whereRaw('MONTH(created_at) =' . $key + 1)
    //                 ->sum('totalBill');

    //             $monthly_income = new stdClass();
    //             $monthly_income->name = $value;
    //             $monthly_income->Income = $invoice;
    //             array_push($invoices, $monthly_income);
    //         }
    //     }
    //     if ($branchData['super_admin'] == false) {
    //         foreach ($months as $key => $value) {
    //             $invoice = $query->where('saas_branch_id', $branchData['branch_id'])
    //                 ->whereRaw('MONTH(created_at) =' . $key + 1)
    //                 ->sum('totalBill');

    //             $monthly_income = new stdClass();
    //             $monthly_income->name = $value;
    //             $monthly_income->Income = $invoice;
    //             array_push($invoices, $monthly_income);
    //         }
    //     }


    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Added Successfully',
    //         'invoice' => $invoices,
    //         "branch" => $branch,
    //         "year" => $year,
    //         "currentYear" => $currentYear,
    //         "query" => $query->get(),

    //     ]);
    // }

    //income api //
    //expense api
    public function save_lab_expense(Request $request)
    {
        $header = $request->header();
        $branchData = getBranchData($header);
        $data = new MhpGreatLabExpense();
        if ($branchData['super_admin'] == false) {
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
        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $query = MhpGreatLabExpense::query();
        $branchData = getBranchData($request->header());
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }

        $invoiceCount = $query->orderBy('id', 'desc')->count();

        foreach ($months as $key => $value) {
            $invoiceQueryForChart = clone $query;
            $invoice = $invoiceQueryForChart->whereRaw('YEAR(created_at) =' . $currentYear)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
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
            'all' => $invoiceCount
        ]);
    }
    public function month_expense_amount()
    {

        $currentYear = Carbon::now()->format('Y');
        $invoices = array();
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($months as $key => $value) {
            $invoice = MhpGreatLabExpense::whereRaw('YEAR(created_at) =' . $currentYear)
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

    private function formateChartData($year, $group,)
    {
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $invoices = [];
        foreach ($months as $key => $value) {
            $invoice = MhpGreatLabExpense::whereRaw('MONTH(created_at) =' . $key + 1)->sum('amount');
            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = $invoice;
            array_push($invoices, $monthly_income);
        }
    }

    public function lab_expense_month_data_by_year($year, $group, $branch, Request $request)
    {
        $invoices = [];
        $allData = [];
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Fetch branch data
        $branchData = getBranchData($request->header());

        // Initialize base query
        $invoiceQuery = MhpGreatLabExpense::query();

        // Apply branch filter if user is not super admin
        if (!$branchData['super_admin']) {
            $invoiceQuery->where('saas_branch_id', $branchData['branch_id']);
        } else {
            $invoiceQuery->where('saas_branch_id', $branch);
        }

        // Filtering by year
        if ($year !== null && $group == 'null') {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $invoiceQuery->whereYear('created_at', $currentYear);
        }

        // Filtering by group
        elseif ($group !== null && $year == 'null') {
            $invoiceQuery->where('accounts_group_id', $group);
        }

        // Filtering by both year and group
        elseif ($year !== null && $group !== null) {
            $currentYear = Carbon::createFromFormat('Y', $year)->format('Y');
            $invoiceQuery->where('accounts_group_id', $group)->whereYear('created_at', $currentYear);
        }

        // Fetch all data matching the filters
        $allData = $invoiceQuery->get();

        // Summing expenses for each month
        foreach ($months as $key => $value) {
            $invoiceQueryForChart = clone $invoiceQuery;

            // Sum expenses for the current month
            $invoice = $invoiceQueryForChart->whereMonth('created_at', $key + 1)->sum('amount');

            // Create monthly income object
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
        ]);
    }


    public function expense_data_by_month($year, $month, Request $request)
    {
        // Initialize base query
        $query = MhpGreatLabExpense::with('accounts_group', 'accounts_type');
        $branchData = getBranchData($request->header());
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        // Apply filters
        if ($year !== null) {
            $query->whereYear('created_at', Carbon::createFromFormat('Y', $year)->format('Y'));
        }
        if ($month !== null) {
            $query->whereMonth('created_at', $month);
        }

        // Fetch data
        $allData = $query->get();

        // Return response
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'all' => $allData
        ]);
    }

    //expense api

    public function invoiceDetails($invoiceNo)
    {
        $data = MhpGreatLabInvoiceDetails::where('invoiceNo', $invoiceNo)->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "invoice" => $data
        ]);
    }
    //invoice search by date 
    // public function searchByDateRange(Request $request)
    // {
    //     $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
    //     $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

    //     $data = MhpGreatLabInvoice::whereBetween('created_at', [$startDate, $endDate])->with('patient', 'tests')->orderBy('id', 'desc')->get();
    //     // $data = MhpGreatLabInvoice::whereBetween('created_at', [$request->startDate,$request->endDate])->get();
    //     return response()->json([
    //         "status" => 200,
    //         "message" => "All Invoice",
    //         "invoice" => $data
    //     ]);
    // }
    public function searchByDateRange(Request $request)
    {
        // Parse the start and end dates from the request
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        // Fetch invoices within the date range, including relationships
        $invoices = MhpGreatLabInvoice::whereBetween('created_at', [$startDate, $endDate])
            ->with('patient', 'tests', 'doctor')
            ->orderBy('id', 'desc');
        $data = $invoices->get();
        $invoiceId = $data->pluck('id')->toArray();
        // due collection 
        // Return the data and totals as JSON response
        $moneyReceipt = MhpGreatLabMoneRecipt::where(['money_receipt_type' => 'due'])
            ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
                $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            });


        $dueCollection = $moneyReceipt->sum('paid_amount');
        $dueCollectionInvoiceFromCurrentInvoice = $moneyReceipt->whereIn('invoice_id', $invoiceId)->sum('paid_amount');

        // Calculate totals from the filtered data
        $totals = [
            'total_invoice' => $data->sum(function ($invoice) {
                return $invoice->totalBill - ($invoice->discount ?? 0) - ($invoice->specialDiscount ?? 0);
            }),
            'total_received' => $data->sum('paidAmount') - $data->sum('refundAmount') + $dueCollection - $dueCollectionInvoiceFromCurrentInvoice,
            'total_due' => $data->sum('due'),
        ];
        $totalCount = $data->count();

        return response()->json([
            "status" => 200,
            "message" => "Invoices within date range",
            "invoice" => $data,
            "totals" => $totals,
            "count" => $totalCount,
            "dueCollection" => $dueCollection,
        ]);
    }

    // edit test
    public function editTest($id)
    {
        $data = MhpGreatLabInvoiceDetails::find($id);
        return response()->json([
            "status" => 200,
            "message" => "Test",
            "test" => $data
        ]);
    }
    // update test
    public function updateTest(Request $request)
    {

        if ($request->type === "Add") {
            $invoice = MhpGreatLabInvoice::where('invoiceNo', $request->invoiceNo)->first();
            $invoiceInventory = GreatLabInvoiceInventory::where('invoice_id', $invoice->id)->get();

            $allProductsAvailable = true; // Assume all products are available initially

            foreach ($invoiceInventory as $key => $value) {
                $alreadyStockOut = GreatLabBoothStockOut::where(['invoice_id' => $invoice->id, 'booth_id' => $request->booth_id, 'product_id' => $value->product_id])->first();
                if (!$alreadyStockOut) {
                    $stock = GreatLabBoothStock::where('booth_id', $request->booth_id)
                        ->where('product_id', $value->product_id)
                        ->first();
                    // Check if the product is available in stock
                    if ($stock && $stock->quantity >= $value->quantity) {
                        continue; // Product is available, move to next
                    } else {
                        // Product is not available, set flag to false and exit loop
                        $allProductsAvailable = false;
                        break;
                    }
                }
            }

            if ($allProductsAvailable) {
                // All products are available, save stock out data
                foreach ($invoiceInventory as $key => $value) {
                    $alreadyStockOut = GreatLabBoothStockOut::where(['invoice_id' => $invoice->id, 'booth_id' => $request->booth_id, 'product_id' => $value->product_id])->first();
                    if (!$alreadyStockOut) {
                        $currentStock = GreatLabBoothStock::where(['booth_id' => $request->booth_id, 'product_id' => $value->product_id])->first();
                        $currentStock->quantity = $currentStock->quantity - $value->quantity;
                        $currentStock->save();
                        $stockOutData = new GreatLabBoothStockOut();
                        $stockOutData->invoice_id = $invoice->id;
                        $stockOutData->booth_id = $request->booth_id;
                        $stockOutData->product_id = $value->product_id;
                        $stockOutData->name = $value->name;
                        $stockOutData->quantity = $value->quantity;
                        $stockOutData->price = $value->price;
                        $stockOutData->save();
                    }
                }
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Some products are not available in stock'
                ], 400);
            }
        }
        $allTest = $request->allTest;

        foreach ($allTest as $key => $value) {
            $data = MhpGreatLabInvoiceDetails::find($value['id']);
            $data->collector = $request->collector;
            $data->remark = $request->remark;
            $data->collector_id = $request->collector_id;
            $data->collectionStatus = $request->collectionStatus;
            $data->collectionDate = $request->collectionDate;
            $data->specimen_id = $request->specimen_id;
            $data->specimen_name = $request->specimen_name;
            $data->booth_id = $request->booth_id;
            $data->update();
        }
        // $data = MhpGreatLabInvoiceDetails::find($id);
        // $data->collector = $request->collector;
        // $data->remark = $request->remark;
        // $data->collectionStatus = $request->collectionStatus;
        // $data->collectionDate = $request->collectionDate;
        // $data->specimen_id = $request->specimen_id;
        // $data->specimen_name = $request->specimen_name;
        // $data->booth_id = $request->booth_id;
        // $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test sample collected successfully",
        ]);
    }
    //sample sent to lab
    public function updateTestForLab(Request $request, $id)
    {
        $data = MhpGreatLabInvoiceDetails::find($id);
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
        $data = MhpGreatLabInvoiceDetails::find($id);
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
        $data = MhpGreatLabInvoiceDetails::find($id);
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
        $header =  $request->header();
        $branchData = getBranchData($header);
        if ($files = $request->file('fileUpload')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }
        $data = new MhpGreatLabReportDeliveryInfo();
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
        $header =  $request->header();
        $branchData = getBranchData($header);
        $data = [];
        if ($branchData['super_admin'] == false) {
            $data = MhpGreatLabReportDeliveryInfo::where('saas_branch_id', $branchData['branch_id'])->with('invoice', 'patient')->orderBy('id', 'desc')->get();
        } else {
            $data = MhpGreatLabReportDeliveryInfo::with('invoice', 'patient')->orderBy('id', 'desc')->get();
        }
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

        $data = MhpGreatLabReportDeliveryInfo::whereBetween('created_at', [$startDate, $endDate])->with('patient', 'invoice')->orderBy('id', 'desc')->get();
        // $data = MhpGreatLabInvoice::whereBetween('created_at', [$request->startDate,$request->endDate])->get();
        return response()->json([
            "status" => 200,
            "message" => "All Delivery Info",
            "delivery" => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpGreatLabInvoice  $MhpGreatLabInvoice
     * @return \Illuminate\Http\Response
     */
    public function createMoneyReceipt(Request $request)
    {
        $branchData = getBranchData($request->header());
        $data = new MhpGreatLabMoneRecipt();
        if ($branchData['super_admin'] == false) {
            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        } else {
            $data->saas_branch_id = $request->saas_branch_id;
            $data->saas_branch_name = $request->saas_branch_name;
        }
        $shift = $this->currentShift();
        $today = now()->format('Ymd'); // Get current date in YYYYMMDD format


        $lastReceipt = MhpGreatLabMoneRecipt::where('money_receipt_number', 'LIKE', $today . '%')
            ->max('money_receipt_number');
        if ($lastReceipt) {
            $lastSerial = (int)substr($lastReceipt, -3);
            $newSerial = str_pad($lastSerial + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $newSerial = '001';
        }
        $data->money_receipt_number = $today . $newSerial;

        // $data->money_receipt_number = MhpGreatLabMoneRecipt::max('money_receipt_number') ? MhpGreatLabMoneRecipt::max('money_receipt_number') + 1 : 1001;
        $data->hn_number = $request->hn_number;
        $data->due_amount = $request->due_amount;
        $data->age = $request->age;
        $data->invoice_id = $request->invoice_id;
        $data->name = $request->name;
        $data->invoice_number = $request->invoice_number;
        $data->requested_amount = $request->requested_amount;
        $data->paid_amount = $request->paid_amount;
        $data->payment_date = $request->payment_date;
        $data->payment_time = $request->payment_time;
        $data->money_receipt_type = $request->money_receipt_type ? $request->money_receipt_type : "add";
        $data->payment_method = $request->payment_method;
        $data->total_amount_paid = $request->total_amount_paid;
        $data->created_by = $request->created_by;
        $data->created_by_id = $request->created_by_id;
        if ($shift) {
            $data->shift_id = $shift->id;
        }
        $findDoctor = MhpDoctorsMaster::where('id', $request->referredBy)->first();
        $data->referredBy = $findDoctor ? $findDoctor->fullName : 'Self';
        $data->save();
        $data['invoice'] = MhpGreatLabInvoice::with('tests')->where('id', $request->invoice_id)->first();
        return response()->json([
            "status" => 200,
            "message" => "Money receipt created successfully",
            "receipt" => $data
        ]);
    }


    public function findMoneyReceiptByInvoice($id)
    {
        $data = MhpGreatLabMoneRecipt::with('invoice')
            ->where('invoice_id', $id)
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "Money receipt",
            "receipt" => $data
        ]);
    }

    public function findMoneyReceiptByInvoiceNum($invoice)
    {
        $data = MhpGreatLabMoneRecipt::with('invoice')
            ->where('invoice_number', $invoice)
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "Money receipt",
            "receipt" => $data
        ]);
    }
    public function allMoneyReceipt()
    {
        // return $request->all();
        $data = MhpGreatLabMoneRecipt::orderBy('id', 'desc')->get();
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

        $data = MhpGreatLabMoneRecipt::whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'desc')->get();
        // $data = MhpGreatLabInvoice::whereBetween('created_at', [$request->startDate,$request->endDate])->get();
        return response()->json([
            "status" => 200,
            "message" => "All Delivery Info",
            "receipt" => $data
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpGreatLabInvoice  $MhpGreatLabInvoice
     * @return \Illuminate\Http\Response
     */
    // For lab technician
    public function updateReportCreationStatus(Request $request, $id)
    {
        $data = MhpGreatLabInvoiceDetails::find($id);
        $data->report_add_status = $request->report_add_status;
        $data->report_approve_status = $request->report_approve_status;
        $data->report_id = $request->report_id;
        $data->report_confiremd_status = $request->report_confiremd_status;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Test report created successfully",
            "test" => $data
        ]);
    }
    // For lab technician
    public function updateReportConfirmStatus(Request $request, $id)
    {
        $data = MhpGreatLabInvoiceDetails::find($id);
        $data->report_approve_status = $request->report_approve_status;
        $data->report_confiremd_status = $request->report_confiremd_status;
        $data->update();
        $report = MhpGreatLabReport::where('id', $data->report_id)
            ->first();
        $report->report_confirm = 1;
        $report->update();

        return response()->json([
            "status" => 200,
            "message" => "Test report confirmed successfully",
            "test" => $data,
            "report" => $report
        ]);
    }

    public function billingReport(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpGreatLabInvoice::with('doctor', 'tests:discount,testName,fee,invoiceNo',)
            ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
                $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })->when($request->branch_id, function ($query) use ($request) {
                return $query->where('saas_branch_id', $request->branch_id);
            })
            ->when($request->patient_id, function ($query) use ($request) {
                return $query->where('patient_id', $request->patient_id);
            })
            ->when($request->doctor_id, function ($query) use ($request) {
                return $query->where('referrer', $request->doctor_id);
            })->when($branchData['super_admin'] == false, function ($query) use ($branchData) {
                return $query->where('saas_branch_id', $branchData['branch_id']);
            })
            ->withSum('tests', 'discount')
            ->orderBy('id', 'desc');
        // Define the base query

        // Fetch invoices
        $invoices = $query->get();

        // Map and format invoices
        $filteredInvoices = $invoices->map(function ($invoice) {
            return [
                'id' => $invoice->id,
                'invoiceNo' => $invoice->invoiceNo,
                'created_by' => $invoice->created_by,
                'paymentMethod' => $invoice->paymentMethod,
                'paymentOption' => $invoice->paymentOption,
                'created_at' => $invoice->created_at,
                'paidAmount' => $invoice->paidAmount,
                'refundAmount' => $invoice->refundAmount,
                'due' => $invoice->due,
                'totalBill' => $invoice->totalBill,
                'referrer' => $invoice->referrer,
                'patient_first_name' => $invoice->patient_first_name,
                'specialDiscount' => $invoice->specialDiscount,
                'totalDiscount' => $invoice->tests_sum_discount + $invoice->specialDiscount,
                'doctor' => $invoice->doctor,
                "saas_branch_id" => $invoice->saas_branch_id,
                "saas_branch_name" => $invoice->saas_branch_name,
                'patient_mobile_phone' => $invoice->patient_mobile_phone,
                'details' => $invoice->tests
            ];
        });

        // Calculate totals
        $total = $invoices->sum('totalBill');
        $discount = $invoices->sum(function ($invoice) {
            return $invoice->tests_sum_discount + $invoice->specialDiscount;
        });
        $refund = $invoices->sum('refundAmount');
        $due =  $invoices->sum('due');
        $paid = $invoices->sum('paidAmount') - $refund;

        // Return JSON response
        return response()->json([
            'status' => 200,
            'invoice' => $filteredInvoices,
            'total' => $total,
            'discount' => $discount,
            'due' => $due,
            'paid' => $paid,
            'refund' => $refund
        ]);
    }
    public function billingReportMarketer(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpGreatLabInvoice::with('tests:discount,testName,fee,invoiceNo', 'sales:name,id')
            ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
                $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })->when($request->branch_id, function ($query) use ($request) {
                return $query->where('saas_branch_id', $request->branch_id);
            })
            ->when($request->marketer, function ($query) use ($request) {
                return $query->where('marketer', $request->marketer);
            })
            ->when($branchData['super_admin'] == false, function ($query) use ($branchData) {
                return $query->where('saas_branch_id', $branchData['branch_id']);
            })
            ->whereNotNull('marketer')
            ->withSum('tests', 'discount')
            ->orderBy('id', 'desc');
        // Define the base query

        // Fetch invoices
        $invoices = $query->get();

        // Map and format invoices
        $filteredInvoices = $invoices->map(function ($invoice) {
            return [
                'id' => $invoice->id,
                'invoiceNo' => $invoice->invoiceNo,
                'created_by' => $invoice->created_by,
                'paymentMethod' => $invoice->paymentMethod,
                'paymentOption' => $invoice->paymentOption,
                'created_at' => $invoice->created_at,
                'paidAmount' => $invoice->paidAmount,
                'refundAmount' => $invoice->refundAmount,
                'due' => $invoice->due,
                'totalBill' => $invoice->totalBill,
                'referrer' => $invoice->referrer,
                'patient_first_name' => $invoice->patient_first_name,
                'specialDiscount' => $invoice->specialDiscount,
                'totalDiscount' => $invoice->tests_sum_discount + $invoice->specialDiscount,
                'marketer' => $invoice->sales,
                "saas_branch_id" => $invoice->saas_branch_id,
                "saas_branch_name" => $invoice->saas_branch_name,
                'patient_mobile_phone' => $invoice->patient_mobile_phone,
                'details' => $invoice->tests
            ];
        });

        // Calculate totals
        $total = $invoices->sum('totalBill');
        $discount = $invoices->sum(function ($invoice) {
            return $invoice->tests_sum_discount + $invoice->specialDiscount;
        });
        $refund = $invoices->sum('refundAmount');
        $due =  $invoices->sum('due');
        $paid = $invoices->sum('paidAmount') - $refund;

        // Return JSON response
        return response()->json([
            'status' => 200,
            'invoice' => $filteredInvoices,
            'total' => $total,
            'discount' => $discount,
            'due' => $due,
            'paid' => $paid,
            'refund' => $refund
        ]);
    }
    public function billingReportUser(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpGreatLabInvoice::with('tests:discount,testName,fee,invoiceNo', 'shift:name,id')
            ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
                $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })->when($request->branch_id, function ($query) use ($request) {
                return $query->where('saas_branch_id', $request->branch_id);
            })
            ->when($request->shift_id, function ($query) use ($request) {
                return $query->where('shift_id', $request->shift_id);
            })
            ->when($request->user_id, function ($query) use ($request) {
                return $query->where('created_by_id', $request->user_id);
            })
            ->when($branchData['super_admin'] == false, function ($query) use ($branchData) {
                return $query->where('saas_branch_id', $branchData['branch_id']);
            })
            // ->whereNotNull('shift_id')
            ->withSum('tests', 'discount')
            ->orderBy('id', 'desc');
        // Define the base query

        // Fetch invoices
        $invoices = $query->get();

        // Map and format invoices
        $filteredInvoices = $invoices->map(function ($invoice) use ($request) {
            $dueReceipt = MhpGreatLabMoneRecipt::where(['invoice_id' => $invoice->id, 'money_receipt_type' => 'due'])->sum('paid_amount');
            return [
                'id' => $invoice->id,
                'invoiceNo' => $invoice->invoiceNo,
                'created_by' => $invoice->created_by,
                'paymentMethod' => $invoice->paymentMethod,
                'paymentOption' => $invoice->paymentOption,
                'created_at' => $invoice->created_at,
                'paidAmount' => $invoice->paidAmount - $dueReceipt,
                'refundAmount' => $invoice->refundAmount,
                'due' => $invoice->due,
                'totalBill' => $invoice->totalBill,
                'referrer' => $invoice->referrer,
                'patient_first_name' => $invoice->patient_first_name,
                'specialDiscount' => $invoice->specialDiscount,
                'totalDiscount' => $invoice->tests_sum_discount + $invoice->specialDiscount,
                'shift' => $invoice->shift,
                "saas_branch_id" => $invoice->saas_branch_id,
                "saas_branch_name" => $invoice->saas_branch_name,
                'patient_mobile_phone' => $invoice->patient_mobile_phone,
                'details' => $invoice->tests,
                'dueReceipt' => $dueReceipt
            ];
        });
        // due collections
        $moneyReceipt = MhpGreatLabMoneRecipt::with('invoice_only', 'shift')->where(['money_receipt_type' => 'due'])
            ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
                $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })
            ->when($request->shift_id, function ($query) use ($request) {
                return $query->where('shift_id', $request->shift_id);
            })
            ->when($request->user_id, function ($query) use ($request) {
                return $query->where('created_by_id', $request->user_id);
            });

        $dueCollection = $moneyReceipt->sum('paid_amount');
        $dueCollectionInvoice = $moneyReceipt->get();

        // Calculate totals
        $total = $invoices->sum('totalBill');
        $discount = $invoices->sum(function ($invoice) {
            return $invoice->tests_sum_discount + $invoice->specialDiscount;
        });
        $dueReceipt  = $filteredInvoices->sum('dueReceipt');
        $refund = $invoices->sum('refundAmount');
        $due =  $invoices->sum('due');
        $paid = $invoices->sum('paidAmount') - $refund - $dueReceipt;

        // Return JSON response
        return response()->json([
            'status' => 200,
            'invoice' => $filteredInvoices,
            'total' => $total,
            'discount' => $discount,
            'due' => $due,
            'paid' => $paid,
            'refund' => $refund,
            'dueCollection' => $dueCollection,
            'dueInvoice' => $dueCollectionInvoice
        ]);
    }
    public function billingReportTest(Request $request)
    {
        // return $request->all();
        $branchData = getBranchData($request->header());
        $query = MhpGreatLabInvoiceDetails::when($request->startDate && $request->endDate, function ($query) use ($request) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            return $query->whereBetween('created_at', [$startDate, $endDate]);
        })
            // ->when($request->branch_id, function ($query) use ($request) {
            //     return $query->where('saas_branch_id', $request->branch_id);
            // })
            ->when($request->group, function ($query) use ($request) {
                return $query->where('testCategory', $request->group);
            })
            ->when($request->category_id, function ($query) use ($request) {
                return $query->where('test_category_id', $request->category_id);
            })
            ->when($request->test_id, function ($query) use ($request) {
                return $query->where('testCode', $request->test_id);
            });
        // ->when($branchData['super_admin'] == false, function ($query) use ($branchData) {
        //     return $query->where('saas_branch_id', $branchData['branch_id']);
        // });
        // Define the base query

        // Fetch invoices
        $invoices = $query->get();
        $invoiceDetails = $invoices->groupBy('testCode')->map(function ($group) {
            return [
                'total_count' => $group->count(),
                'testName' => $group->first()['testName'],
                'fee' => $group->first()['fee'],
                'testCategory' => $group->first()['testCategory'],
                'invoiceNo' => $group->first()['invoiceNo'],
                'total_fee' => $group->sum('fee'),
                'discount' => $group->sum('discount'),
                'average_fee' => $group->avg('fee'),
                // 'invoices' => $group, // Keeps the grouped invoices if needed
            ];
        })->values();
        $formatted = $invoiceDetails->toArray();
        // Map and format invoices
        // $filteredInvoices = $invoices->map(function ($invoice) use ($request) {
        //     $dueReceipt = MhpGreatLabMoneRecipt::where(['invoice_id' => $invoice->id, 'money_receipt_type' => 'due'])->sum('paid_amount');
        //     return [
        //         'id' => $invoice->id,
        //         'invoiceNo' => $invoice->invoiceNo,
        //         'created_by' => $invoice->created_by,
        //         'paymentMethod' => $invoice->paymentMethod,
        //         'paymentOption' => $invoice->paymentOption,
        //         'created_at' => $invoice->created_at,
        //         'paidAmount' => $invoice->paidAmount - $dueReceipt,
        //         'refundAmount' => $invoice->refundAmount,
        //         'due' => $invoice->due,
        //         'totalBill' => $invoice->totalBill,
        //         'referrer' => $invoice->referrer,
        //         'patient_first_name' => $invoice->patient_first_name,
        //         'specialDiscount' => $invoice->specialDiscount,
        //         'totalDiscount' => $invoice->tests_sum_discount + $invoice->specialDiscount,
        //         'shift' => $invoice->shift,
        //         "saas_branch_id" => $invoice->saas_branch_id,
        //         "saas_branch_name" => $invoice->saas_branch_name,
        //         'patient_mobile_phone' => $invoice->patient_mobile_phone,
        //         'details' => $invoice->tests,
        //         'dueReceipt' => $dueReceipt
        //     ];
        // });

        // Calculate totals
        $total = $invoiceDetails->sum('total_fee');
        $discount = $invoiceDetails->sum('discount');
        $totalCount = $invoiceDetails->sum('total_count');

        // Return JSON response
        return response()->json([
            'status' => 200,
            'invoice' => $formatted,
            'total' => $total,
            'discount' => $discount,
            'totalCount' => $totalCount,
            // 'paid' => $paid,
            // 'refund' => $refund,
            // 'dueCollection' => $dueCollection,
            // 'dueInvoice' => $dueCollectionInvoice
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpGreatLabInvoice  $MhpGreatLabInvoice
     * @return \Illuminate\Http\Response
     */
    public function updateInvoice(Request $request, $id)
    {
        $data = MhpGreatLabInvoice::find($id);
        $data->totalBill = $request->totalBill;
        $data->due = $request->dueAmount;
        $data->specialDiscount = $request->specialDiscount;
        $data->refundAmount = $request->refundAmount;
        $data->paidAmount = $request->paidAmount;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Updated successfully",
            "invoice" => $data
        ]);
    }
    public function refund_invoice_item($id)
    {
        $data = MhpGreatLabInvoiceDetails::find($id);
        $data->is_refund = 1;
        $data->save();

        //calculate refund
        $fee = isset($data->fee) ? (float)$data->fee : 0;


        $invoice = MhpGreatLabInvoice::where('invoiceNo', $data->invoiceNo)->with('patient', 'tests')->first();
        $percentage = isset($invoice->discount_percentage) ? (float)$invoice->discount_percentage : 0;
        $calculateRefundMoney = $fee - (($fee * $percentage) / 100);
        $invoice->refundAmount = (float)$invoice->refundAmount + $calculateRefundMoney;

        if ($calculateRefundMoney <= $invoice->due) {
            $invoice->due -= $calculateRefundMoney;
        } else {
            $remainingRefund = $calculateRefundMoney - $invoice->due;
            $invoice->due = 0;
            if ($remainingRefund > 0) {
                $invoice->paidAmount -= $remainingRefund;
            }
        }

        $invoice->save();


        $moneyReceipt = new MhpGreatLabMoneRecipt();
        $moneyReceipt->saas_branch_id = $invoice->saas_branch_id;
        $moneyReceipt->saas_branch_name = $invoice->saas_branch_name;
        $moneyReceipt->name = $invoice->patient_first_name;
        $moneyReceipt->invoice_number = $data->invoiceNo;
        $moneyReceipt->referredBy = $invoice->referredBy;
        $moneyReceipt->invoice_id = $invoice->id;

        $moneyReceipt->money_receipt_type = 'refund';
        $moneyReceipt->paid_amount = $calculateRefundMoney;
        $moneyReceipt->due_amount = $invoice->due;

        $moneyReceipt->payment_date = now()->toDateString(); // "2025-01-29"
        $moneyReceipt->payment_time = now()->format('h:i:s A');
        $moneyReceipt->save();

        return response()->json([
            "status" => 200,
            "message" => "Refund Invoice Item successfully",
            "invoice" => $invoice
        ]);
    }

    public function refund_full_invoice($invoiceNo)
    {
        $invoice = MhpGreatLabInvoice::where('invoiceNo', $invoiceNo)
            ->with('patient', 'tests')
            ->first();

        if (!$invoice) {
            return response()->json([
                "status" => 400,
                "message" => "Invoice not found"
            ]);
        }

        $invoiceItems = MhpGreatLabInvoiceDetails::where('invoiceNo', $invoiceNo)
            ->where('is_refund', 0)
            ->get();

        if ($invoiceItems->isEmpty()) {
            return response()->json([
                "status" => 400,
                "message" => "Items are already refunded.",
                "invoice" => $invoice
            ]);
        }
        MhpGreatLabInvoiceDetails::where('invoiceNo', $invoiceNo)
            ->where('is_refund', 0)
            ->update(['is_refund' => 1]);

        $totalFee = (float) $invoiceItems->sum('fee');

        $percentage = isset($invoice->discount_percentage) ? (float)$invoice->discount_percentage : 0;
        $calculateRefundMoney = $totalFee - (($totalFee * $percentage) / 100);
        $invoice->refundAmount = (float)$invoice->refundAmount + $calculateRefundMoney;

        if ($calculateRefundMoney <= $invoice->due) {
            $invoice->due -= $calculateRefundMoney;
        } else {
            $remainingRefund = $calculateRefundMoney - $invoice->due;
            $invoice->due = 0;
            if ($remainingRefund > 0) {
                $invoice->paidAmount -= $remainingRefund;
            }
        }

        $invoice->save();

        $moneyReceipt = new MhpGreatLabMoneRecipt();
        $moneyReceipt->saas_branch_id = $invoice->saas_branch_id;
        $moneyReceipt->saas_branch_name = $invoice->saas_branch_name;
        $moneyReceipt->name = $invoice->patient_first_name;
        $moneyReceipt->invoice_number = $invoiceNo;
        $moneyReceipt->referredBy = $invoice->referredBy;
        $moneyReceipt->invoice_id = $invoice->id;

        $moneyReceipt->money_receipt_type = 'refund';
        $moneyReceipt->paid_amount = $calculateRefundMoney;
        $moneyReceipt->due_amount = $invoice->due;

        $moneyReceipt->payment_date = now()->toDateString();
        $moneyReceipt->payment_time = now()->format('h:i:s A');
        $moneyReceipt->save();

        $invoice = MhpGreatLabInvoice::where('invoiceNo', $invoiceNo)
            ->with('patient', 'tests')
            ->first();

        return response()->json([
            "status" => 200,
            "message" => "Full refund processed successfully",
            "invoice" => $invoice
        ]);
    }



    // public function labDashboardData($type)
    // {
    //     $timezone = 'Asia/Dhaka';
    //     $startDate = null;
    //     $endDate = null;

    //     switch ($type) {
    //         case 'today':
    //             $startDate = Carbon::now($timezone)->startOfDay()->format('Y-m-d H:i:s');
    //             $endDate = Carbon::now($timezone)->endOfDay()->format('Y-m-d H:i:s');
    //             break;

    //         case 'week':
    //             $startDate = Carbon::now($timezone)->startOfWeek(Carbon::SATURDAY)->startOfDay()->format('Y-m-d H:i:s');
    //             $endDate = Carbon::now($timezone)->endOfWeek(Carbon::FRIDAY)->endOfDay()->format('Y-m-d H:i:s');
    //             break;

    //         case 'month':
    //             $startDate = Carbon::now($timezone)->startOfMonth()->startOfDay()->format('Y-m-d H:i:s');
    //             $endDate = Carbon::now($timezone)->endOfMonth()->endOfDay()->format('Y-m-d H:i:s');
    //             break;

    //         case 'year':
    //             $startDate = Carbon::now($timezone)->startOfYear()->startOfDay()->format('Y-m-d H:i:s');
    //             $endDate = Carbon::now($timezone)->endOfYear()->endOfDay()->format('Y-m-d H:i:s');
    //             break;

    //         default:
    //             return response()->json([
    //                 "status" => 400,
    //                 "message" => "Invalid date range type provided."
    //             ]);
    //     }

    //     // Retrieve data within the selected date range
    //     $data = MhpGreatLabInvoice::whereBetween('created_at', [$startDate, $endDate])
    //         ->orderBy('id', 'desc')
    //         ->get();
    //     $totalPatient = MhpPatient::get();

    //     // Initialize counters
    //     $totalInvoiceCount = $data->count();
    //     $totalInvoiceAmount = 0;
    //     $totalReceived = 0;
    //     $totalDue = 0;

    //     // Prepare monthly totals and monthly dues
    //     $monthlyTotals = [];
    //     $monthlyDues = [];

    //     // Iterate through each invoice
    //     foreach ($data as $invoice) {
    //         // Calculate the amount after applying discounts
    //         $amountAfterDiscounts = $invoice->totalBill
    //             - $invoice->discount
    //             - $invoice->specialDiscount;

    //         // Add to the total invoice amount
    //         $totalInvoiceAmount += $amountAfterDiscounts;

    //         // Calculate the total received (paid amount minus refund amount)
    //         $receivedAmount = $invoice->paidAmount - $invoice->refundAmount;
    //         $totalReceived += $receivedAmount;

    //         // Add to the total due amount
    //         $totalDue += $invoice->due;

    //         // Get month index for monthly totals and dues
    //         $monthIndex = Carbon::parse($invoice->created_at)->format('n') - 1;

    //         // Initialize the month total and due if they don't exist
    //         if (!isset($monthlyTotals[$monthIndex])) {
    //             $monthlyTotals[$monthIndex] = 0;
    //             $monthlyDues[$monthIndex] = 0;
    //         }
    //         $monthlyTotals[$monthIndex] += $amountAfterDiscounts;
    //         $monthlyDues[$monthIndex] += $invoice->due;
    //     }

    //     // Fill in missing months with 0 for totals and dues
    //     $orderedMonthlyTotals = array_fill(0, 12, 0);
    //     $orderedMonthlyDues = array_fill(0, 12, 0);

    //     foreach ($monthlyTotals as $monthIndex => $total) {
    //         $orderedMonthlyTotals[$monthIndex] = $total;
    //     }
    //     foreach ($monthlyDues as $monthIndex => $due) {
    //         $orderedMonthlyDues[$monthIndex] = $due;
    //     }

    //     // Return the response with calculated values
    //     return response()->json([
    //         "status" => 200,
    //         "message" => "Invoices for the selected date range",
    //         "totalInvoiceCount" => $totalInvoiceCount,
    //         "totalInvoiceAmount" => $totalInvoiceAmount,
    //         "totalReceived" => $totalReceived,
    //         "totalDue" => $totalDue,
    //         'totalPatient' => $totalPatient,
    //         'monthlyTotals' => $orderedMonthlyTotals,
    //         'monthlyDues' => $orderedMonthlyDues
    //     ]);
    // }
    public function labDashboardData($type)
    {
        $timezone = 'Asia/Dhaka';
        $startDate = null;
        $endDate = null;
        $currentYear = Carbon::now($timezone)->year;

        switch ($type) {
            case 'today':
                $startDate = Carbon::now($timezone)->startOfDay()->format('Y-m-d H:i:s');
                $endDate = Carbon::now($timezone)->endOfDay()->format('Y-m-d H:i:s');
                break;

            case 'week':
                $startDate = Carbon::now($timezone)->startOfWeek(Carbon::SATURDAY)->startOfDay()->format('Y-m-d H:i:s');
                $endDate = Carbon::now($timezone)->endOfWeek(Carbon::FRIDAY)->endOfDay()->format('Y-m-d H:i:s');
                break;

            case 'month':
                $startDate = Carbon::now($timezone)->startOfMonth()->startOfDay()->format('Y-m-d H:i:s');
                $endDate = Carbon::now($timezone)->endOfMonth()->endOfDay()->format('Y-m-d H:i:s');
                break;

            case 'year':
                $startDate = Carbon::now($timezone)->startOfYear()->startOfDay()->format('Y-m-d H:i:s');
                $endDate = Carbon::now($timezone)->endOfYear()->endOfDay()->format('Y-m-d H:i:s');
                break;

            default:
                return response()->json([
                    "status" => 400,
                    "message" => "Invalid date range type provided."
                ]);
        }

        // Retrieve invoice data within the selected date range for the current year
        $data = MhpGreatLabInvoice::whereYear('created_at', $currentYear)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->orderBy('id', 'desc')
            ->get();

        // Retrieve patient data for the current year, grouped by month
        $patientData = DB::table('mhp_patients')
            ->whereYear('created_at', $currentYear)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('count', 'month');



        // Initialize counters
        $totalInvoiceCount = $data->count();
        $totalInvoiceAmount = 0;
        $totalReceived = 0;
        $totalDue = 0;

        // Prepare monthly totals, monthly dues, and initialize monthly patient data array with month names
        $months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        $monthlyTotals = array_fill(0, 12, 0);
        $monthlyDues = array_fill(0, 12, 0);
        $monthlyPatientCount = [];

        // Iterate through each invoice to calculate monthly totals and dues
        foreach ($data as $invoice) {
            // Calculate the amount after applying discounts
            $amountAfterDiscounts = $invoice->totalBill - $invoice->discount - $invoice->specialDiscount;

            // Add to the total invoice amount
            $totalInvoiceAmount += $amountAfterDiscounts;

            // Calculate the total received (paid amount minus refund amount)
            $receivedAmount = $invoice->paidAmount - $invoice->refundAmount;
            $totalReceived += $receivedAmount;

            // Add to the total due amount
            $totalDue += $invoice->due;

            // Get month index for monthly totals and dues
            $monthIndex = Carbon::parse($invoice->created_at)->format('n') - 1;
            $monthlyTotals[$monthIndex] += $amountAfterDiscounts;
            $monthlyDues[$monthIndex] += $invoice->due;
        }

        // Build the monthly patient count array with month names and counts
        foreach ($months as $index => $month) {
            $monthlyPatientCount[] = [
                'name' => $month,
                'count' => $patientData[$index + 1] ?? 0 // Adjust index for month (1-based in DB)
            ];
        }

        // Return the response with calculated values and month names
        return response()->json([
            "status" => 200,
            "message" => "Invoices for the selected date range",
            "totalInvoiceCount" => $totalInvoiceCount,
            "totalInvoiceAmount" => $totalInvoiceAmount,
            "totalReceived" => $totalReceived,
            "totalDue" => $totalDue,
            'monthlyTotals' => $monthlyTotals,
            'monthlyDues' => $monthlyDues,
            'monthlyPatientCount' => $monthlyPatientCount, // Array of objects with month names and counts
        ]);
    }
}
