<?php

namespace App\Http\Controllers;

use App\Models\NewPathologySetup;
use Illuminate\Http\Request;
use Carbon\Carbon;
use PDF;
use Mail;
use Mpdf\Mpdf;
use App\Mail\RadiologyMail;

class NewPathologySetupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }


    public function sendEmailToPatient(Request $request)
    {

        // return response()->json($request->all());
        $all_pathology = $request->pathologies;
        $firstPathologyItem = isset($all_pathology[0]) ? $all_pathology[0] : null;
        $email_to_lab = $request->email_to_lab;

        if ($firstPathologyItem) {
            $logo = $firstPathologyItem['laboratory_details']['logo'] ?? null;
            $image = $logo ? $this->getImageDataUri($logo) : null;
            $websiteLink = $firstPathologyItem['laboratory_details']['websiteLink'] ?? null;
            $address = $firstPathologyItem['laboratory_details']['address'] ?? null;
            $email = $firstPathologyItem['laboratory_details']['email'] ?? null;
            $phone = $firstPathologyItem['laboratory_details']['phone'] ?? null;
            $fax = $firstPathologyItem['laboratory_details']['fax'] ?? null;
            $edcDate = $firstPathologyItem['edcDate'] ? Carbon::parse($firstPathologyItem['edcDate'])->format('d/m/Y') : null;
            $lmpDate = $firstPathologyItem['lmpDate'] ? Carbon::parse($firstPathologyItem['lmpDate'])->format('d/m/Y') : null;
            $concession = $firstPathologyItem[0]['concession'] ?? null;
            $fasting = $firstPathologyItem[0]['fasting'] ?? null;
            $pregnant = $firstPathologyItem[0]['pregnant'] ?? null;
            $labratory_name = $firstPathologyItem['laboratory_details']['labratory_name'] ?? null;
            $center_date = Carbon::parse($firstPathologyItem['created_at'])->format('d/m/Y');
            $doctorName = $request->doctorName;
            $doctor_id = $request->doctor_id;
            $organization_name = $request->organization_name;
            $patient_hn = $request->patient_hn;
            $pathologyReportHTML = view(
                'pathology_mail_template',
                [
                    'lmpDate' => $lmpDate,
                    'edcDate' => $edcDate,
                    'concession' => $concession,
                    'doctorName' => $doctorName,
                    'fasting' => $fasting,
                    'pregnant' => $pregnant,
                    'pathologies' => $all_pathology,
                    'center_date' => $center_date,
                    'image' => $image,
                    'patient_mobile' => $request->patient_mobile,
                    'patient_birth' => $request->patient_birth,
                    'patientName' => $request->patientName,
                    'patient_gender' => $request->patient_gender,
                    'websiteLink' => $websiteLink,
                    'address' => $address,
                    'branch_code' => $request->branch_code,
                    'email' => $email,
                    'phone' => $phone,
                    'fax' => $fax,
                    'labratory_name' => $labratory_name,
                    'doctor_id' => $doctor_id,
                    'organization_name' => $organization_name,
                    'patient_hn' => $patient_hn
                ]
            );
            $MPDF = new Mpdf([
                'default_font' => 'nikosh',
                'default_font_size' => 10,
                'default_font_color' => '#000',
                'margin_left' => 2,
                'margin_right' => 2,
                'margin_top' => 2,
                'margin_bottom' => 2,
                'orientation' => 'P',
                'mode' => 'utf-8',
                'format' => 'A4',
            ]);


            $MPDF->WriteHTML($pathologyReportHTML);
            $pathology_pdf = $MPDF->output('', 'S');

            // return $radiology->download('radiology.pdf');
            // $radiology = PDF::loadView('radiology_mail_template', ['radiology' => $radiology_data])
            //     ->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);

            if ($email_to_lab == 1 && $email) {
                Mail::to($request->patient_email)
                    ->cc($email)
                    ->send(new RadiologyMail($pathology_pdf, $all_pathology));
            } else {
                Mail::to($request->patient_email)
                    ->send(new RadiologyMail($pathology_pdf, $all_pathology));
            }
            return response()->json([
                'status' => 200,
                'message' => 'pathology email sent successfully',
            ]);
        }
    }


    private function getImageDataUri($imageName)
    {
        $imagePath = public_path('labotory/' . $imageName); // Adjust the path to your image
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageMimeType = mime_content_type($imagePath);
        return "data:{$imageMimeType};base64,{$imageData}";
    }
    public function getTodayPathology($id)
    {
        $todayDate = Carbon::today()->toDateString();
        $data = NewPathologySetup::with('laboratory_details')->where('patient_id', $id)->whereDate('created_at', $todayDate)->orderBy('id', 'desc')->get();
        if (!$data) {
            return response()->json([], 404);
        }
        return response()->json($data, 200);
    }
    public function pathologyPastHistoryTestReport($id)
    {
        $todayDate = Carbon::today()->toDateString();
        $data = NewPathologySetup::with('laboratory_details')
            ->where('patient_id', $id)
            ->whereDate('created_at', '<', $todayDate)
            ->orderBy('id', 'desc')
            ->get();

        if ($data->isEmpty()) {
            return response()->json([], 404);
        }

        return response()->json($data, 200);
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
        $header = $request->header();
        $branchData = getBranchData($header);
        $request['saas_branch_id'] = $branchData['branch_id'];
        $request['saas_branch_name'] = $branchData['branch_name'];
        NewPathologySetup::create($request->all());

        return response()->json([
            'data' => $request->all()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\NewPathologySetup  $newPathologySetup
     * @return \Illuminate\Http\Response
     */
    public function show(NewPathologySetup $newPathologySetup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\NewPathologySetup  $newPathologySetup
     * @return \Illuminate\Http\Response
     */
    public function edit(NewPathologySetup $newPathologySetup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NewPathologySetup  $newPathologySetup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NewPathologySetup $newPathologySetup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NewPathologySetup  $newPathologySetup
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = NewPathologySetup::find($id);
        $data->delete();
        return response()->json([
            'status' => 200
        ], 200);
    }
}
