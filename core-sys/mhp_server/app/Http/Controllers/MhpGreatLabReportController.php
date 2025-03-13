<?php

namespace App\Http\Controllers;

use App\Models\MhpGreatLabReport;
use App\Models\MhpGreatLabReportDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MhpGreatLabReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     */
    public function dbDownload()
    {
        $databaseName = DB::connection()->getDatabaseName();
        $backupFileName = 'database_backup_' . date('Y-m-d_H-i-s') . '.sql';
        $backupPath = storage_path('app/' . $backupFileName);

        exec("mysqldump -u " . env('DB_USERNAME') . " -p" . env('DB_PASSWORD') . " $databaseName > $backupPath");

        return new BinaryFileResponse($backupPath);
    }
    public function sendSMSToPatient(Request $request)
    {
        $mobile = $request->mobile;
        $sms = $request->sms;
        // $sms = urlencode($sms);

        $url = 'https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php';
        $userName = 'fauziaali2000@gmail.com';
        $password = '80f50e35f83130f022e78a2862aab390';

        $params = [
            'masking' => 'NOMASK',
            'userName' => $userName,
            'password' => $password,
            'MsgType' => 'TEXT',
            'receiver' => $mobile,
            'message' => $sms,
        ];

        $url .= '?' . http_build_query($params);

        // Set up options for the HTTP request
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
            ],
        ];

        // Create a stream context
        $context = stream_context_create($options);

        // Make the request and get the response
        $result = file_get_contents($url, false, $context);

        // Handle the response (you may need to adjust this based on the actual API response format)
        $responseData = json_decode($result, true);

        if ($responseData && $responseData[0]['success'] === 1) {
            // SMS sent successfully
            return response()->json(['status' => 'success',], 200);
        } else {
            // Failed to send SMS
            return response()->json(['status' => 'error', 'message' => 'Failed to send SMS'], 500);
        }
    }
    public function index()
    {
        $data = MhpGreatLabReport::orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All report",
            "report" => $data
        ]);
    }
    public function editReport($id)
    {
        $data = MhpGreatLabReport::find($id);
        return response()->json([
            "status" => 200,
            "message" => "Edit Report",
            "report" => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $header = $request->header();
        $branchData = getBranchData($header);
        if ($files = $request->file('technician_sign')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/lab/', $name);
        } else {
            $name = "";
        }
        if ($filesReport = $request->file('radiogyReportImage')) {
            $reportImg = $filesReport->getClientOriginalName();
            $reportImg = rand(111, 99999) . $reportImg;
            $filesReport->move('images/lab/', $reportImg);
        } else {
            $reportImg = "";
        }
        if ($filesReportDetails = $request->file('radiologyReportDetails')) {
            $reportFile = $filesReportDetails->getClientOriginalName();
            $reportFile = rand(111, 99999) . $reportFile;
            $filesReportDetails->move('images/lab/', $reportFile);
        } else {
            $reportFile = "";
        }
        $data  = new MhpGreatLabReport();
        $data->saas_branch_id = $branchData['branch_id'];
        $data->saas_branch_name = $branchData['branch_name'];
        $data->invoice_id = $request->invoice_id;
        $data->invoice_no = $request->invoice_no;
        $data->patient_id = $request->patient_id;
        $data->test_id = $request->test_id;
        $data->test_name = $request->test_name;
        $data->test_group = $request->test_group;
        $data->test_category = $request->test_category;
        $data->gender = $request->gender;
        $data->technician_name = $request->technician_name;
        if ($files != null) {
            $data->technician_sign = $name;
        } else {
            $data->technician_sign = $request->technician_sign;
        }
        $data->validator = $request->validator;
        $data->status = $request->status;
        $data->remark = $request->remark;
        if ($filesReportDetails != null) {
            $data->radiogyReportImage = $reportFile;
        } else {
            $data->radiologyReportDetails = $request->radiologyReportDetails;
        }

        if ($filesReport != null) {
            $data->radiogyReportImage = $reportImg;
        } else {
            $data->radiogyReportImage = $request->radiogyReportImage;
        }
        $data->save();
        $details = json_decode($request->details, true);
        foreach ($details as $key => $detail) {
            $dt  = new MhpGreatLabReportDetails();
            $dt->report_id = $data->id;
            $dt->test_id = $request->test_id;
            $dt->patient_id = $request->patient_id;
            $dt->invoice_id = $request->invoice_id;
            $dt->parameter_id = $detail['id'];
            $dt->parameter_name = $detail['parameter_name'];
            $dt->result = isset($detail['result']) ? $detail['result'] : null;
            $dt->unit = $detail['parameter_unit'];
            $dt->lower_value = null;
            $dt->upper_value = null;
            $dt->flag = null;
            $dt->lab_no = 1;
            $dt->parameter_group_id = $detail['parameter_group_id'];
            $dt->save();
        }


        return response()->json([
            "status" => 200,
            "message" => "Lab report created successfully",
            "report" => $data
        ]);
    }
    public function updateReport(Request $request, $id)
    {
        if ($files = $request->file('technician_sign')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/lab/', $name);
        } else {
            $name = "";
        }
        if ($filesReport = $request->file('radiogyReportImage')) {
            $reportImg = $filesReport->getClientOriginalName();
            $reportImg = rand(111, 99999) . $reportImg;
            $filesReport->move('images/lab/', $reportImg);
        } else {
            $reportImg = "";
        }
        if ($filesReportDetails = $request->file('radiologyReportDetails')) {
            $reportFile = $filesReportDetails->getClientOriginalName();
            $reportFile = rand(111, 99999) . $reportFile;
            $filesReportDetails->move('images/lab/', $reportFile);
        } else {
            $reportFile = "";
        }
        $data  = MhpGreatLabReport::find($id);
        $data->invoice_id = $request->invoice_id;
        $data->invoice_no = $request->invoice_no;
        $data->patient_id = $request->patient_id;
        $data->test_id = $request->test_id;
        $data->test_name = $request->test_name;
        $data->test_group = $request->test_group;
        $data->gender = $request->gender;
        $data->technician_name = $request->technician_name;
        if ($files != null) {
            $data->technician_sign = $name;
        }
        $data->validator = $request->validator;
        $data->status = $request->status;
        if ($filesReportDetails != null) {
            $data->radiologyReportDetails = $reportFile;
        }
        if ($filesReport != null) {
            $data->radiogyReportImage = $reportImg;
        }
        $data->remark = $request->remark;
        $data->update();
        $details = json_decode($request->details, true);
        foreach ($details as $key => $detail) {
            $dt  = MhpGreatLabReportDetails::find($detail['id']);
            $dt->result = $detail['result'];
            $dt->save();
        }
        return response()->json([
            "status" => 200,
            "message" => "Lab report updated successfully",
            "report" => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // test report details
    public function store(Request $request)
    {
        $data  = new MhpGreatLabReportDetails();
        $data->report_id = $request->report_id;
        $data->test_id = $request->test_id;
        $data->patient_id = $request->patient_id;
        $data->invoice_id = $request->invoice_id;
        $data->parameter_id = $request->parameter_id;
        $data->parameter_name = $request->parameter_name;
        $data->result = $request->result;
        $data->unit = $request->unit;
        $data->lower_value = $request->lower_value;
        $data->upper_value = $request->upper_value;
        $data->flag = $request->flag;
        $data->lab_no = $request->lab_no;
        $data->parameter_group_id = $request->parameter_group_id;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Lab report details added successfully",
            "report" => $data
        ]);
    }
    public function reportById($id)
    {
        $data = MhpGreatLabReport::with('details', 'parameterGroup')->find($id);
        return response()->json([
            "status" => 200,
            "message" => "Lab reports",
            "report" => $data
        ]);
    }
    public function reportByInvoice($id)
    {
        $data = MhpGreatLabReport::with('details', 'parameterGroup', 'test_only')
            ->where('invoice_id', $id)
            ->get()
            ->groupBy('test_category')
            ->map(function ($category, $testCategoryName) {
                return [
                    'category' => $testCategoryName,
                    'date' => $category->first()->updated_at,
                    'group' => $category->first()->test_group,
                    'tests' => $category->map(function ($test) {
                        return $test->toArray();  // Return all test fields as an array
                    })->toArray()
                ];
            })->values()->toArray();
        return response()->json([
            "status" => 200,
            "message" => "Lab reports",
            "report" => $data
        ]);
    }
    public function comparisonReportById($id)
    {
        $data = MhpGreatLabReport::with('details', 'parameterGroup')->find($id);
        $report = MhpGreatLabReport::with('details', 'parameterGroup')
            ->where(['patient_id' => $data->patient_id, 'test_id' => $data->test_id, 'id' => '!=', $id])
            ->orderBy('id', 'desc')
            ->take(3)
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "Lab reports",
            "report" => $data
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpGreatLabReport  $mhpGreatLabReport
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $data = MhpGreatLabReportDetails::orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "Lab report details ",
            "report" => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpGreatLabReport  $mhpGreatLabReport
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpGreatLabReport $mhpGreatLabReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpGreatLabReport  $mhpGreatLabReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data  = MhpGreatLabReportDetails::find($id);
        // $data->report_id = $request -> report_id;
        // $data->test_id = $request -> test_id;
        // $data->patient_id = $request -> patient_id;
        // $data->invoice_id = $request -> invoice_id;
        // $data->parameter_id = $request -> parameter_id;
        // $data->parameter_name = $request -> parameter_name;
        $data->result = $request->result;
        // $data->unit = $request -> unit;
        // $data->ref_range = $request -> ref_range;
        // $data->flag = $request -> flag;
        // $data->lab_no = $request -> lab_no;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Lab report details updated successfully",
            "report" => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpGreatLabReport  $mhpGreatLabReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpGreatLabReport $mhpGreatLabReport)
    {
        //
    }
}
