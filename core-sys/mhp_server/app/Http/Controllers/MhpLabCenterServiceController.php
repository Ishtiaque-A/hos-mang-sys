<?php

namespace App\Http\Controllers;

use App\Models\MhpGreatLabLetterHead;
use App\Models\MhpLabCenterService;
use App\Models\MhpLabCenterDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class MhpLabCenterServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpLabCenterService::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab center services"
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = new MhpLabCenterService();
        $data->name = $request->name;
        $data->save();

        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab center services added"
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
        $data = new MhpLabCenterDetails();
        $data->address1 = $request->address1;
        $data->address2 = $request->address2;
        $data->email = $request->email;
        $data->city_id = $request->city_id;
        $data->postal_code = $request->postal_code;
        $data->country_id = $request->country_id;
        $data->phone = $request->phone;
        $data->mobile = $request->mobile;
        $data->service = $request->service;
        $data->name = $request->name;
        $data->save();
        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab center details added"
        ]);
    }

    public function update_lab(Request $request, $id)
    {
        $data = MhpLabCenterDetails::find($id);
        $data->address1 = $request->address1;
        $data->address2 = $request->address2;
        $data->email = $request->email;
        $data->city_id = $request->city_id;
        $data->postal_code = $request->postal_code;
        $data->country_id = $request->country_id;
        $data->phone = $request->phone;
        $data->mobile = $request->mobile;
        $data->service = $request->service;
        $data->name = $request->name;
        $data->update();
        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab center details updated successfully"
        ]);
    }
    // letter head
    public function save_letter_head(Request $request)
    {
        if ($files = $request->file('lab_incharge_sign')) {
            $inchargeS = $files->getClientOriginalName();
            $inchargeSign = rand(111, 99999) . $inchargeS;
            $files->move('images/letterHead/', $inchargeSign);
        } else {
            $inchargeSign = "";
        }
        if ($filesDoc = $request->file('doctor_sign')) {
            $doctorS = $filesDoc->getClientOriginalName();
            $doctorSign = rand(111, 99999) . $doctorS;
            $filesDoc->move('images/letterHead/', $doctorSign);
        } else {
            $doctorSign = "";
        }
        if ($filesLetter = $request->file('letter_head_logo')) {
            $letterHeadL = $filesLetter->getClientOriginalName();
            $letterHeadLogo = rand(111, 99999) . $letterHeadL;
            $filesLetter->move('images/letterHead/', $letterHeadLogo);
        } else {
            $letterHeadLogo = "";
        }
        if ($filesPref = $request->file('preferred_sign')) {
            $preferredS = $filesPref->getClientOriginalName();
            $preferredSign = rand(111, 99999) . $preferredS;
            $filesPref->move('images/letterHead/', $preferredSign);
        } else {
            $preferredSign = "";
        }


        $data = new MhpGreatLabLetterHead();
        $data->lab_incharge_name = $request->lab_incharge_name;
        $data->lab_incharge_designation = $request->lab_incharge_designation;
        $data->lab_incharge_sign = $inchargeSign;
        $data->doctor_name = $request->doctor_name;
        $data->doctor_designation = $request->doctor_designation;
        $data->doctor_sign = $doctorSign;
        $data->preferred_name = $request->preferred_name;
        $data->preferred_designation = $request->preferred_designation;
        $data->preferred_sign = $preferredSign;
        $data->letter_head_logo = $letterHeadLogo;
        $data->hide_report_header = $request->hide_report_header ?? 0;
        $data->save();
        return response()->json([
            "status" => 200,
            "letter_head" => $data,
            "message" => "Lab later head added"
        ]);
    }
    public function update_letter_head(Request $request, $id)
    {
        if ($files = $request->file('lab_incharge_sign')) {
            $inchargeS = $files->getClientOriginalName();
            $inchargeSign = rand(111, 99999) . $inchargeS;
            $files->move('images/letterHead/', $inchargeSign);
        } else {
            $inchargeSign = "";
        }
        if ($filesDoc = $request->file('doctor_sign')) {
            $doctorS = $filesDoc->getClientOriginalName();
            $doctorSign = rand(111, 99999) . $doctorS;
            $filesDoc->move('images/letterHead/', $doctorSign);
        } else {
            $doctorSign = "";
        }
        if ($filesLetter = $request->file('letter_head_logo')) {
            $letterHeadL = $filesLetter->getClientOriginalName();
            $letterHeadLogo = rand(111, 99999) . $letterHeadL;
            $filesLetter->move('images/letterHead/', $letterHeadLogo);
        } else {
            $letterHeadLogo = "";
        }
        if ($filesPref = $request->file('preferred_sign')) {
            $preferredS = $filesPref->getClientOriginalName();
            $preferredSign = rand(111, 99999) . $preferredS;
            $filesPref->move('images/letterHead/', $preferredSign);
        } else {
            $preferredSign = "";
        }


        $data = MhpGreatLabLetterHead::find($id);
        //  update for lab incharge or checked by 
        $data->lab_incharge_name = $request->lab_incharge_name;
        $data->hide_report_header = $request->hide_report_header ?? 0;
        $data->lab_incharge_designation = $request->lab_incharge_designation;
        if ($files != null) {
            $data->lab_incharge_sign = $inchargeSign;
        }
        //  update for doctor 
        $data->doctor_name = $request->doctor_name;
        $data->doctor_designation = $request->doctor_designation;
        if ($filesDoc != null) {
            $data->doctor_sign = $doctorSign;
        }
        // update for  preferred
        $data->preferred_name = $request->preferred_name;
        $data->preferred_designation = $request->preferred_designation;
        if ($filesPref != null) {
            $data->preferred_sign = $preferredSign;
        }

        // update for letter head
        if ($filesLetter != null) {
            $data->letter_head_logo = $letterHeadLogo;
        }
        $data->update();
        return response()->json([
            "status" => 200,
            "letter_head" => $data,
            "message" => "Lab later head added"
        ]);
    }
    public function letter_head()
    {
        $data = MhpGreatLabLetterHead::orderBy('id', 'desc')->first();
        return response()->json([
            "status" => 200,
            "letter_head" => $data,
            "message" => "Lab later head data"
        ]);
    }

    public function center_data()
    {
        $data = MhpLabCenterDetails::with('city', 'country')->orderBy('id', 'desc')->first();
        return response()->json([
            "status" => 200,
            "center" => $data,
            "message" => "Center details"
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpLabCenterService  $mhpLabCenterService
     * @return \Illuminate\Http\Response
     */


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpLabCenterService  $mhpLabCenterService
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpLabCenterService::find($id);
        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab services"
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpLabCenterService  $mhpLabCenterService
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = MhpLabCenterService::find($id);
        $data->name = $request->name;
        $data->update();

        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab service updated successfully"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpLabCenterService  $mhpLabCenterService
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MhpLabCenterService::find($id);
        $data->delete();

        return response()->json([
            "status" => 200,
            "service" => $data,
            "message" => "Lab service deleted successfully"
        ]);
    }
    public function organization_list(Request $request)
    {
        return $request->all();
        // return $request->header('Authorization');

        $response = Http::withHeaders([
            'Authorization' => $request->header('Authorization'),
            'Content-Type' => 'application/json',
        ])->get(env('SAAS_URL') . '/auth/organization');

        return response([
            "data" => $response['data']['organizations']
        ], 200);
    }
}
