<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\FavouriteDrugs;
use App\Models\MhpAppointmentScheduler;
use App\Models\MhpAutoFill;
use App\Models\MhpCustomMedicine;
use App\Models\MhpDiagnosisProcedure;
use App\Models\MhpDiagnosisProcedureFor;
use App\Models\MhpDrugGenericName;
use App\Models\MhpDrugName;
use App\Models\mhpPrescriptionSetup;
use App\Models\MhpReviewName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;
use Illuminate\Support\Facades\Log;

class DrugNameController extends Controller
{


    public function  drugs_of_mims()
    {

        $drugs = MhpDrugName::with('generic_name')->where('product_types', 'mims')->where('delete_status', 0)->orderBy('id', 'asc')->get();

        return response()->json([
            'status' => 200,
            'drugs' => $drugs,
        ]);
    }

    public function fav_drug()
    {

        $drugs = MhpDrugName::with('generic_name')->where('is_favourite', 1)->where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json([
            'status' => 200,
            'drugs' => $drugs,
        ]);
    }



    public function Generic()
    {

        $drugGeneric = MhpDrugGenericName::orderBy('id', 'desc')->where('delete_status', 0)->get();
        return response()->json([
            'status' => 200,
            'drugGeneric' => $drugGeneric,
        ]);
    }

    public function Generic_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $drugs = new MhpDrugGenericName();
            $drugs->name = $request->input('name');
            $drugs->save();

            return response()->json([
                'status' => 200,
                'message' => 'Generic Name Added Successfully',
            ]);
        }
    }

    public function Generic_edit($id)
    {
        $drugs = MhpDrugGenericName::find($id);
        if ($drugs) {
            return response()->json([
                'status' => 200,
                'drugs' => $drugs,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Drug Name Id Found',
            ]);
        }
    }

    public function Generic_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $drugs = MhpDrugGenericName::find($id);
            if ($drugs) {
                $drugs->name = $request->input('name');
                $drugs->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Generic Name Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Generic Name Id Found',
                ]);
            }
        }
    }

    public function Generic_destroy($id)
    {

        $drugs = MhpDrugGenericName::find($id);
        if ($drugs) {
            if ($drugs['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $drugs->delete_status = $delete_status;
            $drugs->save();
            return response()->json([
                'status' => 200,
                'message' => 'Drugs deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Drugs Found',
            ]);
        }
    }


    public function drugs_by_generic($id)
    {

        $drugs = MhpDrugName::with('generic_name')->where('generic_id', $id)->where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'drugs' => $drugs,
        ]);
    }



    public function search_drug(Request $request)
    {

        $drugs = [];

        $typeSelection = $request->input('typeSelection') ? $request->input('typeSelection') : "";
        $name = $request->input('name') ? $request->input('name') : "";
        $drugType = $request->input('drugType') ? $request->input('drugType') : 0;


        if ($typeSelection === "custom") {
            $drugs = MhpCustomMedicine::where('custom_medicine_name', 'like', '%' . $name . '%')->get();
        } elseif ($typeSelection === "favDrug") {
            $drugs = $this->fetchDrugsWithConditions($name, true, $drugType);
        } else {
            $drugs = $this->fetchDrugsWithConditions($name, false, $drugType);
        }

        if (count($drugs)) {
            return response()->json($drugs);
        } else {
            return response()->json(['drugs' => 'No Data found'], 404);
        }
    }

    function fetchDrugsWithConditions($name, $isFavourite, $drugType)
    {
        $convertDrugTypeName = $drugType == 1 ? 'macrohealth_sg' : 'mims_sg';
        $normalizedSearchTerm = str_replace(
            ['%', '_'],
            ['\%', '\_'],
            $name
        );

        // Debugging: Log the normalized search term
        //Log::info('Normalized Search Term: ' . $normalizedSearchTerm);
        $query = MhpDrugName::where('use_for', 'Human')
            ->with('generic_name')
            ->where(function ($query) use ($convertDrugTypeName, $normalizedSearchTerm) {
                $query->where($convertDrugTypeName, 'LIKE', '%' . $normalizedSearchTerm . '%');
            });

        if ($isFavourite) {
            $query->where('is_favourite', 1);
        }
        $query->where('delete_status', 0);
        //Log::info('SQL Query: ' . $query->toSql());

        return $query->get();
    }






    // ->where(function ($query) use ($name) {
    //     $query->where('drug_name', 'LIKE', '%' . $name . '%')
    //         ->orWhere('macrohealth_sg', 'LIKE', '%' . $name . '%')
    //         ->orWhereHas('generic_name', function ($q) use ($name) {
    //             $q->where('name', 'LIKE', '%' . $name . '%');
    //         });
    // })

    public function search_drug_name($name)
    {
        $drugs = MhpDrugName::with('generic_name')
            ->where('drug_name', 'LIKE', '%' . $name . '%')
            ->where('delete_status', 0)
            ->first();

        if (count($drugs)) {
            return Response()->json($drugs);
        } else {
            return response()->json(['drugs' => 'No Data not found'], 404);
        }
    }
    public function search_drug_Asc_desc($name)
    {
        $drugs = MhpDrugName::with('generic_name')
            ->where('delete_status', 0)
            ->orderBy('id', $name)->get();

        if (count($drugs)) {
            return Response()->json($drugs);
        } else {
            return response()->json(['drugs' => 'No Data not found'], 404);
        }
    }


    public function drug_index_gd(Request $request)
    {

        $drugs = MhpDrugName::with('generic_name')
            ->where('use_for', 'Human')
            ->where('delete_status', 0)
            ->orderBy('id', 'asc')
            ->take(100)->get();

        $custom = DB::table('mhp_ingerdient_children')
            ->leftJoin('mhp_custom_medicines', 'mhp_ingerdient_children.custom_medicine_id', 'mhp_custom_medicines.id')
            ->leftJoin('mhp_ingredients', 'mhp_ingerdient_children.ingredient_id', 'mhp_ingredients.id')
            ->leftJoin('mhp_medicine_categories', 'mhp_custom_medicines.medicine_category_id', 'mhp_medicine_categories.id')
            ->leftJoin('mhp_route_names', 'mhp_custom_medicines.route_id', 'mhp_route_names.id')
            ->leftJoin('mhp_custom_restrictions', 'mhp_custom_medicines.restriction_id', 'mhp_custom_restrictions.id')
            ->select('mhp_ingerdient_children.*', 'mhp_ingredients.ingredient_name', 'mhp_custom_medicines.custom_medicine_name', 'mhp_custom_medicines.other_details', 'mhp_custom_medicines.qty', 'mhp_custom_medicines.strength', 'mhp_custom_medicines.medicine_category_id', 'mhp_custom_medicines.route_id', 'mhp_medicine_categories.medicinecategory_name', 'mhp_custom_medicines.restriction_id', 'mhp_route_names.route_name', 'mhp_custom_restrictions.restriction_name')->get();
        // $custom = MhpCustomMedicine::orderBy('id', 'asc')
        //     ->take(100)->get();
        $branchData = getBranchData($request->header());
        $favAdded = FavouriteDrugs::where('doctor_id', $branchData['user_id'])->pluck('drug_id');
        $fav = MhpDrugName::with('generic_name')
            ->whereIn('id', $favAdded)
            ->where('use_for', 'Human')
            ->where('delete_status', 0)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'drugs' => $drugs,
            'custom' => $custom,
            'fav' => $fav,
        ], 201);
    }
    public function gd_all_api()
    {

        $diagnosis = MhpDiagnosisProcedure::where('DiagnosisProcedure_type', 'diagnosis')
            ->select('id', 'DiagnosisProcedure_code', 'DiagnosisProcedure_name')
            ->where('delete_status', 0)->orderBy('id', 'asc')->get();

        $ResonForVisit = MhpDiagnosisProcedure::where('DiagnosisProcedure_type', 'ResonForVisit')
            ->select('id', 'DiagnosisProcedure_code', 'DiagnosisProcedure_name')
            ->where('delete_status', 0)->orderBy('id', 'asc')->get();

        $ResonForVisit2nd = MhpDiagnosisProcedureFor::where('DiagnosisProcedureFor_type', 'ResonForVisit')->where('delete_status', 0)->orderBy('id', 'desc')->get();

        $autoFill = MhpAutoFill::where('delete_status', 0)->orderBy('id', 'desc')->get();

        $review_name = MhpReviewName::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json([
            'diagnosis' => $diagnosis,
            'ResonForVisit' => $ResonForVisit,
            'ResonForVisit2nd' => $ResonForVisit2nd,
            'autoFill' => $autoFill,
            'reviewName' => $review_name,
        ], 201);
    }
    public function gd_all_api_2nd($id)
    {
        $todaysDate = date("Y-m-d");
        $tommrrow = date('Y-m-d', strtotime($todaysDate . ' + 1 days'));
        $upto4days = date('Y-m-d', strtotime($todaysDate . ' + 5 days'));

        $GDPatientAppointmentToday = MhpAppointmentScheduler::where('patient_id', '!=', 'null')
            ->where('status_name', '!=', 'null')
            ->Where('status_name', '!=', 'notattend')
            ->where('status_name', '!=', 'Unavilable')
            ->where('doctors_id', $id)
            ->with('patientAppionment')
            ->with('doctors')
            ->where('appointment_completed', 0)
            ->where('delete_status', 0)
            ->where('StartTime', 'LIKE', '%' . $todaysDate . '%')
            ->with('patients')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC')
            ->get();

        $upcomingAppointments = MhpAppointmentScheduler::where('doctors_id', $id)
            ->whereBetween('StartTime', [$tommrrow, $upto4days])
            ->with('patientAppionment')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC')
            ->where('delete_status', 0)
            ->get();

        $employee = DB::table('mhp_employees')->leftJoin('mhp_user_types', 'mhp_user_types.id', 'mhp_employees.user_type_id')->leftJoin('mhp_birth_sexes', 'mhp_birth_sexes.id', 'mhp_employees.birth_sex_id')
            ->where('user_type_name', 'LIKE', '%' . 'nurse' . '%')->get();

        $prescriptionTemplate = mhpPrescriptionSetup::where('doctor_id', $id)->first();


        return response()->json([
            'GDPatientAppointmentToday' => $GDPatientAppointmentToday,
            'upcomingAppointments' => $upcomingAppointments,
            'nurse' => $employee,
            'prescriptionTemplate' => $prescriptionTemplate

        ], 201);
    }



    public function index()
    {

        $drugs = MhpDrugName::with('generic_name')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'drugs' => $drugs,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'drug_name' => 'required|max:191',
            'qty' => 'required|max:191',
            'rpts' => 'required|max:191',
            'bpp' => 'required|max:191',
            'tgp' => 'required|max:191',
            'restriction' => 'required|max:191',

            // 'generic_id' => 'required|max:191',
            'drug_description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $drugs = new MhpDrugName();
            $drugs->src_primary_key = $request->input('src_primary_key');
            $drugs->strength = $request->input('strength');
            $drugs->macrohealth_sg = $request->input('macrohealth_sg');
            $drugs->mims_sg = $request->input('mims_sg');
            $drugs->mims_type = $request->input('mims_type');
            $drugs->guid = $request->input('guid');
            $drugs->delete_status = 0;
            $drugs->product_types = $request->input('product_types');


            $drugs->drug_name = $request->input('drug_name');
            $drugs->qty = $request->input('qty');
            $drugs->rpts = $request->input('rpts');
            $drugs->bpp = $request->input('bpp');
            $drugs->tgp = $request->input('tgp');
            $drugs->restriction = $request->input('restriction');
            $drugs->generic_id = $request->input('generic_id');
            $drugs->drug_description = $request->input('drug_description');
            $drugs->use_for = "Human";
            $drugs->save();

            return response()->json([
                'status' => 200,
                'message' => 'Drug Name Added Successfully',
            ]);
        }
    }


    public function edit($id)
    {
        $drugs = MhpDrugName::with('generic_name')->find($id);

        if ($drugs) {
            return response()->json([
                'status' => 200,
                'drugs' => $drugs,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Drug Name Id Found',
            ]);
        }
    }

    public function fav_dug_update(Request $request, $id)
    {
        $branchData = getBranchData($request->header());
        $alreadyExist = FavouriteDrugs::where('drug_id', $id)->where('doctor_id', $branchData['user_id'])->first();
        if ($alreadyExist) {
            return response()->json([
                'status' => 200,
                'message' => 'Already Exist',
            ]);
        } else {
            $drugs = new FavouriteDrugs();
            $drugs->doctor_id = $branchData['user_id'];
            $drugs->drug_id = $id;
            $drugs->save();
            return response()->json([
                'status' => 200,
                'message' => 'Fav drugs add Succefully',
                'drug' => $drugs
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'drug_name' => 'required|max:191',
            'qty' => 'required|max:191',
            'rpts' => 'required|max:191',
            'bpp' => 'required|max:191',
            'tgp' => 'required|max:191',
            'restriction' => 'required|max:191',

            // 'generic_id' => 'required|max:191',
            'drug_description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $drugs = MhpDrugName::find($id);
            if ($drugs) {

                $drugs->src_primary_key = $request->input('src_primary_key');
                $drugs->strength = $request->input('strength');
                $drugs->macrohealth_sg = $request->input('macrohealth_sg');
                $drugs->mims_sg = $request->input('mims_sg');
                $drugs->mims_type = $request->input('mims_type');
                $drugs->guid = $request->input('guid');
                $drugs->product_types = $request->input('product_types');
                $drugs->drug_name = $request->input('drug_name');
                $drugs->qty = $request->input('qty');
                $drugs->rpts = $request->input('rpts');
                $drugs->bpp = $request->input('bpp');
                $drugs->tgp = $request->input('tgp');
                $drugs->restriction = $request->input('restriction');

                $drugs->generic_id = $request->input('generic_id');
                $drugs->drug_description = $request->input('drug_description');
                $drugs->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Drug Name Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Drug Name Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {

        $drugs = MhpDrugName::find($id);
        if ($drugs) {
            if ($drugs['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $drugs->delete_status = $delete_status;
            $drugs->save();
            return response()->json([
                'status' => 200,
                'message' => 'Drugs deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Drugs Found',
            ]);
        }
    }
}
