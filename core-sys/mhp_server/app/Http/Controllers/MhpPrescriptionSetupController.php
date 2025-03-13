<?php

namespace App\Http\Controllers;

use App\Models\mhpPrescriptionSetup;
use Illuminate\Http\Request;

class MhpPrescriptionSetupController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        try {
            $prescription = mhpPrescriptionSetup::where('doctor_id', $id)->first();

            if ($prescription) {
                if ($prescription->prescription_type == "local") {
                    $prescription->img = $this->getImageDataUri('rx.svg');
                }
                if ($prescription->prescription_type == "default") {
                    $prescription->img = $this->getImageDataUri('qr.png');
                }

                return response()->json([
                    'data' => $prescription
                ], 200);
            } else {
                return response()->json([
                    'message' => 'No Data Found',
                ], 404);
            }
        } catch (\Exception $e) {
            // Handle the exception here
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function getImageDataUri($imageName)
    {
        $imagePath = public_path('images/' . $imageName); // Adjust the path to your image
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageMimeType = mime_content_type($imagePath);
        return "data:{$imageMimeType};base64,{$imageData}";
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
    // public function store(Request $request)
    // {
    //     $findSingleData = mhpPrescriptionSetup::where('doctor_id', $request->doctor_id)->first();
    //     if ($findSingleData) {
    //         $mhpPrescriptionSetup = mhpPrescriptionSetup::find($findSingleData->id);
    //         $mhpPrescriptionSetup->prescription_type = $request->prescription_type;
    //         if ($request->prescription_type == "local") {
    //             $mhpPrescriptionSetup->use_footer = $request->use_footer;
    //             $mhpPrescriptionSetup->use_header = $request->use_header;
    //             if ($headerFile = $request->file('header_img')) {
    //                 // Get the current header image path from the database
    //                 $headerImg = $mhpPrescriptionSetup->header_img;

    //                 // Check if the file exists
    //                 if ((!empty($headerImg)) && file_exists($headerImg)) {
    //                     // If it exists, delete the file
    //                     unlink($headerImg);
    //                 }

    //                 // Move the new file
    //                 $hnames = $headerFile->getClientOriginalName();
    //                 $hname = rand(11, 99999) . $hnames;
    //                 $headerFile->move('prescription_setup/', $hname);

    //                 // Update the header_img field in your database with the new file path
    //                 $mhpPrescriptionSetup->header_img = "prescription_setup/" . $hname;
    //             }
    //             if ($footerFile = $request->file('doctor_signature')) {
    //                 // Get the current header image path from the database
    //                 $footerImg = $mhpPrescriptionSetup->footer_img;
    //                 // Check if the file exists
    //                 if ((!empty($footerImg)) && file_exists($footerImg)) {
    //                     // If it exists, delete the file
    //                     unlink($footerImg);
    //                 }

    //                 // Move the new file
    //                 $fnames = $footerFile->getClientOriginalName();
    //                 $fname = rand(11, 99999) . $fnames;
    //                 $footerFile->move('prescription_setup/', $fname);

    //                 // Update the header_img field in your database with the new file path
    //                 $mhpPrescriptionSetup->footer_img = "prescription_setup/" . $fname;
    //             }
    //             if ($signatureFile = $request->file('doctor_signature')) {
    //                 // Get the current header image path from the database
    //                 $doctorImg = $mhpPrescriptionSetup->footer_img;
    //                 // Check if the file exists
    //                 if ((!empty($doctorImg)) && file_exists($doctorImg)) {
    //                     // If it exists, delete the file
    //                     unlink($doctorImg);
    //                 }

    //                 // Move the new file
    //                 $signatures = $signatureFile->getClientOriginalName();
    //                 $signature = rand(11, 99999) . $signatures;
    //                 $signatureFile->move('prescription_setup/', $signature);

    //                 // Update the header_img field in your database with the new file path
    //                 $mhpPrescriptionSetup->doctor_signature = "prescription_setup/" . $signature;
    //             }
    //         }
    //         $mhpPrescriptionSetup->save();
    //         return response()->json([
    //             'message' => 'Prescription Type Updated Successfully',
    //             'data' => $mhpPrescriptionSetup
    //         ], 200);
    //     } else {
    //         $mhpPrescriptionSetup = new mhpPrescriptionSetup();

    //         if ($request->prescription_type == "local") {
    //             $mhpPrescriptionSetup->use_footer = $request->use_footer;
    //             $mhpPrescriptionSetup->use_header = $request->use_header;
    //             $mhpPrescriptionSetup->use_doctor_signature = $request->use_doctor_signature;

    //             if ($headerFile = $request->file('header_img')) {
    //                 // Get the current header image path from the database
    //                 $headerImg = $mhpPrescriptionSetup->header_img;
    //                 // Move the new file
    //                 $hnames = $headerFile->getClientOriginalName();
    //                 $hname = rand(11, 99999) . $hnames;
    //                 $headerFile->move('prescription_setup/', $hname);

    //                 // Update the header_img field in your database with the new file path
    //                 $mhpPrescriptionSetup->header_img = "prescription_setup/" . $hname;
    //             }
    //             if ($footerFile = $request->file('footer_img')) {
    //                 // Get the current header image path from the database
    //                 // $footerImg = $mhpPrescriptionSetup->footer_img;

    //                 // Move the new file
    //                 $fnames = $footerFile->getClientOriginalName();
    //                 $fname = rand(11, 99999) . $fnames;
    //                 $footerFile->move('prescription_setup/', $fname);

    //                 // Update the header_img field in your database with the new file path
    //                 $mhpPrescriptionSetup->footer_img = "prescription_setup/" . $fname;
    //             }
    //             if ($signatureFile = $request->file('doctor_signature')) {
    //                 // Get the current header image path from the database
    //                 // $footerImg = $mhpPrescriptionSetup->doctor_signature;

    //                 // Move the new file
    //                 $signature = $signatureFile->getClientOriginalName();
    //                 $signatureName = rand(11, 99999) . $signature;
    //                 $signatureFile->move('prescription_setup/', $signatureName);

    //                 // Update the header_img field in your database with the new file path
    //                 $mhpPrescriptionSetup->doctor_signature = "prescription_setup/" . $signatureName;
    //             }
    //         }
    //         $mhpPrescriptionSetup->doctor_id = $request->doctor_id;
    //         $mhpPrescriptionSetup->prescription_type = $request->prescription_type;
    //         $mhpPrescriptionSetup->doctor_email = $request->doctor_email;
    //         $mhpPrescriptionSetup->save();
    //         return response()->json([
    //             'message' => 'Prescription Type created Successfully',
    //             'data' => $mhpPrescriptionSetup
    //         ], 200);
    //     }
    // }



    public function store(Request $request)
    {
        $findSingleData = mhpPrescriptionSetup::where('doctor_id', $request->doctor_id)->first();

        if ($findSingleData) {
            $mhpPrescriptionSetup = mhpPrescriptionSetup::find($findSingleData->id);
            $mhpPrescriptionSetup->prescription_type = $request->prescription_type;
            $mhpPrescriptionSetup->use_header = $request->use_header;
            $mhpPrescriptionSetup->use_footer = $request->use_footer;
            $mhpPrescriptionSetup->use_doctor_signature = $request->use_doctor_signature;


            if ($request->prescription_type == "local") {
                // $this->handleFileUpload($request, $mhpPrescriptionSetup, 'header_img', 'header_img');
                // $this->handleFileUpload($request, $mhpPrescriptionSetup, 'footer_img', 'footer_img');
                $mhpPrescriptionSetup->header_content = $request->header_content;
                $mhpPrescriptionSetup->footer_content = $request->footer_content;

                $mhpPrescriptionSetup->clinical_exam = $request->clinical_exam;
                $this->handleFileUpload($request, $mhpPrescriptionSetup, 'doctor_signature', 'doctor_signature');
            }

            $mhpPrescriptionSetup->save();

            return response()->json([
                'message' => 'Prescription Type Updated Successfully',
                'data' => $mhpPrescriptionSetup
            ], 200);
        } else {
            $mhpPrescriptionSetup = new mhpPrescriptionSetup();
            $header = $request->header();
            $branchData = getBranchData($header);
            $mhpPrescriptionSetup->saas_branch_id = $branchData['branch_id'];
            $mhpPrescriptionSetup->saas_branch_name = $branchData['branch_name'];


            if ($request->prescription_type == "local") {
                $mhpPrescriptionSetup->header_content = $request->header_content;
                $mhpPrescriptionSetup->footer_content = $request->footer_content;
                $mhpPrescriptionSetup->clinical_exam = $request->clinical_exam;
                // $this->handleFileUpload($request, $mhpPrescriptionSetup, 'header_img', 'header_img');
                // $this->handleFileUpload($request, $mhpPrescriptionSetup, 'footer_img', 'footer_img');
                $this->handleFileUpload($request, $mhpPrescriptionSetup, 'doctor_signature', 'doctor_signature');
            }

            $mhpPrescriptionSetup->doctor_id = $request->doctor_id;
            $mhpPrescriptionSetup->prescription_type = $request->prescription_type;
            $mhpPrescriptionSetup->doctor_email = $request->doctor_email;
            $mhpPrescriptionSetup->use_header = $request->use_header;
            $mhpPrescriptionSetup->use_footer = $request->use_footer;
            $mhpPrescriptionSetup->use_doctor_signature = $request->use_doctor_signature || 0;

            $mhpPrescriptionSetup->save();

            return response()->json([
                'message' => 'Prescription Type created Successfully',
                'data' => $mhpPrescriptionSetup
            ], 200);
        }
    }

    private function handleFileUpload($request, $model, $fileInputName, $databaseFieldName)
    {
        if ($file = $request->file($fileInputName)) {
            // Get the current file path from the database
            $currentFile = $model->{$databaseFieldName};

            // Check if the file exists
            if ((!empty($currentFile)) && file_exists($currentFile)) {
                // If it exists, delete the file
                unlink($currentFile);
            }

            // Move the new file
            $filename = $file->getClientOriginalName();
            $newFilename = rand(11, 99999) . $filename;
            $file->move('prescription_setup/', $newFilename);

            // Update the field in your database with the new file path
            $model->{$databaseFieldName} = "prescription_setup/" . $newFilename;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\mhpPrescriptionSetup  $mhpPrescriptionSetup
     * @return \Illuminate\Http\Response
     */
    public function show(mhpPrescriptionSetup $mhpPrescriptionSetup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\mhpPrescriptionSetup  $mhpPrescriptionSetup
     * @return \Illuminate\Http\Response
     */
    public function edit(mhpPrescriptionSetup $mhpPrescriptionSetup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\mhpPrescriptionSetup  $mhpPrescriptionSetup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, mhpPrescriptionSetup $mhpPrescriptionSetup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\mhpPrescriptionSetup  $mhpPrescriptionSetup
     * @return \Illuminate\Http\Response
     */
    public function destroy(mhpPrescriptionSetup $mhpPrescriptionSetup)
    {
        //
    }
}
