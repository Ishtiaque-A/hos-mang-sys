<?php

namespace App\Http\Controllers;

use App\Models\mhpPrescriptionSetup;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Support\Facades\Mail;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use PDF;
use Mpdf\Mpdf;
// use App\Http\Mail\EScriptMail;
use App\Mail\EScriptMail;
use DateTime;

class EmailController extends Controller
{

    public function index()
    {
        return view('emails.attachment.e_invoice');
    }


    public function generatePDF()
    {
        // $dompdf = new Dompdf();
        // $html = view('emails.attachment.e_invoice',$data)->render();
        // $dompdf->loadHtml($html);
        // $dompdf->setPaper('A4', 'portrait');
        // $dompdf->render();
        // $output = $dompdf->output();
        // return $output;
    }


    private function getImageDataUri($imageName, $isInSideImgPath = true)
    {
        $imagePath = '';
        if ($isInSideImgPath) {
            $imagePath = public_path('images/' . $imageName);
        } else {
            $imagePath = public_path($imageName);
        }
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageMimeType = mime_content_type($imagePath);
        return "data:{$imageMimeType};base64,{$imageData}";
    }


    private function loadHtmlAndSendEmailForDefault($viewFile, $email, $data)
    {
        // try {
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

        // Set HTML header and footer
        $MPDF->SetHTMLHeader([
            'html' => view('admin.default_header', [
                'doctorInfo' => $data['doctorInfo'],
                'organization' => $data['organization'],
            ])->render(),
        ]);
        $MPDF->SetHTMLFooter([
            'html' => view('admin.default_footer', [
                'doctorInfo' => $data['doctorInfo'],
                'organization' => $data['organization'],
            ])->render(),
        ]);

        // Loop through medicines to generate multiple pages
        $medicines = $data['medicines'];
        $pageSize = 11;
        $numMedicines = count($medicines);
        $numPages = ceil($numMedicines / $pageSize);

        for ($page = 0; $page < $numPages; $page++) {
            $start = $page * $pageSize;
            $end = min($start + $pageSize, $numMedicines);
            $pageMedicines = array_slice($medicines, $start, $end - $start);
            $data['medicines'] = $pageMedicines;

            // Generate HTML for the current page
            $generateHTMLPage = view($viewFile, $data)->render();

            // Write HTML for the current page
            $MPDF->WriteHTML($generateHTMLPage);

            // Add page break if there are more medicines
            if ($page < $numPages - 1) {
                $MPDF->AddPage();
            }
        }
        // Output PDF as string
        $generatedPDF = $MPDF->Output('', 'S');

        // Send email with PDF attachment
        Mail::to($email)->send(new EScriptMail($generatedPDF, $data));
        // } catch (\Throwable $th) {
        //     throw $th;
        // }
    }
    private function loadHtmlAndSendEmailForLocal($viewFile, $email, $data)
    {
        // try {
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

        // Set HTML header and footer
        $MPDF->SetHTMLHeader([
            'html' => view('admin.local_header', [
                'data' => $data,
            ])->render(),
        ]);
        $MPDF->SetHTMLFooter([
            'html' => view('admin.local_footer', [
                'data' => $data,
            ])->render(),
        ]);

        // Loop through medicines to generate multiple pages
        $medicines = $data['medicines'];
        $pageSize = $data['use_header'] == 1 && $data['use_footer'] == 1 ? 10 : 11;
        $numMedicines = count($medicines);
        $numPages = ceil($numMedicines / $pageSize);

        for ($page = 0; $page < $numPages; $page++) {
            $start = $page * $pageSize;
            $end = min($start + $pageSize, $numMedicines);
            $pageMedicines = array_slice($medicines, $start, $end - $start);
            $data['medicines'] = $pageMedicines;
            $showAdvices = ($page == $numPages - 1) ? 1 : 0;
            $startRxIndex = $start + 1;

            // Generate HTML for the current page
            $generateHTMLPage = view($viewFile, compact('data', 'showAdvices', 'startRxIndex'))->render();

            // Write HTML for the current page
            $MPDF->WriteHTML($generateHTMLPage);

            // Add page break if there are more medicines
            if ($page < $numPages - 1) {
                $MPDF->AddPage();
            }
        }
        // Output PDF as string
        $generatedPDF = $MPDF->Output('', 'S');

        // Send email with PDF attachment
        Mail::to($email)->send(new EScriptMail($generatedPDF, $data));
        // } catch (\Throwable $th) {
        //     throw $th;
        // }
    }


    private function  calculateAge($birthDay)
    {
        $today = new DateTime();
        $birthDate = new DateTime($birthDay);

        $diff = $today->diff($birthDate);

        if ($diff->y === false) {
            return "N/A";
        } else {
            $ageString = [];

            if ($diff->y > 0) {
                $ageString[] = $diff->y . " Y";
            }

            if ($diff->m > 0) {
                $ageString[] = $diff->m . " M";
            }

            if ($diff->d > 0) {
                $ageString[] = $diff->d . " D";
            }

            return implode(", ", $ageString);
        }
    }

    public function sendEScriptUsingEmail(Request $request)
    {
        // try {
        $prescriptionType = $request->prescriptionType;
        $medicines = $request['rx'];
        $advices = $request['advices'];
        $doctorInfo = $request['doctorInfo'];
        $patientInfo = $request['patientInfo'];
        $organization = $request['organization'];
        // $birthdate = $request['patientInfo']['dob'];

        $age = $request['patientInfo']['age'];
        $defaultPrescriptionImg = $this->getImageDataUri('qr.png');
        $localPrescriptionImg = $this->getImageDataUri('rx.svg');
        $barCodeImage = $this->getImageDataUri('barcode.png');
        $todayDate = date('d/m/Y');
        $chiefComplaints = $request['chiefComplaints'];
        $investigation = $request['investigation'];
        $prescriptionCode = $request['prescriptionCode'];
        $prescriptionData = $request['prescriptionData'];

        if ($prescriptionType === 'local') {


            $data = [
                'medicines' => $medicines,
                'advices' => $advices,
                'doctorInfo' => $doctorInfo,
                'patientInfo' => $patientInfo,
                'organization' => $organization,
                'patientAge' => $age,
                'img' => $localPrescriptionImg,
                'todayDate' => $todayDate,
                'chief_complaints' => $chiefComplaints,
                'investigation' => $investigation,
                'localPrescriptionImg' => $localPrescriptionImg,
                'barCodeImage' => $barCodeImage,
                'showAdvices' => 0,
                'prescriptionCode' => $prescriptionCode,
                'header_content' => $prescriptionData['header_content'],
                'footer_content' => $prescriptionData['footer_content'],
                'use_footer' => $prescriptionData['use_footer'],
                'use_header' => $prescriptionData['use_header'],
                'use_doctor_signature' => $prescriptionData['use_doctor_signature']
            ];
            if ($prescriptionData['use_doctor_signature'] === 1) {
                $doctorSignatureImg = $this->getImageDataUri($prescriptionData['doctor_signature'], false);
                $data['doctor_signature'] = $doctorSignatureImg;
            }
            $this->loadHtmlAndSendEmailForLocal('admin.local_prescription', $patientInfo['email'], $data);
            return response()->json([
                'success' => 'success',
                'data' => $request->all(),
                'investigation' => $investigation,
                'chiefComplaints' => $chiefComplaints
            ], 200);
        } else {
            $data =  [
                'medicines' => $medicines,
                'advices' => $advices,
                'doctorInfo' => $doctorInfo,
                'patientInfo' => $patientInfo,
                'investigation' => $investigation,
                'chiefComplaints' => $chiefComplaints,
                'organization' => $organization,
                'patientAge' => $age,
                'img' => $defaultPrescriptionImg,
                'todayDate' => $todayDate,
            ];
            $this->loadHtmlAndSendEmailForDefault('admin.default_prescription', $patientInfo['email'], $data);
            return response()->json([
                'success' => 'success',
                // 'data' => $request->all()
            ], 200);
        }


        // } catch (\Exception $e) {
        //     // Handle the exception here
        //     return response()->json([
        //         'error' => 'An error occurred',
        //         'message' => $e->getMessage(),
        //     ], 500);
        // }
        // return response()->json([
        //     'error' => 'An unexpected error occurred',
        //     'message' => 'The server encountered an unexpected issue.',
        // ], 500);
    }
    // public function sendEScriptUsingEmail(Request $request)
    // {
    //     try {
    //         // Get the data URI PDF file from the request
    //         $dataUri = $request->input('file');

    //         // Decode the data URI to get the binary PDF data
    //         $pdfData = base64_decode(preg_replace('#^data:application/\w+;base64,#i', '', $dataUri));

    //         // Save the binary PDF data to a temporary file
    //         $tempFilePath = storage_path('app/temp_pdf/prescription_temp.pdf');
    //         File::put($tempFilePath, $pdfData);

    //         // Convert the PDF to another format (e.g., save it as an image)
    //         // Modify this part according to your specific requirements
    //         // For example, using the Spatie PDF to Image package
    //         $convertedImage = PDF::loadFile($tempFilePath)->saveImage(storage_path('app/pdf_images/prescription_image.jpg'));

    //         // Now you have the converted image, and you can save it or process it further

    //         // Remove the temporary PDF file
    //         File::delete($tempFilePath);

    //         return response()->json(['message' => 'File converted and saved successfully', 'image_path' => $convertedImage]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage(), 'err' => $e], 500);
    //     }
    // }
    // public function sendEScriptUsingEmail(Request $request)
    // {
    //     // try {
    //     $file = $request->file('file');
    //     $path = $file->storeAs('pdf', 'prescription.pdf');
    //     return response()->json(['message' => 'Blob file saved successfully', 'filename' => $path]);
    //     // } catch (\Exception $e) {
    //     //     return response()->json(['error' => $e->getMessage()], 500);
    //     // }
    // }

    // public function sendEScriptUsingEmail(Request $request)
    // {

    //     // $img_RX = $this->getImageDataUri('rx.svg');
    //     // $img_QR = $this->getImageDataUri('qr.png');
    //     // $data = $request->all();
    //     // $doctor_id = $data['doctorInfo']['docId'];
    //     // if (!$doctor_id) {
    //     //     return response()->json([
    //     //         'message' => 'Doctor Id is required',
    //     //     ], 400);
    //     // }

    //     // return $data;

    //     // $presSetup = mhpPrescriptionSetup::where('doctor_id', $doctor_id)->get()->first();
    //     // if (is_null($presSetup) || $presSetup->prescription_type === 'default') {

    //     //     $pdfContent =  FacadePdf::loadView('admin.default_prescription', compact('img_QR', 'data'))->setOptions(['defaultFont' => 'sans-serif']);
    //     // } else {

    //     //     $pdfContent =  FacadePdf::loadView('admin.local_prescription', compact('img_RX', 'data'))->setOptions(['defaultFont' => 'sans-serif']);
    //     // }

    //     // $pdfContent =  FacadePdf::loadView('admin.default_prescription', compact('img_QR', 'data'))->setOptions(['defaultFont' => 'sans-serif']);



    //     // return $pdfContent;

    //     // $details = [
    //     //     'name' => $data['patientInfo']['name'],
    //     //     'title' => 'E-Script prescription',
    //     //     'patientInfo' => $request->patientInfo,
    //     //     'body' => 'It is important that you take the medication exactly as prescribed in order to achieve the best possible results.
    //     //     f you experience any unexpected side effects or have any concerns about your medication, please do not hesitate to contact me.
    //     //     '
    //     // ];

    //     // $email = $request->email;
    //     // // $file = $request->file('file');
    //     // $base64Blob = $request->input('file');

    //     $base64Blob = $request->input('file');

    //     // Decode Base64 to binary
    //     $binaryBlob = base64_decode($base64Blob);

    //     // Generate a unique filename for the saved file
    //     $filename = Str::random(10) . '.pdf';

    //     // Save the binary Blob to a file
    //     file_put_contents(storage_path("app/public/{$filename}"), $binaryBlob);

    //     return response()->json(['message' => 'Blob file saved successfully', 'filename' => $filename], 200);

    //     // Decode Base64 to binary
    //     // $binaryBlob = base64_decode($base64Blob);

    //     // // Save the binary Blob to a file or attach it to an email
    //     // // Adjust this part based on your specific use case
    //     // file_put_contents(storage_path('prescription.pdf'), $binaryBlob);
    //     // Mail::to($email)->send(new \App\Mail\EScriptMail($binaryBlob));
    //     // return response()->json("Email sent with attached prescription.");
    // }


    public function sendEmail(Request $request)
    {
        $reqData = [
            'medicen' => $request->medicen,
            'patientInfo' => $request->patientInfo,
            'docdata' => $request->docdata
        ];

        // $output = $this->generatePDF();

        $dompdf = new Dompdf();
        $html = view('emails.attachment.e_invoice', $reqData)->render();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $output = $dompdf->output();

        $filename = 'invoice.pdf';
        Storage::disk('local')->put($filename, $output);
        $file_path = storage_path('app/' . $filename);


        $details = [
            'title' => 'E-Script prescription',
            'patientInfo' => $request->patientInfo,
            'body' => 'It is important that you take the medication exactly as prescribed in order to achieve the best possible results.
            f you experience any unexpected side effects or have any concerns about your medication, please do not hesitate to contact me.
            ',
            'pdfFile' => $request->pdfFile
        ];

        Mail::to($request->patientInfo['patient_email'])->send(new \App\Mail\EScriptMail($details, $file_path, $filename));

        return response()->json("Email is Sent.");
        // dd("Email is Sent.");
    }
    // public function sendEmail(Request $request)
    // {
    //     $file_path =  $request->file('pdfFile'); 
    //     $filename = 'myfile.pdf';


    //     $details = [
    //         'title' => 'Mail from title',
    //         'body' => 'This is for testing email using smtp',
    //         'pdfFile' => $request->pdfFile
    //     ];

    //     Mail::to('sandy.zaimahtech@gmail.com')->send(new \App\Mail\EScriptMail($details,$file_path,$filename));

    //     dd("Email is Sent.");
    // }
}
