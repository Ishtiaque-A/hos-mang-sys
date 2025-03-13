<?php

namespace App\Http\Controllers;

use App\Models\MHPAdvise;
use App\Models\mhpPrescriptionSetup;
use Illuminate\Http\Request;
use PDF;


class MHPAdviseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($doctor_id)
    {
        $data = MHPAdvise::where('doctor_id', $doctor_id)->orderBy('id', 'desc')->get();
        return response()->json([
            'advise' => $data,
            'message' => 'Data Retrieved Successfully',
        ], 200);
    }
    public function updateAllAdvise(Request $request)
    {
        // Loop through each advise in the request data
        foreach ($request->all() as $adviseData) {
            $advise = MHPAdvise::find($adviseData['id']);
            if ($advise) {
                $advise->check = $adviseData['check'] ? 1 : 0;
                $advise->save();
            }
        }

        // You can return a success response if needed
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    public  function generatePrescriptionPdf(Request $request)
    {

        $img_RX = $this->getImageDataUri('rx.svg');
        $img_QR = $this->getImageDataUri('qr.png');
        $data = $request->all();
        $doctor_id = $data['doctorInfo']['doctor_id'];
        if (!$doctor_id) {
            return response()->json([
                'message' => 'Doctor Id is required',
            ], 400);
        }

        $presSetup = mhpPrescriptionSetup::where('doctor_id', $doctor_id)->get()->first();
        if (is_null($presSetup) || $presSetup->prescription_type === 'default') {
            return view('admin.default_prescription', compact('img_QR', 'data'));
        } else {
            return view('admin.local_prescription', compact('img_RX', 'data'));
        }
        // return response()->json([
        //     'data' => $data,
        //     'message' => 'Data Retrieved Successfully',
        //     'setup' => $presSetup
        // ]);
        // // $prescriptionsType = ;
        // return view('admin.prescription', compact('img', 'data'));
        // $prescription  = PDF::loadView(
        //     'admin.mhp_advise',
        //     [
        //         "img" => $this->getImageDataUri('rx.svg'),
        //     ]
        // )->setOptions([
        //     'isHtml5ParserEnabled' => true,
        //     'isRemoteEnabled' => true,
        //     'setIsFontSubsettingEnabled' => true,
        // ]);
        // $fileName = 'prescription.pdf';

        // // return $prescription->stream($fileName);
        // return $prescription->stream($fileName);
    }
    public function generatePrescriptionPdf2()
    {
        $img = $this->getImageDataUri('qr.png');
        return view('admin.prescription1', [
            "img" => $img
        ]);
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
    public function store(Request $request)
    {
        $advise_name = $request->advise_name;
        $data = new MHPAdvise();
        $data->advise_name = $advise_name;
        $data->doctor_id = $request->doctor_id;
        $header = $request->header();
        $branchData = getBranchData($header);
        $data->saas_branch_id = $branchData['branch_id'];
        $data->saas_branch_name = $branchData['branch_name'];

        $data->save();
        return response()->json([
            'message' => 'Advise Added Successfully',
        ], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MHPAdvise  $mHPAdvise
     * @return \Illuminate\Http\Response
     */
    public function show(MHPAdvise $mHPAdvise)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MHPAdvise  $mHPAdvise
     * @return \Illuminate\Http\Response
     */
    public function edit(MHPAdvise $mHPAdvise)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MHPAdvise  $mHPAdvise
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MHPAdvise $mHPAdvise)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MHPAdvise  $mHPAdvise
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MHPAdvise::find($id);
        $data->delete();
        return response()->json([
            'message' => 'Advise Deleted Successfully',
        ], 200);
    }
}
