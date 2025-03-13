<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocPathology;
use DB;
use PDF;
use Mail;
use App\Mail\PathologyMail;

class GreatDocPathologyController extends Controller
{


    public function index($id)
    {
        $pathology = DB::table('mhp_great_doc_pathologies')->leftJoin('mhp_labratories', 'mhp_great_doc_pathologies.laboratory_id', 'mhp_labratories.id')->leftJoin('mhp_clinical_details', 'mhp_clinical_details.id', 'mhp_great_doc_pathologies.clinical_details_id')->select('mhp_great_doc_pathologies.*', 'mhp_labratories.labratory_name', 'mhp_clinical_details.clinical_details_name')->where('patient_id', $id)->get();

        return response()->json([
            'status' => 200,
            'pathology' => $pathology
        ]);
    }


    public function store(Request $request)
    {




        $pathology = new MhpGreatDocPathology();
        $pathology->request_date = $request->request_date;
        $pathology->laboratory_id = $request->laboratory_id;
        $pathology->favorite_test_name = implode(',', $request->favorite_test_name);
        $pathology->test_name = implode(',', $request->test_name);
        $pathology->lmp_date = $request->lmp_date;
        $pathology->edc_date = $request->edc_date;
        $pathology->pregnant = $request->pregnant;
        $pathology->billing = $request->billing;
        $pathology->clinical_details_fasting = $request->clinical_details_fasting;
        $pathology->clinical_details_id = $request->clinical_details_id;
        $pathology->extra_details = $request->extra_details;
        $pathology->further_clinical_details = $request->further_clinical_details;
        $pathology->patient_id = $request->patient_id;
        $pathology->save();


        $pathology_data = MhpGreatDocPathology::with('clinical_details', 'patient_details', 'laboratory_details')->where('patient_id', $request->patient_id)->where('id', $pathology->id)->latest('created_at')->first();
        // $all_pathology = MhpGreatDocPathology::where('patient_id', $request->patient_id)->get();
        if ($pathology_data->laboratory_details->logo) {
            if ($request->emailToPatient == "email-to-patient") {
                $pathology = PDF::loadView('pathology_mail_template', ['pathology' => $pathology_data, 'image' => $this->getImageDataUri($pathology_data->laboratory_details->logo)])->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);

                $pathology_pdf = $pathology->output();
                Mail::to($pathology_data->patient_details->patient_email)->send(new PathologyMail($pathology_pdf, $pathology_data));
            }
        }
        // $image = this->getImageDataUri($pathology->laboratory_details->logo);

        return response()->json([
            'status' => 200,
            'message' => 'Great Doc Pathology Added Successfully',
            'allTest' => $pathology_data
        ]);
    }

    private function getImageDataUri($imageName)
    {
        $imagePath = public_path('labotory/' . $imageName); // Adjust the path to your image
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageMimeType = mime_content_type($imagePath);
        return "data:{$imageMimeType};base64,{$imageData}";
    }
    public function destroy($id)
    {

        $del_slots = MhpGreatDocPathology::find($id);

        $del_slots->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Great Doc Pathology deleted Successfully',
        ]);
    }

    public function sendMail(Request $request, $id)
    {
        $patient_pathology = MhpGreatDocPathology::where('patient_id', $id)->get();

        $info = array(
            'name' => "test",
            'body' => "Test Mail"
        );

        Mail::send('mail.pathology_mail', $info, function ($message) {
            $message->to('tanvir.alam.zaimahtech@gmail.com', 'MHP')
                ->subject('HTML test eMail from MHP.');
            $message->from('karlosray@gmail.com', 'Karlos');
        });

        return response()->json([
            'status' => 200,
            'patient_pathology' => $patient_pathology
        ]);
    }
    public function mailTemplate()
    {

        try {
            $pathology = MhpGreatDocPathology::with('clinical_details', 'patient_details', 'laboratory_details')->where('patient_id', 11)->latest('created_at')->first();


            $pathology_with_pdf = PDF::loadView('pathology_mail_template', ['pathology' => $pathology, 'image' => $this->getImageDataUri($pathology->laboratory_details->logo)])->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);

            return $pathology_with_pdf->download('patient_report.pdf');
            return view('pathology_mail_template', compact('pathology'));
        } catch (\Exception $e) {
            return view('error', ['error' => $e->getMessage()]);
        }
    }

    public function emailToPatient($patient_id)
    {

        return response()->json([
            'status' => 200,
            'message' => "Pathology Mail Send Successfully",
        ]);
    }
}
