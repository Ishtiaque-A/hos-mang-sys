<?php

namespace App\Http\Controllers\AdminSetupAppointment\Radiology;

use App\Http\Controllers\Controller;
use App\Mail\RadiologyMail;
use Illuminate\Http\Request;
use App\Models\MhpRadiology;
use PDF;
use Mail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Mpdf\Mpdf;

class RadiologyController extends Controller
{
    public function index($patient_id)
    {
        $todayDate = Carbon::today()->toDateString();

        $all_radiology = DB::table('mhp_radiologies')
            // ->leftJoin('mhp_radiology_centers', 'mhp_radiologies.center_id', 'mhp_radiology_centers.id')
            ->leftJoin('mhp_radiology_test_names', 'mhp_radiologies.test_name_id', 'mhp_radiology_test_names.radiology_test_type_id')
            ->leftJoin('mhp_clinical_indications', 'mhp_radiologies.clinical_id', 'mhp_clinical_indications.id')
            ->leftJoin('mhp_labratories', 'mhp_radiologies.center_id', 'mhp_labratories.id')
            ->where('mhp_radiologies.delete_status', 0)
            ->whereDate('mhp_radiologies.created_at', $todayDate)
            ->where('mhp_radiologies.patient_id', $patient_id)
            ->where('mhp_radiologies.delete_status', 0)
            ->select(
                'mhp_radiologies.*',
                'mhp_radiologies.radiology_test_name',
                'mhp_clinical_indications.clinical_indications_name',
                'mhp_labratories.labratory_name',
                'mhp_labratories.address',
                'mhp_labratories.phone',
                'mhp_labratories.fax',
                'mhp_labratories.email',
                'mhp_labratories.websiteLink',
                'mhp_labratories.logo',
            )
            ->orderBy('mhp_radiologies.id', 'desc')
            ->get();
        // $all_radiology = MhpRadiology::where('patient_id', $patient_id)->get();

        return response()->json(
            ['status' => 200, 'all_radiology' => $all_radiology]
        );
    }
    public function RadiologyPastHistoryTestReport($id)
    {
        $todayDate = Carbon::today()->toDateString();
        // $data = 
        //     ->where('patient_id', $id)
        //     ->whereDate('created_at', '<', $todayDate)
        //     ->orderBy('id', 'desc')
        //     ->get();
        $data = DB::table('mhp_radiologies')
            ->leftJoin('mhp_radiology_test_names', 'mhp_radiologies.test_name_id', 'mhp_radiology_test_names.radiology_test_type_id')
            ->leftJoin('mhp_clinical_indications', 'mhp_radiologies.clinical_id', 'mhp_clinical_indications.id')
            ->leftJoin('mhp_labratories', 'mhp_radiologies.center_id', 'mhp_labratories.id')
            ->where('mhp_radiologies.delete_status', 0)
            ->whereDate('mhp_radiologies.created_at', '<', $todayDate) // Specify the table for created_at
            ->where('mhp_radiologies.patient_id', $id)
            ->select(
                'mhp_radiologies.*',
                'mhp_radiologies.radiology_test_name',
                'mhp_clinical_indications.clinical_indications_name',
                'mhp_labratories.labratory_name',
                'mhp_labratories.address',
                'mhp_labratories.phone',
                'mhp_labratories.fax',
                'mhp_labratories.email',
                'mhp_labratories.websiteLink',
                'mhp_labratories.logo',
            )
            ->orderBy('mhp_radiologies.id', 'desc')
            ->get();

        if ($data->isEmpty()) {
            return response()->json([], 404);
        }

        return response()->json($data, 200);
    }


    public function generateMPDFStatic()
    {

        $jsonData = '{"id":110,"patientName":"Tan Vir","doctorName":"Dr Shihab Sabbir","patient_gender":"Male","patient_birth":"1986-03-09","patient_mobile":"+8801704338645","patient_email":"tanvir.alam.zaimahtech@gmail.com","radiologies":[{"id":44,"center_date":"2024-03-19T06:19:38.208Z","center_id":"6","test_date":null,"test_name_id":"935","test_type_id":"935","symptom_name":null,"clinical_id":"4","additional_test_name":null,"patient_id":"110","delete_status":0,"created_at":"2024-03-19 12:19:38","updated_at":"2024-03-19 12:19:38","radiology_test_name":"CT Myelogram of Lumber Spine","radiology_test_category":"CT SCAN","clinical_indications_name":"RIF abdominal pain","labratory_name":"Labaid","address":"Dhanmondi, Dhaka ,1209","phone":"8976876786","fax":"98097987","email":"snehoehlmanager@gmail.com","websiteLink":"https://labaidgroup.com/","logo":"84192a_specialized.jpg"},{"id":43,"center_date":"2024-03-19T06:19:30.385Z","center_id":"6","test_date":null,"test_name_id":"936","test_type_id":"936","symptom_name":null,"clinical_id":"4","additional_test_name":null,"patient_id":"110","delete_status":0,"created_at":"2024-03-19 12:19:31","updated_at":"2024-03-19 12:19:31","radiology_test_name":"CT Nasopharynx","radiology_test_category":"CT SCAN","clinical_indications_name":"RIF abdominal pain","labratory_name":"Labaid","address":"Dhanmondi, Dhaka ,1209","phone":"8976876786","fax":"98097987","email":"snehoehlmanager@gmail.com","websiteLink":"https://labaidgroup.com/","logo":"84192a_specialized.jpg"},{"id":42,"center_date":"2024-03-19T06:19:24.816Z","center_id":"6","test_date":null,"test_name_id":"928","test_type_id":"928","symptom_name":null,"clinical_id":"4","additional_test_name":null,"patient_id":"110","delete_status":0,"created_at":"2024-03-19 12:19:25","updated_at":"2024-03-19 12:19:25","radiology_test_name":"CT GUIDED CORE BIOPSY","radiology_test_category":"CT SCAN","clinical_indications_name":"RIF abdominal pain","labratory_name":"Labaid","address":"Dhanmondi, Dhaka ,1209","phone":"8976876786","fax":"98097987","email":"snehoehlmanager@gmail.com","websiteLink":"https://labaidgroup.com/","logo":"84192a_specialized.jpg"}],"patient_hn":"HN-1000000110","organization_name":"MHP","doctor_id":"HN-1002"}';
        $radiologyData = json_decode($jsonData, true);
        $all_radiology = $radiologyData['radiologies'] ?? null;
        $firstRadiologyItem = $all_radiology[0] ?? null;

        if ($firstRadiologyItem) {


            $logo = $firstRadiologyItem['logo'] ?? null;
            $image = $logo ? $this->getImageDataUri($logo) : null;
            $websiteLink = $firstRadiologyItem['websiteLink'] ?? null;
            $address = $firstRadiologyItem['address'] ?? null;
            $email = $firstRadiologyItem['email'] ?? null;
            $phone = $firstRadiologyItem['phone'] ?? null;
            $fax = $firstRadiologyItem['fax'] ?? null;
            $labratory_name = $firstRadiologyItem['labratory_name'] ?? null;
            $center_date = Carbon::parse($firstRadiologyItem['created_at'])->format('d/m/Y');
            $doctorName = $radiologyData['doctorName'];
            $doctor_id = $radiologyData['doctor_id'];
            $organization_name = $radiologyData['organization_name'];
            $patient_hn = $radiologyData['patient_hn'];


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
            $radiologyReportHTML = view(
                'radiology_mail_template',
                [
                    'radiology' => $all_radiology,
                    'center_date' => $center_date,
                    'image' => $image,
                    'patient_mobile' => $radiologyData['patient_mobile'],
                    'doctorName' => $doctorName,
                    'patient_birth' => $radiologyData['patient_birth'],
                    'patientName' => $radiologyData['patientName'],
                    'patient_gender' => $radiologyData['patient_gender'],
                    'websiteLink' => $websiteLink,
                    'address' => $address,
                    'email' => $email,
                    'phone' => $phone,
                    'fax' => $fax,
                    'labratory_name' => $labratory_name,
                    'doctor_id' => $doctor_id,
                    'organization_name' => $organization_name,
                    'patient_hn' => $patient_hn
                ]
            );
            $MPDF->WriteHTML($radiologyReportHTML);
            $MPDF->Output();
        }
    }

    public function radiologyPdfSend(Request $request)
    {
        // $todayDate = Carbon::today()->toDateString();

        $all_radiology = $request->radiologies;
        $firstRadiologyItem = $all_radiology[0] ?? null;
        $email_to_lab = $request->email_to_lab;

        if ($firstRadiologyItem) {

            $logo = $firstRadiologyItem['logo'] ?? null;
            $image = $logo ? $this->getImageDataUri($logo) : null;
            $websiteLink = $firstRadiologyItem['websiteLink'] ?? null;
            $address = $firstRadiologyItem['address'] ?? null;
            $email = $firstRadiologyItem['email'] ?? null;
            $phone = $firstRadiologyItem['phone'] ?? null;
            $fax = $firstRadiologyItem['fax'] ?? null;
            $labratory_name = $firstRadiologyItem['labratory_name'] ?? null;
            $center_date = Carbon::parse($firstRadiologyItem['created_at'])->format('d/m/Y');
            $doctorName = $request->doctorName;
            $doctor_id = $request->doctor_id;
            $organization_name = $request->organization_name;
            $patient_hn = $request->patient_hn;

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
            $radiologyReportHTML = view(
                'radiology_mail_template',
                [
                    'radiology' => $all_radiology,
                    'center_date' => $center_date,
                    'image' => $image,
                    'patient_mobile' => $request->patient_mobile,
                    'doctorName' => $doctorName,
                    'patient_birth' => $request->patient_birth,
                    'patientName' => $request->patientName,
                    'patient_gender' => $request->patient_gender,
                    'websiteLink' => $websiteLink,
                    'address' => $address,
                    'email' => $email,
                    'phone' => $phone,
                    'branch_code' => $request->branch_code,
                    'fax' => $fax,
                    'labratory_name' => $labratory_name,
                    'doctor_id' => $doctor_id,
                    'organization_name' => $organization_name,
                    'patient_hn' => $patient_hn
                ]
            );
            $MPDF->WriteHTML($radiologyReportHTML);
            $radiology_pdf = $MPDF->output('', 'S');
            // return $radiology->download('radiology.pdf');
            // $radiology = PDF::loadView('radiology_mail_template', ['radiology' => $radiology_data])
            //     ->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);
            // $radiology_pdf = $radiology->output();

            if ($email_to_lab == 1 && $firstRadiologyItem['email'] != null) {
                Mail::to($request->patient_email)
                    ->cc($firstRadiologyItem['email'])
                    ->send(new RadiologyMail($radiology_pdf, $all_radiology));
            } else {
                Mail::to($request->patient_email)
                    ->send(new RadiologyMail($radiology_pdf, $all_radiology));
            }
            return response()->json([
                'status' => 200,
                'message' => 'Radiology email sent successfully',
            ]);
        }
    }


    public function store(Request $request)
    {
        try {
            $radiology = new MhpRadiology();
            $header = $request->header();
            $branch = getBranchData($header);
            $radiology->fill([
                'center_id' => $request->center_id,
                'test_date' => $request->test_date ?? null,
                'symptom_name' => $request->symptom_name ? implode(',', $request->symptom_name) : null,
                'center_date' => $request->center_date,
                'test_type_id' => $request->test_type_id,
                'clinical_id' => $request->clinical_id,
                'test_name_id' => $request->test_name_id,
                'radiology_test_category' => $request->radiology_test_category,
                'radiology_test_name' => $request->radiology_test_name,
                'additional_test_name' => $request->additional_test_name,
                'patient_id' => $request->patient_id,
                'saas_branch_id' => $branch['branch_id'],
                'saas_branch_name' => $branch['branch_name'],
            ]);
            $radiology->save();

            $radiology_data = MhpRadiology::with('patient_details', 'laboratory_details', 'radiology_test_type')
                ->where('patient_id', $request->patient_id)->where('id', $radiology->id)
                ->latest('created_at')
                ->first();

            if ($request->emailToPatient == "email-to-patient") {
                $radiology = PDF::loadView('radiology_mail_template', [
                    'radiology' => $radiology_data,
                    'image' => $this->getImageDataUri($radiology_data->laboratory_details->logo),
                ])->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);
                $radiology_pdf = $radiology->output();

                Mail::to($radiology_data->patient_details->patient_email)
                    ->send(new RadiologyMail($radiology_pdf, $radiology_data));
            }

            return response()->json(['status' => 200, 'message' => 'Radiology Added Successfully', 'data' => $radiology_data]);
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(['status' => 500, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
    public function destroy($id)
    {

        $del_radiology = MhpRadiology::find($id);
        $del_radiology->delete();
        return response()->json(['message' => 'Radiology deleted successfully'], 200);

        // $del_radiology = MhpRadiology::where('id', $id)->where('delete_status', 0)->first();

        // if ($del_radiology) {

        //     if ($del_radiology->delete_status == 0) {

        //         $del_radiology->delete_status = 1;
        //         $del_radiology->save();

        //         return response()->json([
        //             'status' => 200,
        //             'message' => 'Radiology status updated successfully',
        //         ]);
        //     } else {
        //         return response()->json([
        //             'status' => 404,
        //             'message' => 'No Radiology Found',
        //         ]);
        //     }
        // } else {
        //     return response()->json([
        //         'status' => 404,
        //         'message' => 'No Radiology Found',
        //     ]);
        // }
    }


    public function emailToPatient()
    {
        $radiology_data = MhpRadiology::with('patient_details', 'laboratory_details', 'radiology_test_type', 'radiology_test_name')->where('patient_id', 11)->latest('created_at')->first();

        return view('radiology_mail_template', [
            'radiology' => $radiology_data,
            'image' => $this->getImageDataUri($radiology_data->laboratory_details->logo),
        ]);
        $radiology = PDF::loadView('radiology_mail_template', ['radiology' => $radiology_data, 'image' => $this->getImageDataUri($radiology_data->laboratory_details->logo)])
            ->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);
        return $radiology->download('radiology.pdf');
        $radiology = PDF::loadView('radiology_mail_template', ['radiology' => $radiology_data])
            ->setOptions(['isHtml5ParserEnabled' => false, 'isRemoteEnabled' => true]);
        $radiology_pdf = $radiology->output();

        Mail::to($radiology_data->patient_details->patient_email)
            ->send(new RadiologyMail($radiology_pdf, $radiology_data));
        return response()->json([
            'status' => 200,
            'message' => 'Radiology email sent successfully',
        ]);
    }


    private function getImageDataUri($imageName)
    {
        $imagePath = public_path('labotory/' . $imageName); // Adjust the path to your image
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageMimeType = mime_content_type($imagePath);
        return "data:{$imageMimeType};base64,{$imageData}";
    }
}
