<?php

namespace App\Http\Controllers\GreatDoc;

use App\Models\MhpRx;
use App\Models\MhpContact;
use App\Models\MhpPregnancy;
use Illuminate\Http\Request;
use App\Models\MhpAddAllergy;
use App\Models\MhpAddReaction;
use App\Models\MhpPastHistory;
use App\Models\MhpPrescription;
use App\Http\Controllers\Controller;
use App\Models\MhpPrescriptionsList;
use App\Models\MhpGreatDocImmunisation;
use App\Models\MhpPatient;
use App\Models\MhpPatientPrescription;
use App\Models\MhpPrescriptionDetails;
use App\Models\UploadedPrescription;
use Illuminate\Support\Facades\Validator;

class MhpGreateDocController extends Controller
{
    public function storeDrugs(Request $request)
    {

        $data = new MhpRx();
        $data->patient_id = $request->patient_id;
        $data->drug_id = $request->medicine['id'];
        $data->drug_name = $request->medicine['mims_sg'];
        $data->brand_name = $request->medicine['macrohealth_sg'];
        $data->guid = $request->medicine['guid'];
        $data->drug_generic_name = $request->medicine['generic_name']['name'] ?? null;
        // $data->drug_generic_name = $request->medicine['generic_name']['name'];
        // $data->iSAllergyCheck = $request->medicine['iSAllergyCheck'];

        $data->dose = $request->doseInfo['dose'];
        $data->frequency = $request->doseInfo['frequency'];
        $data->food = $request->doseInfo['food'];
        $data->others = $request->doseInfo['others'];
        $data->route = $request->doseInfo['route'];
        $data->prn = $request->doseInfo['prn'];
        $data->appointment_id = $request->doseInfo['appointment_id'];
        $data->tabs_inistraction = $request->doseInfo['tabs_inistraction'];
        $data->Complex_instruction = $request->doseInfo['Complex_instruction'];
        $data->extra_instruction = $request->doseInfo['extra_instruction'];
        $data->drugsTimeLimit = $request->doseInfo['drugsTimeLimit'];
        $data->prescribedAs = $request->doseInfo['prescribedAs'];

        $data->general_note = $request->doseInfo['general_note'];
        $data->pbs_listing = $request->doseInfo['pbs_listing'];
        $data->quantity = $request->doseInfo['quantity'];

        $data->repeats = $request->doseInfo['repeats'];
        $data->condition = $request->condition;
        $data->further_details = $request->doseInfo['further_details'];
        $data->is_FVDose = $request->doseInfo['is_FVDose'];
        $data->is_Regulation = $request->doseInfo['is_Regulation'];
        $data->is_print_brand_name = $request->doseInfo['is_print_brand_name'];
        $data->is_print_generic_name = $request->doseInfo['is_print_generic_name'];
        $data->is_urgent_supply = $request->doseInfo['is_urgent_supply'];
        $data->is_allow_brand_substitution = $request->doseInfo['is_allow_brand_substitution'];
        $data->is_save_dose = $request->doseInfo['is_save_dose'];
        $data->is_condition_status_right = $request->doseInfo['is_condition_status_right'];
        $data->is_condition_status_left = $request->doseInfo['is_condition_status_left'];
        $data->is_condition_status_bilateral = $request->doseInfo['is_condition_status_bilateral'];
        $data->is_condition_status_acute = $request->doseInfo['is_condition_status_acute'];
        $data->is_condition_status_chronic = $request->doseInfo['is_condition_status_chronic'];


        $data->is_condition_status_mild = $request->doseInfo['is_condition_status_mild'];
        $data->is_condition_status_moderate = $request->doseInfo['is_condition_status_moderate'];
        $data->is_condition_status_severe = $request->doseInfo['is_condition_status_severe'];
        $data->is_add_to_past_history = $request->doseInfo['is_add_to_past_history'];
        $data->is_add_to_reason_for_visit = $request->doseInfo['is_add_to_reason_for_visit'];
        $data->is_mark_as_confidential = $request->doseInfo['is_mark_as_confidential'];

        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Drugs Insert Completed',
            'drugs' => $data
        ]);
    }


    public function pescriped_dugs($id)
    {

        $data = MhpRx::with('medicine', 'appointment')->where('patient_id', $id)->where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'Get prescride drugs details',
            'drugs' => $data
        ]);
    }
    public function givenDrugs($id)
    {

        $data = MhpRx::with('history')
            ->where('patient_id', $id)
            ->where('delete_status', 0)
            ->whereHas('history')
            ->orderBy('id', 'desc')
            ->select('id', 'patient_id', 'brand_name', 'dose', 'frequency', 'route', 'prn', 'quantity', 'food')
            ->get();

        return response()->json([
            'status' => 200,
            'message' => 'Get given drugs details with history',
            'drugs' => $data
        ]);
    }

    public function past_dugs($id)
    {

        $data = MhpRx::with('medicine')->where('patient_id', $id)->where('delete_status', 1)->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'Past drugs details',
            'drugs' => $data
        ]);
    }

    public function update_dugs_to_past($id)
    {

        $data = MhpRx::find($id);
        $data->delete_status = 1;
        $data->update();

        return response()->json([
            'status' => 200,
            'message' => 'Past drugs details',
            'drugs' => $data
        ]);
    }

    public function update_dugs_to_current($id)
    {

        $data = MhpRx::find($id);
        $data->delete_status = 0;
        $data->update();

        return response()->json([
            'status' => 200,
            'message' => 'Current drugs details',
            'drugs' => $data
        ]);
    }



    public function store_prescription(Request $request)
    {

        $data = new MhpPrescription();
        $data->patient_id = $request->patient_id;
        $data->doctor_id = $request->doctor_id;
        $data->medicen_id = $request->medicen_id;
        $data->prescription_no = $request->prescription_no;
        $data->prescription_date = $request->prescription_date;
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Prescription save successfully',
            'prescription' => $data
        ]);
    }


    public function store_prescription_name(Request $request)
    {
        $branchData = getBranchData($request->header());
        $data = new MhpPrescriptionsList();
        if ($branchData['super_admin'] == false) {
            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        }
        $data->patient_id = $request->patient_id;
        $data->prescription_name = $request->prescription_name;
        $data->doctors_note = $request->doctors_note;
        $data->reason_for_visit = $request->reason_for_visit;
        $data->doctor_id = $request->doctor_id;
        $data->date = $request->date;
        $data->advice = $request->advices;
        $data->investigation = $request->investigations;
        $data->save();
        foreach ($request->rx as $key => $value) {
            $rx = new MhpPrescriptionDetails();
            $rx->prescription_id = $data->id;
            $rx->rx_id = $value['id'];
            if ($branchData['super_admin'] == false) {
                $data->saas_branch_id = $branchData['branch_id'];
                $data->saas_branch_name = $branchData['branch_name'];
            }
            $rx->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Prescription name save successfully',
            'prescription' => $data
        ]);
    }


    public function prescription_name($id)
    {

        $data = MhpPrescriptionsList::with('doctor', 'details', 'patient')->where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'message' => 'Prescription list',
            'prescription' => $data
        ]);
    }
    public function prescription_branch($branch, $hn)
    {
        // $patient = MhpPatient::where('patient_hn_number', $hn)->first();
        $data = UploadedPrescription::with('doctor', 'patient', 'prescription')->where(['patient_hn' => $hn, 'saas_branch_id' => $branch])->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'message' => 'Prescription list',
            'prescription' => $data
        ]);
    }


    public function prescription_details($name)
    {
        $data = MhpPrescription::where('prescription_no', $name)->with('rx')->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'Prescription list',
            'prescription' => $data
        ]);
    }
    public function lastPrescription($id)
    {
        $data = MhpPrescriptionsList::with('prescription')->where('patient_id', $id)->orderBy('id', 'desc')->first();
        return response()->json([
            'status' => 200,
            'message' => 'Prescription list',
            'data' => $data
        ]);
    }


    // past history
    public function past_history($id)
    {

        $data = MhpPastHistory::where("patient_id", $id)
            ->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'message' => 'Past history',
            'past_history' => $data
        ]);
    }
    public function past_history_edit($id)
    {
        $data = MhpPastHistory::find($id);
        return response()->json([
            'status' => 200,
            'message' => 'Past history',
            'past_history' => $data
        ]);
    }
    public function past_history_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required',
            'date' => 'required',
            'condition' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }


        $pastHistory = new MhpPastHistory();
        $pastHistory->doctor_id = $request->input('doctor_id');
        $pastHistory->patient_id = $request->input('patient_id');
        $pastHistory->appointment_id = $request->input('appointment_id');
        $pastHistory->date = date('Y-m-d H:i:s', strtotime($request->input('date')));
        $pastHistory->condition = $request->input('condition');
        $pastHistory->code = $request->input('code');
        $pastHistory->saverty = $request->input('saverty');
        $pastHistory->description = $request->input('description');
        $pastHistory->summary = $request->input('summary');
        $pastHistory->confidential = $request->input('confidential');
        $pastHistory->myHealthRecord = $request->input('myHealthRecord');
        $pastHistory->details = $request->input('details');
        $pastHistory->save();


        $todaysPastHistory =  MhpPastHistory::where('patient_id', $request->input('patient_id'))
            ->where('date', date("Y-m-d"))
            ->get();


        return response()->json([
            'status' => 200,
            'message' => "Past history added successfully",
            'pastHistory' => $todaysPastHistory
        ]);
    }
    public function past_history_update(Request $request, $id)
    {
        $pastHistory = MhpPastHistory::find($id);
        $pastHistory->doctor_id = $request->input('doctor_id');
        $pastHistory->patient_id = $request->input('patient_id');
        $pastHistory->date = $request->input('date');
        $pastHistory->condition = $request->input('condition');
        $pastHistory->saverty = $request->input('saverty');
        $pastHistory->description = $request->input('description');
        $pastHistory->summary = $request->input('summary');
        $pastHistory->confidential = $request->input('confidential');
        $pastHistory->myHealthRecord = $request->input('myHealthRecord');
        $pastHistory->details = $request->input('details');
        $pastHistory->update();

        return response()->json([
            'status' => 200,
            'message' => "Past history updated successfully"
        ]);
    }
    public function past_history_delete($id)
    {
        $pastHistory = MhpPastHistory::find($id);
        $pastHistory->delete();

        return response()->json([
            'status' => 200,
            "message" => "Deleted successfully"
        ]);
    }

    // add medicine reaction  great doc
    public function index($id)
    {
        $data = MhpAddReaction::where("patient_id", $id)->orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All reactions",
            "reaction" => $data,
        ]);
    }
    public function store(Request $request)
    {
        $data = new MhpAddReaction();
        $data->patient_id = $request->input("patient_id");
        $data->drug_name = $request->input("drug_name");
        $data->reaction = $request->input("reaction");
        $data->severty = $request->input("severty");
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Reaction Added Successfully "
        ]);
    }
    public function destroy($id)
    {
        $data = MhpAddReaction::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Reaction Deleted Successfully "
        ]);
    }
    //
    public function saveGreatdocImmunisation(Request $request)
    {

        $immunisation_data = new  MhpGreatDocImmunisation();
        $immunisation_data->patient_id = $request->input("patient_id");
        $immunisation_data->billing_provider_id = $request->input("billing_provider_id");
        $immunisation_data->include_inactive_providers = $request->input("include_inactive_providers");
        $immunisation_data->given_by_id = $request->input("given_by_id");
        $immunisation_data->seq = $request->input("seq");
        $immunisation_data->date = $request->input("date");
        $immunisation_data->batch_no = $request->input("batch_no");
        $immunisation_data->site_id = $request->input("site_id");
        $immunisation_data->route_id = $request->input("route_id");
        $immunisation_data->batch_expiry_date = $request->input("batch_expiry_date");
        $immunisation_data->save_batch_details = $request->input("save_batch_details");
        $immunisation_data->serial_no = $request->input("serial_no");
        $immunisation_data->comment = $request->input("comment");
        $immunisation_data->send_remainder = $request->input("send_remainder");
        $immunisation_data->remainder_date = $request->input("remainder_date");
        $immunisation_data->vaccine_against_id = $request->input("vaccine_against_id");
        $immunisation_data->save();

        return response()->json([
            "status" => 200,
            "message" => "Greatdoc immunisation added Successfully "
        ]);
    }
    public function immunisation($id)
    {
        $data = MhpGreatDocImmunisation::where("patient_id", $id)->with('MhpBillingProvider', 'MhpGivenBy', 'MhpBatchNo', 'MhpImmunisationRoute', 'MhpSite', 'MhpVaccineAgainst', 'mhp_vaccine_names')->orderBy("id", "desc")->get();

        return response()->json([
            "status" => 200,
            "message" => "All immunisation",
            "immunisation" => $data
        ]);
    }
    public function deletImmunisation($id)
    {
        $data = MhpGreatDocImmunisation::find($id);
        $data->delete();

        return response()->json([
            'status' => 200,
            "message" => "Immunisation deleted successfully"
        ]);
    }
    public function allContact()
    {
        $contact = MhpContact::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All Contacts",
            "data" => $contact
        ]);
    }
    public function saveContact(Request $request)
    {
        $contact = new MhpContact();
        $contact->contact_name = $request->input("contact_name");
        $contact->category = $request->input("category");
        $contact->department = $request->input("department");
        $contact->address = $request->input("address");
        $contact->phone = $request->input("phone");
        $contact->fax = $request->input("fax");
        $contact->comment = $request->input("comment");
        $contact->save();

        return response()->json([
            "status" => 200,
            "message" => "Contact Added Successfully"
        ]);
    }

    public function deleteContact($id)
    {
        $contact = MhpContact::find($id);
        $contact->delete();

        return response()->json([
            "status" => 200,
            "message" => "Contact Deleted Successfully"
        ]);
    }

    public function pregnancy($id)
    {
        $data = MhpPregnancy::where("patient_id", $id)->orderBy("id", "desc")->get();

        return response()->json([
            "status" => 200,
            "message" => "Pregnancy History",
            "pregnancy" => $data
        ]);
    }
    public function save_pregnancy(Request $request)
    {
        $data = new MhpPregnancy();
        $data->patient_id = $request->input("patient_id");
        $data->pregnancy_no = $request->input("pregnancy_no");
        $data->actual_lmp = $request->input("actual_lmp");
        $data->scan_date = $request->input("scan_date");
        $data->finish_date = $request->input("finish_date");
        $data->managed_by = $request->input("managed_by");
        $data->edc_by_scan = $request->input("edc_by_scan");
        $data->edc_by_lmp = $request->input("edc_by_lmp");
        $data->scan_weeks = $request->input("scan_weeks");
        $data->use_scan_date = $request->input("use_scan_date");
        $data->geston_weeks = $request->input("geston_weeks");
        $data->scan_days = $request->input("scan_days");
        $data->outcome = $request->input("outcome");
        $data->complication = implode(',', $request->complication);

        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Pregnancy added successfully "
        ]);
    }
    public function pregnancy_edit($id)
    {
        $data = MhpPregnancy::find($id);

        return response()->json([
            "status" => 200,
            "pregnancy" => $data
        ]);
    }
    public function pregnancy_delete($id)
    {
        $data = MhpPregnancy::find($id);

        $data->delete();

        return response()->json([
            "status" => 200,
            "message" => "Pregnancy Deleted Successfully"
        ]);
    }
    public function pregnancy_update(Request $request, $id)
    {
        $data = MhpPregnancy::find($id);
        $data->patient_id = $request->input("patient_id");
        $data->pregnancy_no = $request->input("pregnancy_no");
        $data->actual_lmp = $request->input("actual_lmp");
        $data->scan_date = $request->input("scan_date");
        $data->finish_date = $request->input("finish_date");
        $data->managed_by = $request->input("managed_by");
        $data->edc_by_scan = $request->input("edc_by_scan");
        $data->edc_by_lmp = $request->input("edc_by_lmp");
        $data->scan_weeks = $request->input("scan_weeks");
        $data->use_scan_date = $request->input("use_scan_date");
        $data->geston_weeks = $request->input("geston_weeks");
        $data->scan_days = $request->input("scan_days");
        $data->outcome = $request->input("outcome");
        $data->complication = implode(',', $request->complication);

        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Pregnancy updated successfully "
        ]);
    }
}
