<?php

namespace App\Http\Controllers\GreatDoc\MedicationChart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMedicationChartAllergiesAdr;
use App\Models\MhpMedicationChartPartOneAllTable;
use App\Models\MhpMedicationChartPartTwoAllTable;
use App\Models\MhpMedicationChartPartThreeAllTable;
use App\Models\MhpMedicationChartPartFourAllTable;
use App\Models\MhpMedicationMedicineTakenPriorTable;
use App\Models\MhpMedicationNurseInitiatedMedicine;
use App\Models\MhpMedicationChartPartTwoRecommendedGuidelineTable;
use App\Models\MhpMedicationChartPartTwoVariableDoseMedicineTable;
use App\Models\MhpMedicationChartPartTwoVariableDoseMedicineTwoTable;
use App\Models\MhpMedicationChartPartTwoMedicineThreeTable;
use App\Models\MhpMedicationChartPartTwoMedicineFourTable;
use App\Models\MhpMedicationChartPartThreeMedicineSevenTable;
use App\Models\MhpMedicationChartPartFourMedicineEightTable;
use App\Models\MhpMedicationChartPartFiveMedicineNineTable;
use App\Models\MhpMedicationChartPartOneTelephoneOrdersMedicine;
use Validator;
use DB;

class MedicationChartController extends Controller
{
    public function save(Request $request)
    {
        $data = new MhpMedicationChartPartOneAllTable();
        $data->rx_id = $request->rx_id;
        $data->nurse = $request->nurse;
        $data->date = $request->date;
        $data->sign = $request->sign;
        $data->patient_id = $request->patient_id;
        $data->doctor_id = $request->doctor_id;
        $data->admission_id = $request->admission_id;
        $data->mobile_number = $request->mobile_number;
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Medication Chart Save data Inserted Successfully',
            'data' => $data
        ]);
    }
    public function save__medication__chart__part__one__all(Request $request)
    {
        $medicationChartPartOneAll = new MhpMedicationChartPartOneAllTable();
        $medicationChartPartOneAll->service_id = $request->service_id;
        $medicationChartPartOneAll->ward_id = $request->ward_id;
        $medicationChartPartOneAll->additional_checkbox = implode(',', $request->additional_checkbox);
        $medicationChartPartOneAll->gb = $request->gb;
        $medicationChartPartOneAll->community = $request->community;
        $medicationChartPartOneAll->aid = $request->aid;
        $medicationChartPartOneAll->patient_id = $request->patient_id;
        $medicationChartPartOneAll->doctor_id = $request->doctor_id;
        $medicationChartPartOneAll->preHospital = $request->preHospital;
        $medicationChartPartOneAll->save();

        return response()->json([
            'status' => 200,
            'message' => 'Medication Chart Part one Save data Inserted Successfully',
            'medicationChartPartOneAll' => $medicationChartPartOneAll
        ]);
    }
    public function save__medication__chart__part__two__all(Request $request)
    {
        $medicationChartPartTwoAll = new MhpMedicationChartPartTwoAllTable();
        $medicationChartPartTwoAll->signature_name1 = $request->signature_name1;
        $medicationChartPartTwoAll->date_prescriber1 = $request->date_prescriber1;
        $medicationChartPartTwoAll->duration1 = $request->duration1;
        $medicationChartPartTwoAll->qty1 = $request->qty1;
        $medicationChartPartTwoAll->signature_name2 = $request->signature_name2;
        $medicationChartPartTwoAll->date_prescriber2 = $request->date_prescriber2;
        $medicationChartPartTwoAll->duration2 = $request->duration2;
        $medicationChartPartTwoAll->qty2 = $request->qty2;
        $medicationChartPartTwoAll->duration3 = $request->duration3;
        $medicationChartPartTwoAll->qty3 = $request->qty3;
        $medicationChartPartTwoAll->duration4 = $request->duration4;
        $medicationChartPartTwoAll->qty4 = $request->qty4;
        $medicationChartPartTwoAll->vte_risk_assessed_checkbox1 = implode(',', $request->vte_risk_assessed_checkbox1);
        $medicationChartPartTwoAll->continue_on_discharge_radio_part2 = $request->continue_on_discharge_radio_part2;
        $medicationChartPartTwoAll->dispense_radio_part2 = $request->dispense_radio_part2;
        $medicationChartPartTwoAll->vte_risk_assessed_checkbox2 = implode(',', $request->vte_risk_assessed_checkbox2);
        $medicationChartPartTwoAll->continue_on_discharge_radio2_part2 = $request->continue_on_discharge_radio2_part2;
        $medicationChartPartTwoAll->dispense_radio2_part2 = $request->dispense_radio2_part2;
        $medicationChartPartTwoAll->continue_on_discharge_radio3_part2 = $request->continue_on_discharge_radio3_part2;
        $medicationChartPartTwoAll->dispense_radio3_part2 = $request->dispense_radio3_part2;
        $medicationChartPartTwoAll->tick_if_slow_checkbox3 = $request->tick_if_slow_checkbox3;
        $medicationChartPartTwoAll->continue_on_discharge_radio4_part2 = $request->continue_on_discharge_radio4_part2;
        $medicationChartPartTwoAll->dispense_radio4_part2 = $request->dispense_radio4_part2;
        $medicationChartPartTwoAll->patient_id = $request->patient_id;
        $medicationChartPartTwoAll->doctor_id = $request->doctor_id;
        $medicationChartPartTwoAll->save();

        return response()->json([
            'status' => 200,
            'message' => 'Medication Chart Part two Save data Inserted Successfully',
            'medicationChartPartTwoAll' => $medicationChartPartTwoAll
        ]);
    }
    public function save__medication__chart__part__three__all(Request $request)
    {
        $medicationChartPartThreeAll = new MhpMedicationChartPartThreeAllTable();
        $medicationChartPartThreeAll->duration5 = $request->duration5;
        $medicationChartPartThreeAll->qty5 = $request->qty5;
        $medicationChartPartThreeAll->tick_if_slow_checkbox_part3 = $request->tick_if_slow_checkbox_part3;
        $medicationChartPartThreeAll->continue_on_discharge_radio_part3 = $request->continue_on_discharge_radio_part3;
        $medicationChartPartThreeAll->dispense_radio_part3 = $request->dispense_radio_part3;
        $medicationChartPartThreeAll->patient_id = $request->patient_id;
        $medicationChartPartThreeAll->doctor_id = $request->doctor_id;
        $medicationChartPartThreeAll->save();

        return response()->json([
            'status' => 200,
            'message' => 'Medication Chart Part three Save data Inserted Successfully',
            'medicationChartPartThreeAll' => $medicationChartPartThreeAll
        ]);
    }
    public function save__medication__chart__part__four__all(Request $request)
    {
        $medicationChartPartFourAll = new MhpMedicationChartPartFourAllTable();
        $medicationChartPartFourAll->duration6 = $request->duration6;
        $medicationChartPartFourAll->qty6 = $request->qty6;
        $medicationChartPartFourAll->tick_if_slow_checkbox_part4 = $request->tick_if_slow_checkbox_part4;
        $medicationChartPartFourAll->continue_on_discharge_radio_part4 = $request->continue_on_discharge_radio_part4;
        $medicationChartPartFourAll->dispense_radio_part4 = $request->dispense_radio_part4;
        $medicationChartPartFourAll->patient_id = $request->patient_id;
        $medicationChartPartFourAll->doctor_id = $request->doctor_id;
        $medicationChartPartFourAll->save();

        return response()->json([
            'status' => 200,
            'message' => 'Medication Chart Part Four Save data Inserted Successfully',
            'medicationChartPartFourAll' => $medicationChartPartFourAll
        ]);
    }


    public function index($id)
    {
        $alladr = DB::table('mhp_medication_chart_allergies_adrs')->leftJoin('mhp_allergies', 'mhp_allergies.id', 'mhp_medication_chart_allergies_adrs.allergy_id')->leftJoin('mhp_drug_names', 'mhp_drug_names.id', 'mhp_medication_chart_allergies_adrs.medicine_id')->leftJoin('mhp_reactions', 'mhp_medication_chart_allergies_adrs.reaction_type_id', 'mhp_reactions.id')->select('mhp_medication_chart_allergies_adrs.*', 'mhp_allergies.name as allergy_name', 'mhp_drug_names.drug_name', 'mhp_reactions.reaction_name as reaction')->where('patient_id', $id)->orderBy('mhp_medication_chart_allergies_adrs.id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'alladr' => $alladr]
        );
    }

    public function store(Request $request)
    {

        // $validator = Validator::make($request->all(),[
        //     'unit_name' => 'required|max:100',
        // ]);


        // if ($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $validator->messages(),
        //     ]);

        // }else{
        $unit = new MhpMedicationChartAllergiesAdr();
        $unit->allergy_id = $request->allergy_id;
        $unit->medicine_id = $request->medicine_id;
        $unit->reaction_type_id = $request->reaction_type_id;
        $unit->initials = $request->initials;
        $unit->others = $request->others;
        $unit->patient_id = $request->patient_id;
        $unit->doctor_id = $request->doctor_id;
        $unit->save();

        return response()->json(['status' => 200, 'message' => 'Allergies (adr) Added Successfully']);
    }

    public function saveMedicationPart1LastTable(Request $request)
    {
        $medicineTakenPriorTo = new MhpMedicationMedicineTakenPriorTable();
        $medicineTakenPriorTo->dose_of_frequency = $request->dose_of_frequency;
        $medicineTakenPriorTo->dose_name = $request->dose_name;
        $medicineTakenPriorTo->duration = $request->duration;
        $medicineTakenPriorTo->route = $request->route;
        $medicineTakenPriorTo->medicine_name = $request->medicine_name;
        $medicineTakenPriorTo->patient_id = $request->patient_id;
        $medicineTakenPriorTo->doctor_id = $request->doctor_id;
        $medicineTakenPriorTo->save();

        return response()->json(['status' => 200, 'message' => 'Medicine Prior Taken to Added Successfully']);
    }

    public function getMedicationPart1LastTable($id)
    {

        $allData = MhpMedicationMedicineTakenPriorTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }
    public function editMedicationPart1LastTable($id)
    {
        $editData = MhpMedicationMedicineTakenPriorTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateMedicationPart1LastTable(Request $request, $id)
    {
        $update_medicineTakenPriorTo = MhpMedicationMedicineTakenPriorTable::find($id);
        $update_medicineTakenPriorTo->dose_of_frequency = $request->dose_of_frequency;
        $update_medicineTakenPriorTo->dose_name = $request->dose_name;
        $update_medicineTakenPriorTo->duration = $request->duration;
        $update_medicineTakenPriorTo->route = $request->route;
        $update_medicineTakenPriorTo->medicine_name = $request->medicine_name;
        $update_medicineTakenPriorTo->patient_id = $request->patient_id;
        $update_medicineTakenPriorTo->doctor_id = $request->doctor_id;
        $update_medicineTakenPriorTo->update();

        return response()->json(['status' => 200, 'message' => 'Medicine Prior Taken to Updated Successfully']);
    }

    public function deleteAllergyAdr(Request $request, $id)
    {
        $deleteId = MhpMedicationChartAllergiesAdr::find($id);
        $deleteId->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Allergy Adr Deleted Successfully']
        );
    }

    public function deleteMedicationPart1LastTable(Request $request, $id)
    {
        $deleteId = MhpMedicationMedicineTakenPriorTable::find($id);
        $deleteId->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Medicine Prior Taken Deleted Successfully']
        );
    }

    //nuse initiated medicine 


    public function saveNurseInitiatedMedicine(Request $request)
    {
        $nurse_initiated = new MhpMedicationNurseInitiatedMedicine();
        $nurse_initiated->medicine_name = $request->medicine_name;
        $nurse_initiated->route = $request->route;
        $nurse_initiated->dose = $request->dose;
        $nurse_initiated->time_of_dose = $request->time_of_dose;
        $nurse_initiated->dose__time = $request->dose__time;
        $nurse_initiated->prescriber_or_nurse_sign = $request->prescriber_or_nurse_sign;
        $nurse_initiated->given_by = $request->given_by;
        $nurse_initiated->time_given = $request->time_given;
        $nurse_initiated->pharmacy = $request->pharmacy;
        $nurse_initiated->frequency = $request->frequency;
        $nurse_initiated->patient_id = $request->patient_id;
        $nurse_initiated->doctor_id = $request->doctor_id;
        $nurse_initiated->date = $request->date;
        $nurse_initiated->save();

        return response()->json(['status' => 200, 'message' => 'Nurse Initiated Medicine Added Successfully']);
    }
    public function getNurseInitiatedMedicine($id)
    {
        $allData = MhpMedicationNurseInitiatedMedicine::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }
    public function deleteNurseInitiatedMedicine(Request $request, $id)
    {
        $deleteId = MhpMedicationNurseInitiatedMedicine::find($id);
        $deleteId->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Nurse Initiated Medicine Deleted Successfully']
        );
    }





    public function editNurseInitiatedMedicine($id)
    {
        $editData = MhpMedicationNurseInitiatedMedicine::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateNurseInitiatedMedicine(Request $request, $id)
    {
        $update_nurse_initiated =  MhpMedicationNurseInitiatedMedicine::find($id);
        $update_nurse_initiated->medicine_name = $request->medicine_name;
        $update_nurse_initiated->route = $request->route;
        $update_nurse_initiated->dose = $request->dose;
        $update_nurse_initiated->time_of_dose = $request->time_of_dose;
        $update_nurse_initiated->dose__time = $request->dose__time;
        $update_nurse_initiated->prescriber_or_nurse_sign = $request->prescriber_or_nurse_sign;
        $update_nurse_initiated->given_by = $request->given_by;
        $update_nurse_initiated->time_given = $request->time_given;
        $update_nurse_initiated->pharmacy = $request->pharmacy;
        $update_nurse_initiated->frequency = $request->frequency;
        $update_nurse_initiated->patient_id = $request->patient_id;
        $update_nurse_initiated->doctor_id = $request->doctor_id;
        $update_nurse_initiated->date = $request->date;
        $update_nurse_initiated->update();

        return response()->json(['status' => 200, 'message' => 'Nurse Initiated Medicine Updated Successfully']);
    }

    //   //////// morshed Part-1 Telephone orders (to be signed within 24 hours of order) /////////////
    // table-4 start
    public function saveTelephoneOrdersMedicine(Request $request)
    {
        $telephone__orders = new MhpMedicationChartPartOneTelephoneOrdersMedicine();
        $telephone__orders->medicine__name = $request->medicine__name;
        $telephone__orders->route = $request->route;
        $telephone__orders->dose = $request->dose;
        $telephone__orders->frequency = $request->frequency;
        $telephone__orders->check__initials__n__one = $request->check__initials__n__one;
        $telephone__orders->check__initials__n__two = $request->check__initials__n__two;
        $telephone__orders->prescriber__nurse = $request->prescriber__nurse;
        $telephone__orders->date__no = $request->date__no;
        $telephone__orders->time__given__by__one = $request->time__given__by__one;
        $telephone__orders->time__given__by__two = $request->time__given__by__two;
        $telephone__orders->time__given__by__three = $request->time__given__by__three;
        $telephone__orders->time__given__by__four = $request->time__given__by__four;
        $telephone__orders->patient_id = $request->patient_id;
        $telephone__orders->doctor_id = $request->doctor_id;
        $telephone__orders->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine As required PRN medicines Added Successfully']);
    }
    public function getTelephoneOrdersMedicine($id)
    {
        $allData = MhpMedicationChartPartOneTelephoneOrdersMedicine::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }
    public function deleteTelephoneOrdersMedicine(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartOneTelephoneOrdersMedicine::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Telephone Deleted Successfully']
        );
    }

    public function deleteRecommendedGuideline(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartTwoRecommendedGuidelineTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Recomanded Deleted Successfully']
        );
    }


    // edit Regular Medicine PRESCRIBER MUST ENTER administration times
    public function editTelephoneOrdersMedicine($id)
    {
        $editData = MhpMedicationChartPartOneTelephoneOrdersMedicine::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateTelephoneOrdersMedicine(Request $request, $id)
    {

        $update__telephone__orders = MhpMedicationChartPartOneTelephoneOrdersMedicine::find($id);
        $update__telephone__orders->medicine__name = $request->medicine__name;
        $update__telephone__orders->route = $request->route;
        $update__telephone__orders->dose = $request->dose;
        $update__telephone__orders->frequency = $request->frequency;
        $update__telephone__orders->check__initials__n__one = $request->check__initials__n__one;
        $update__telephone__orders->check__initials__n__two = $request->check__initials__n__two;
        $update__telephone__orders->prescriber__nurse = $request->prescriber__nurse;
        $update__telephone__orders->date__no = $request->date__no;
        $update__telephone__orders->time__given__by__one = $request->time__given__by__one;
        $update__telephone__orders->time__given__by__two = $request->time__given__by__two;
        $update__telephone__orders->time__given__by__three = $request->time__given__by__three;
        $update__telephone__orders->time__given__by__four = $request->time__given__by__four;
        $update__telephone__orders->patient_id = $request->patient_id;
        $update__telephone__orders->doctor_id = $request->doctor_id;
        $update__telephone__orders->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine As required PRN medicines Updated Successfully']);
    }
    // // table-4 end

    //   //////// morshed Part-2 Regular Medicine Variable dose medicine /////////////

    public function saveRecommendedGuideline(Request $request)
    {
        $recommended__gudeline = new MhpMedicationChartPartTwoRecommendedGuidelineTable();
        $recommended__gudeline->time__schedule = $request->time__schedule;
        $recommended__gudeline->time__one = $request->time__one;
        $recommended__gudeline->time__two = $request->time__two;
        $recommended__gudeline->time__three = $request->time__three;
        $recommended__gudeline->time__four = $request->time__four;
        $recommended__gudeline->patient_id = $request->patient_id;
        $recommended__gudeline->doctor_id = $request->doctor_id;
        $recommended__gudeline->save();

        return response()->json(['status' => 200, 'message' => 'Recommended Guideline Only Added Successfully']);
    }
    public function getRecommendedGuideline($id)
    {
        $allData = MhpMedicationChartPartTwoRecommendedGuidelineTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }
    // edit Regular Medicine Variable Dose Medicine
    public function editRecommendedGuideline($id)
    {
        $editData = MhpMedicationChartPartTwoRecommendedGuidelineTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRecommendedGuideline(Request $request, $id)
    {
        $update__recommended__gudeline = MhpMedicationChartPartTwoRecommendedGuidelineTable::find($id);
        $update__recommended__gudeline->time__schedule = $request->time__schedule;
        $update__recommended__gudeline->time__one = $request->time__one;
        $update__recommended__gudeline->time__two = $request->time__two;
        $update__recommended__gudeline->time__three = $request->time__three;
        $update__recommended__gudeline->time__four = $request->time__four;
        $update__recommended__gudeline->patient_id = $request->patient_id;
        $update__recommended__gudeline->doctor_id = $request->doctor_id;
        $update__recommended__gudeline->update();

        return response()->json(['status' => 200, 'message' => 'Recommended Guideline Only Updated Successfully']);
    }

    // table-1 start
    public function saveRegularMedicineVariableDoseMedicine(Request $request)
    {
        $regular__medicine__variable__dose = new MhpMedicationChartPartTwoVariableDoseMedicineTable();
        $regular__medicine__variable__dose->medicine__name = $request->medicine__name;
        $regular__medicine__variable__dose->route = $request->route;
        $regular__medicine__variable__dose->dose = $request->dose;
        $regular__medicine__variable__dose->frequency = $request->frequency;
        $regular__medicine__variable__dose->indication = $request->indication;
        $regular__medicine__variable__dose->pharmacy__name = $request->pharmacy__name;
        $regular__medicine__variable__dose->prescriber__signaturer = $request->prescriber__signaturer;
        $regular__medicine__variable__dose->contact__no = $request->contact__no;
        $regular__medicine__variable__dose->drag__level = $request->drag__level;
        $regular__medicine__variable__dose->time__level__taken = $request->time__level__taken;
        $regular__medicine__variable__dose->prescriber = $request->prescriber;
        $regular__medicine__variable__dose->time__to__be__given = $request->time__to__be__given;
        $regular__medicine__variable__dose->time_given = $request->time_given;
        $regular__medicine__variable__dose->patient_id = $request->patient_id;
        $regular__medicine__variable__dose->doctor_id = $request->doctor_id;
        $regular__medicine__variable__dose->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Added Successfully']);
    }
    public function getRegularMedicineVariableDoseMedicine($id)
    {
        $allData = MhpMedicationChartPartTwoVariableDoseMedicineTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }

    // edit Regular Medicine Variable Dose Medicine
    public function editRegularMedicineVariableDoseMedicine($id)
    {
        $editData = MhpMedicationChartPartTwoVariableDoseMedicineTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicineVariableDoseMedicine(Request $request, $id)
    {

        $update__regular__medicine__variable__dose = MhpMedicationChartPartTwoVariableDoseMedicineTable::find($id);
        $update__regular__medicine__variable__dose->medicine__name = $request->medicine__name;
        $update__regular__medicine__variable__dose->route = $request->route;
        $update__regular__medicine__variable__dose->dose = $request->dose;
        $update__regular__medicine__variable__dose->frequency = $request->frequency;
        $update__regular__medicine__variable__dose->indication = $request->indication;
        $update__regular__medicine__variable__dose->pharmacy__name = $request->pharmacy__name;
        $update__regular__medicine__variable__dose->prescriber__signaturer = $request->prescriber__signaturer;
        $update__regular__medicine__variable__dose->contact__no = $request->contact__no;
        $update__regular__medicine__variable__dose->drag__level = $request->drag__level;
        $update__regular__medicine__variable__dose->time__level__taken = $request->time__level__taken;
        $update__regular__medicine__variable__dose->prescriber = $request->prescriber;
        $update__regular__medicine__variable__dose->time__to__be__given = $request->time__to__be__given;
        $update__regular__medicine__variable__dose->time_given = $request->time_given;
        $update__regular__medicine__variable__dose->patient_id = $request->patient_id;
        $update__regular__medicine__variable__dose->doctor_id = $request->doctor_id;
        $update__regular__medicine__variable__dose->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Updated Successfully']);
    }

    public function  deleteRegularMedicineVariableDoseMedicine(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartTwoVariableDoseMedicineTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Deleted Successfully']
        );
    }
    // table-1 end

    // table-2 start
    public function saveRegularMedicineVariableDoseMedicineTwo(Request $request)
    {
        $regular__medicine__variable__dose__two = new MhpMedicationChartPartTwoVariableDoseMedicineTwoTable();
        $regular__medicine__variable__dose__two->medicine__name = $request->medicine__name;
        $regular__medicine__variable__dose__two->route = $request->route;
        $regular__medicine__variable__dose__two->dose = $request->dose;
        $regular__medicine__variable__dose__two->frequency = $request->frequency;
        $regular__medicine__variable__dose__two->indication = $request->indication;
        $regular__medicine__variable__dose__two->pharmacy__name = $request->pharmacy__name;
        $regular__medicine__variable__dose__two->prescriber__signaturer = $request->prescriber__signaturer;
        $regular__medicine__variable__dose__two->contact__no = $request->contact__no;
        $regular__medicine__variable__dose__two->mechanical__prophylaxis = $request->mechanical__prophylaxis;
        $regular__medicine__variable__dose__two->prescriber__ni__signaturer = $request->prescriber__ni__signaturer;
        $regular__medicine__variable__dose__two->contact__no__two = $request->contact__no__two;
        $regular__medicine__variable__dose__two->am__check = $request->am__check;
        $regular__medicine__variable__dose__two->pm__check = $request->pm__check;
        $regular__medicine__variable__dose__two->patient_id = $request->patient_id;
        $regular__medicine__variable__dose__two->doctor_id = $request->doctor_id;
        $regular__medicine__variable__dose__two->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Added Successfully']);
    }
    public function getRegularMedicineVariableDoseMedicineTwo($id)
    {
        $allData = MhpMedicationChartPartTwoVariableDoseMedicineTwoTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }




    public function  deleteRegularMedicineVariableDoseMedicineTwo(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartTwoVariableDoseMedicineTwoTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Variable Dose Two Deleted Successfully']
        );
    }


    public function  deleteRegularMedicineVariableDoseMedicineThree(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartTwoMedicineThreeTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Variable Dose Three Deleted Successfully']
        );
    }

    public function  deleteRegularMedicineVariableDoseMedicineFour(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartTwoMedicineFourTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Variable Dose Four Deleted Successfully']
        );
    }

    public function  deleteRegularMedicineVariableDoseMedicineSeven(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartThreeMedicineSevenTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Variable Dose Seven Deleted Successfully']
        );
    }
    public function deleteRegularMedicineVariableDoseMedicineEight(Request $request, $id)
    {
        $deleteI = MhpMedicationChartPartFourMedicineEightTable::where('id', $id)->first();
        $deleteI->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Variable Dose Eight Deleted Successfully']
        );
    }




    // edit Regular Medicine Variable Dose Medicine
    public function editRegularMedicineVariableDoseMedicineTwo($id)
    {
        $editData = MhpMedicationChartPartTwoVariableDoseMedicineTwoTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicineVariableDoseMedicineTwo(Request $request, $id)
    {

        $update__regular__medicine__variable__dose__two = MhpMedicationChartPartTwoVariableDoseMedicineTwoTable::find($id);
        $update__regular__medicine__variable__dose__two->medicine__name = $request->medicine__name;
        $update__regular__medicine__variable__dose__two->route = $request->route;
        $update__regular__medicine__variable__dose__two->dose = $request->dose;
        $update__regular__medicine__variable__dose__two->frequency = $request->frequency;
        $update__regular__medicine__variable__dose__two->indication = $request->indication;
        $update__regular__medicine__variable__dose__two->pharmacy__name = $request->pharmacy__name;
        $update__regular__medicine__variable__dose__two->prescriber__signaturer = $request->prescriber__signaturer;
        $update__regular__medicine__variable__dose__two->contact__no = $request->contact__no;
        $update__regular__medicine__variable__dose__two->mechanical__prophylaxis = $request->mechanical__prophylaxis;
        $update__regular__medicine__variable__dose__two->prescriber__ni__signaturer = $request->prescriber__ni__signaturer;
        $update__regular__medicine__variable__dose__two->contact__no__two = $request->contact__no__two;
        $update__regular__medicine__variable__dose__two->am__check = $request->am__check;
        $update__regular__medicine__variable__dose__two->pm__check = $request->pm__check;
        $update__regular__medicine__variable__dose__two->patient_id = $request->patient_id;
        $update__regular__medicine__variable__dose__two->doctor_id = $request->doctor_id;
        $update__regular__medicine__variable__dose__two->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Updated Successfully']);
    }
    // table-2 end

    // table-3 start
    public function saveRegularMedicineVariableDoseMedicineThree(Request $request)
    {
        $regular__medicine__variable__dose__three = new MhpMedicationChartPartTwoMedicineThreeTable();
        $regular__medicine__variable__dose__three->medicine__name = $request->medicine__name;
        $regular__medicine__variable__dose__three->route = $request->route;
        $regular__medicine__variable__dose__three->dose = $request->dose;
        $regular__medicine__variable__dose__three->Prescriber__to__enter = $request->Prescriber__to__enter;
        $regular__medicine__variable__dose__three->indication = $request->indication;
        $regular__medicine__variable__dose__three->pharmacy__name = $request->pharmacy__name;
        $regular__medicine__variable__dose__three->prescriber__signaturer = $request->prescriber__signaturer;
        $regular__medicine__variable__dose__three->target__inr__range = $request->target__inr__range;
        $regular__medicine__variable__dose__three->inr__result = $request->inr__result;
        $regular__medicine__variable__dose__three->prescriber = $request->prescriber;
        $regular__medicine__variable__dose__three->sixteen__initial__1 = $request->sixteen__initial__1;
        $regular__medicine__variable__dose__three->initial__1 = $request->initial__1;
        $regular__medicine__variable__dose__three->patient_id = $request->patient_id;
        $regular__medicine__variable__dose__three->doctor_id = $request->doctor_id;
        $regular__medicine__variable__dose__three->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Added Successfully']);
    }
    public function getRegularMedicineVariableDoseMedicineThree($id)
    {
        $allData = MhpMedicationChartPartTwoMedicineThreeTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }
    // edit Regular Medicine Variable Dose Medicine
    public function editRegularMedicineVariableDoseMedicineThree($id)
    {
        $editData = MhpMedicationChartPartTwoMedicineThreeTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicineVariableDoseMedicineThree(Request $request, $id)
    {

        $update__regular__medicine__variable__dose__three = MhpMedicationChartPartTwoMedicineThreeTable::find($id);
        $update__regular__medicine__variable__dose__three->medicine__name = $request->medicine__name;
        $update__regular__medicine__variable__dose__three->route = $request->route;
        $update__regular__medicine__variable__dose__three->dose = $request->dose;
        $update__regular__medicine__variable__dose__three->Prescriber__to__enter = $request->Prescriber__to__enter;
        $update__regular__medicine__variable__dose__three->indication = $request->indication;
        $update__regular__medicine__variable__dose__three->pharmacy__name = $request->pharmacy__name;
        $update__regular__medicine__variable__dose__three->prescriber__signaturer = $request->prescriber__signaturer;
        $update__regular__medicine__variable__dose__three->target__inr__range = $request->target__inr__range;
        $update__regular__medicine__variable__dose__three->inr__result = $request->inr__result;
        $update__regular__medicine__variable__dose__three->prescriber = $request->prescriber;
        $update__regular__medicine__variable__dose__three->sixteen__initial__1 = $request->sixteen__initial__1;
        $update__regular__medicine__variable__dose__three->initial__1 = $request->initial__1;
        $update__regular__medicine__variable__dose__three->patient_id = $request->patient_id;
        $update__regular__medicine__variable__dose__three->doctor_id = $request->doctor_id;
        $update__regular__medicine__variable__dose__three->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Updated Successfully']);
    }
    // // table-3 end


    // table-4 start
    public function saveRegularMedicineVariableDoseMedicineFour(Request $request)
    {
        $regular__medicine__variable__dose__four = new MhpMedicationChartPartTwoMedicineFourTable();
        $regular__medicine__variable__dose__four->medicine__name = $request->medicine__name;
        $regular__medicine__variable__dose__four->route = $request->route;
        $regular__medicine__variable__dose__four->dose = $request->dose;
        $regular__medicine__variable__dose__four->frequency__and__now__enter = $request->frequency__and__now__enter;
        $regular__medicine__variable__dose__four->frequency__and__now__enter__time = $request->frequency__and__now__enter__time;
        $regular__medicine__variable__dose__four->indication = $request->indication;
        $regular__medicine__variable__dose__four->pharmacy__name = $request->pharmacy__name;
        $regular__medicine__variable__dose__four->prescriber__signaturer = $request->prescriber__signaturer;
        $regular__medicine__variable__dose__four->contact__no = $request->contact__no;
        $regular__medicine__variable__dose__four->patient_id = $request->patient_id;
        $regular__medicine__variable__dose__four->doctor_id = $request->doctor_id;
        $regular__medicine__variable__dose__four->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Added Successfully']);
    }
    public function getRegularMedicineVariableDoseMedicineFour($id)
    {
        $allData = MhpMedicationChartPartTwoMedicineFourTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }

    // edit Regular Medicine Variable Dose Medicine
    public function editRegularMedicineVariableDoseMedicineFour($id)
    {
        $editData = MhpMedicationChartPartTwoMedicineFourTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicineVariableDoseMedicineFour(Request $request, $id)
    {

        $update__regular__medicine__variable__dose__four = MhpMedicationChartPartTwoMedicineFourTable::find($id);
        $update__regular__medicine__variable__dose__four->medicine__name = $request->medicine__name;
        $update__regular__medicine__variable__dose__four->route = $request->route;
        $update__regular__medicine__variable__dose__four->dose = $request->dose;
        $update__regular__medicine__variable__dose__four->frequency__and__now__enter = $request->frequency__and__now__enter;
        $update__regular__medicine__variable__dose__four->frequency__and__now__enter__time = $request->frequency__and__now__enter__time;
        $update__regular__medicine__variable__dose__four->indication = $request->indication;
        $update__regular__medicine__variable__dose__four->pharmacy__name = $request->pharmacy__name;
        $update__regular__medicine__variable__dose__four->prescriber__signaturer = $request->prescriber__signaturer;
        $update__regular__medicine__variable__dose__four->contact__no = $request->contact__no;
        $update__regular__medicine__variable__dose__four->patient_id = $request->patient_id;
        $update__regular__medicine__variable__dose__four->doctor_id = $request->doctor_id;
        $update__regular__medicine__variable__dose__four->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Variable Dose Medicine Updated Successfully']);
    }
    // // table-4 end



    //   //////// morshed Part-3 Regular Medicine PRESCRIBER MUST ENTER administration times /////////////
    // table-7 start
    public function saveRegularMedicinePrescriberMustMedicineSeven(Request $request)
    {
        $regular__medicine__prescriber__must__seven = new MhpMedicationChartPartThreeMedicineSevenTable();
        $regular__medicine__prescriber__must__seven->medicine__name = $request->medicine__name;
        $regular__medicine__prescriber__must__seven->route = $request->route;
        $regular__medicine__prescriber__must__seven->dose = $request->dose;
        $regular__medicine__prescriber__must__seven->frequency__and__now__enter = $request->frequency__and__now__enter;
        $regular__medicine__prescriber__must__seven->frequency__and__now__enter__time = $request->frequency__and__now__enter__time;
        $regular__medicine__prescriber__must__seven->indication = $request->indication;
        $regular__medicine__prescriber__must__seven->pharmacy__name = $request->pharmacy__name;
        $regular__medicine__prescriber__must__seven->prescriber__signaturer = $request->prescriber__signaturer;
        $regular__medicine__prescriber__must__seven->contact__no = $request->contact__no;
        $regular__medicine__prescriber__must__seven->patient_id = $request->patient_id;
        $regular__medicine__prescriber__must__seven->doctor_id = $request->doctor_id;
        $regular__medicine__prescriber__must__seven->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine PRESCRIBER MUST ENTER administration times Added Successfully']);
    }
    public function getRegularMedicinePrescriberMustMedicineSeven($id)
    {
        $allData = MhpMedicationChartPartThreeMedicineSevenTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }

    // edit Regular Medicine PRESCRIBER MUST ENTER administration times
    public function editRegularMedicinePrescriberMustMedicineSeven($id)
    {
        $editData = MhpMedicationChartPartThreeMedicineSevenTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicinePrescriberMustMedicineSeven(Request $request, $id)
    {

        $update__regular__medicine__prescriber__must__seven = MhpMedicationChartPartThreeMedicineSevenTable::find($id);
        $update__regular__medicine__prescriber__must__seven->medicine__name = $request->medicine__name;
        $update__regular__medicine__prescriber__must__seven->route = $request->route;
        $update__regular__medicine__prescriber__must__seven->dose = $request->dose;
        $update__regular__medicine__prescriber__must__seven->frequency__and__now__enter = $request->frequency__and__now__enter;
        $update__regular__medicine__prescriber__must__seven->frequency__and__now__enter__time = $request->frequency__and__now__enter__time;
        $update__regular__medicine__prescriber__must__seven->indication = $request->indication;
        $update__regular__medicine__prescriber__must__seven->pharmacy__name = $request->pharmacy__name;
        $update__regular__medicine__prescriber__must__seven->prescriber__signaturer = $request->prescriber__signaturer;
        $update__regular__medicine__prescriber__must__seven->contact__no = $request->contact__no;
        $update__regular__medicine__prescriber__must__seven->patient_id = $request->patient_id;
        $update__regular__medicine__prescriber__must__seven->doctor_id = $request->doctor_id;
        $update__regular__medicine__prescriber__must__seven->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine PRESCRIBER MUST ENTER administration times Updated Successfully']);
    }
    // // table-7 end


    //   //////// morshed Part-4 Regular Medicine As required PRN medicines /////////////
    // table-8 start
    public function saveRegularMedicineAsRequiredPRNMedicineEight(Request $request)
    {
        $regular__medicine__as__required__prn__eight = new MhpMedicationChartPartFourMedicineEightTable();
        $regular__medicine__as__required__prn__eight->medicine__name = $request->medicine__name;
        $regular__medicine__as__required__prn__eight->route = $request->route;
        $regular__medicine__as__required__prn__eight->dose = $request->dose;
        $regular__medicine__as__required__prn__eight->hourly__frequency = $request->hourly__frequency;
        $regular__medicine__as__required__prn__eight->hourly__frequency__time = $request->hourly__frequency__time;
        $regular__medicine__as__required__prn__eight->max__prn__dose = $request->max__prn__dose;
        $regular__medicine__as__required__prn__eight->indication = $request->indication;
        $regular__medicine__as__required__prn__eight->pharmacy__name = $request->pharmacy__name;
        $regular__medicine__as__required__prn__eight->prescriber__signaturer = $request->prescriber__signaturer;
        $regular__medicine__as__required__prn__eight->contact__no = $request->contact__no;
        $regular__medicine__as__required__prn__eight->date__no = $request->date__no;
        $regular__medicine__as__required__prn__eight->time__when = $request->time__when;
        $regular__medicine__as__required__prn__eight->patient_id = $request->patient_id;
        $regular__medicine__as__required__prn__eight->doctor_id = $request->doctor_id;
        $regular__medicine__as__required__prn__eight->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine As required PRN medicines Added Successfully']);
    }
    public function getRegularMedicineAsRequiredPRNMedicineEight($id)
    {
        $allData = MhpMedicationChartPartFourMedicineEightTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }

    // edit Regular Medicine PRESCRIBER MUST ENTER administration times
    public function editRegularMedicineAsRequiredPRNMedicineEight($id)
    {
        $editData = MhpMedicationChartPartFourMedicineEightTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicineAsRequiredPRNMedicineEight(Request $request, $id)
    {

        $update__regular__medicine__as__required__prn__eight = MhpMedicationChartPartFourMedicineEightTable::find($id);
        $update__regular__medicine__as__required__prn__eight->medicine__name = $request->medicine__name;
        $update__regular__medicine__as__required__prn__eight->route = $request->route;
        $update__regular__medicine__as__required__prn__eight->dose = $request->dose;
        $update__regular__medicine__as__required__prn__eight->hourly__frequency = $request->hourly__frequency;
        $update__regular__medicine__as__required__prn__eight->hourly__frequency__time = $request->hourly__frequency__time;
        $update__regular__medicine__as__required__prn__eight->max__prn__dose = $request->max__prn__dose;
        $update__regular__medicine__as__required__prn__eight->indication = $request->indication;
        $update__regular__medicine__as__required__prn__eight->pharmacy__name = $request->pharmacy__name;
        $update__regular__medicine__as__required__prn__eight->prescriber__signaturer = $request->prescriber__signaturer;
        $update__regular__medicine__as__required__prn__eight->contact__no = $request->contact__no;
        $update__regular__medicine__as__required__prn__eight->date__no = $request->date__no;
        $update__regular__medicine__as__required__prn__eight->time__when = $request->time__when;
        $update__regular__medicine__as__required__prn__eight->patient_id = $request->patient_id;
        $update__regular__medicine__as__required__prn__eight->doctor_id = $request->doctor_id;
        $update__regular__medicine__as__required__prn__eight->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine As required PRN medicines Updated Successfully']);
    }
    // // table-8 end


    //   //////// morshed Part-5 Regular Medicine Allergies and adverse drug reactions (ADR) /////////////
    // table-9 start
    public function saveRegularMedicineAllergiesAndAdverseMedicineNine(Request $request)
    {
        $regular__medicine__allergies__and__adverse__nine = new MhpMedicationChartPartFiveMedicineNineTable();
        $regular__medicine__allergies__and__adverse__nine->medicine__name = $request->medicine__name;
        $regular__medicine__allergies__and__adverse__nine->reaction = $request->reaction;
        $regular__medicine__allergies__and__adverse__nine->patient_id = $request->patient_id;
        $regular__medicine__allergies__and__adverse__nine->doctor_id = $request->doctor_id;
        $regular__medicine__allergies__and__adverse__nine->save();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Allergies and adverse drug reactions (ADR) Added Successfully']);
    }
    public function getRegularMedicineAllergiesAndAdverseMedicineNine($id)
    {
        $allData = MhpMedicationChartPartFiveMedicineNineTable::where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'allData' => $allData]);
    }

    // edit Regular Medicine Allergies and adverse drug reactions (ADR)
    public function editRegularMedicineAllergiesAndAdverseMedicineNine($id)
    {
        $editData = MhpMedicationChartPartFiveMedicineNineTable::where('id', $id)->first();
        return response()->json(['status' => 200, 'editData' => $editData]);
    }
    public function updateRegularMedicineAllergiesAndAdverseMedicineNine(Request $request, $id)
    {

        $update__regular__medicine__allergies__and__adverse__nine = MhpMedicationChartPartFiveMedicineNineTable::find($id);
        $update__regular__medicine__allergies__and__adverse__nine->medicine__name = $request->medicine__name;
        $update__regular__medicine__allergies__and__adverse__nine->reaction = $request->reaction;
        $update__regular__medicine__allergies__and__adverse__nine->patient_id = $request->patient_id;
        $update__regular__medicine__allergies__and__adverse__nine->doctor_id = $request->doctor_id;
        $update__regular__medicine__allergies__and__adverse__nine->update();

        return response()->json(['status' => 200, 'message' => 'Regular Medicine Allergies and adverse drug reactions (ADR) Updated Successfully']);
    }
    // // table-8 end
    public function deleteRegularMedicineAllergiesAndAdverseMedicineNine(Request $request, $id)
    {
        $deleteId = MhpMedicationChartPartFiveMedicineNineTable::find($id);
        $deleteId->delete();
        return response()->json(
            ['status' => 200, 'message' => 'Regular Medicine Allergies  Deleted Successfully']
        );
    }
}
