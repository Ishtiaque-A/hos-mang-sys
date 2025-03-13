<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpClinicalDetails;
use Validator;

class ClinicalDetailsController extends Controller
{
    public function index()
    {
        $clinical_details = MhpClinicalDetails::orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'clinical_details' => $clinical_details]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'clinical_details_name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $clinical_details = new MhpClinicalDetails();
            $clinical_details->clinical_details_name = $request->clinical_details_name;
            $clinical_details->save();

            return response()->json(['status' => 200, 'message' => 'Clinical Details Added Successfully']);
        }
    }


    public function edit($id)
    {
        $clinical_details = MhpClinicalDetails::find($id);
        return response()->json(['status' => 200, 'clinical_details' => $clinical_details]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'clinical_details_name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $update_clinical_details = MhpClinicalDetails::find($id);
            $update_clinical_details->clinical_details_name = $request->clinical_details_name;

            $update_clinical_details->update();

            return response()->json(['status' => 200, 'message' => 'Clinical Details  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_clinical_details = MhpClinicalDetails::find($id);
        $del_clinical_details->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Clinical Details Deleted Successfully',
        ]);
    }
}
