<?php

namespace App\Http\Controllers\Appointments;

use Svg\Tag\Rect;

use App\Models\MhpDoctor;
use App\Models\MhpPatient;
use App\Models\MhpBirthSex;
use Illuminate\Support\Arr;
use App\Models\MhpDoctorFee;
use App\Models\MhpLabModule;
use Illuminate\Http\Request;
use App\Models\DoctorPayment;
use App\Models\MhpAppointment;
use App\Models\MhpPrescription;
use Illuminate\Validation\Rule;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpPatientRequest;
use App\Models\MhpDoctorsAcademic;
use App\Models\MhpLabDocInboxFile;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\MhpDoctorsCertificate;
use App\Models\MhpPatientPrescription;
use App\Models\MhpAppointmentScheduler;
use App\Models\MhpDoctorsDepartment;
use App\Models\MhpDoctorsWorkExperience;
use App\Models\OnlineAppointmentBooking;
use App\Models\MhpDoctorsLicenseTraining;
use Illuminate\Support\Facades\Validator;

class DoctorsController extends Controller
{
    //

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'dr_identity_no' => 'required',
            'dr_given_name' => 'required',
            'dr_last_name' => 'required',
            'dr_birth_sex_id' => 'required',
            'dr_mobile_phone' => 'required',
            'dr_work_phone' => 'required',
            'doctor_fee' => 'required',
            'department_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            if ($files = $request->file('doctorImage')) {
                $names = $files->getClientOriginalName();
                $name = rand(11, 99999) . $names;
                $files->move('doctors/images/', $name);
            } else {
                $name = "";
            }

            $doctors = new MhpDoctorsMaster();
            $doctors->dr_identity_no = $request->dr_identity_no;
            $doctors->title = $request->title;
            $doctors->department_id = $request->department_id;
            $doctors->specialists_id = $request->specialists_id;
            $doctors->dr_family_name = $request->dr_family_name;
            $doctors->dr_given_name = $request->dr_given_name;
            $doctors->dr_preferred_name = $request->dr_preferred_name;
            $doctors->dr_middle_name = $request->dr_middle_name;
            $doctors->dr_last_name = $request->dr_last_name;
            $doctors->dr_address_line_1 = $request->dr_address_line_1;
            $doctors->dr_address_line_2 = $request->dr_address_line_2;
            $doctors->dr_bmdc_reg_no = $request->dr_bmdc_reg_no;
            $doctors->dr_email = $request->dr_email;
            $doctors->dr_images =  $name;
            $doctors->dr_dob = $request->dr_dob;
            $doctors->dr_birth_sex_id = $request->dr_birth_sex_id;
            $doctors->dr_city_id = $request->dr_city_id;
            $doctors->dr_postal_code = $request->dr_postal_code;
            $doctors->dr_home_phone = $request->dr_home_phone;
            $doctors->dr_work_phone = $request->dr_work_phone;
            $doctors->dr_mobile_phone = $request->dr_mobile_phone;
            $doctors->dr_contact_via_id = $request->dr_contact_via_id;
            $doctors->dr_provider_id = $request->dr_provider_id;
            $doctors->work_experience_years  = $request->work_experience_years;
            $doctors->dr_about = $request->dr_about;
            $doctors->doctor_fee = $request->doctor_fee;

            $headers = $request->header();
            $branchData = getBranchData($headers);
            if ($branchData['super_admin'] == false) {
                $doctors->saas_branch_id = $branchData['branch_id'];
                $doctors->saas_branch_name = $branchData['branch_name'];
            } else {
                $doctors->saas_branch_id = $request->saas_branch_id;
                $doctors->saas_branch_name = $request->saas_branch_name;
            }
            $doctors->save();

            return response()->json([
                'status' => 200,
                'message' => 'Doctors Added Successfully',
                'doctors' => $doctors
            ]);
        }
    }

    public function academic(Request $request)
    {

        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/academic/', $name);
        } else {
            $name = "";
        }
        $doctorsAcademic = new MhpDoctorsAcademic();
        $doctorsAcademic->doctors_master_id = $request->doctors_master_id;
        $doctorsAcademic->degree_id = $request->degree_id;
        $doctorsAcademic->passing_year = $request->passing_year;
        $doctorsAcademic->result = $request->result;
        $doctorsAcademic->institution_id = $request->institution_id;
        $doctorsAcademic->country_id = $request->country_id;
        $doctorsAcademic->city_id = $request->city_id;
        $doctorsAcademic->scan_copy_title = $request->scan_copy_title;
        $doctorsAcademic->scan_copy = $name;
        $doctorsAcademic->save();
    }


    public function certificate(Request $request)
    {
        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/certificate/', $name);
        } else {
            $name = "";
        }
        $certificate = new MhpDoctorsCertificate();
        $certificate->doctors_master_id = $request->doctors_master_id;
        $certificate->certificate_title = $request->certificate_title;
        $certificate->certificate_name = $request->certificate_name;
        $certificate->provider_id = $request->provider_id;
        $certificate->country_id = $request->country_id;
        $certificate->city_id = $request->city_id;
        $certificate->scan_copy_title = $request->scan_copy_title;
        $certificate->scan_copy = $name;
        $certificate->details_of_course = $request->details_of_course;
        $certificate->save();
    }


    public function tarinnig(Request $request)
    {
        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/training/', $name);
        } else {
            $name = "";
        }
        $tarinnig = new MhpDoctorsLicenseTraining();
        $tarinnig->doctors_master_id = $request->doctors_master_id;
        $tarinnig->training_name = $request->training_name;
        $tarinnig->issuing_organization = $request->issuing_organization;
        $tarinnig->issue_date = $request->issue_date;
        $tarinnig->expire_date = $request->expire_date;
        $tarinnig->credential_identity = $request->credential_identity;
        $tarinnig->credential_url = $request->credential_url;
        $tarinnig->certificates_copy_title = $request->certificates_copy_title;
        $tarinnig->certificates_copy = $name;

        $tarinnig->save();
    }

    public function work(Request $request)
    {
        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/workexp/', $name);
        } else {
            $name = "";
        }

        $workexp = new MhpDoctorsWorkExperience();
        $workexp->doctors_master_id = $request->doctors_master_id;
        $workexp->work_experience_title = $request->work_experience_title;
        $workexp->employment_title = $request->employment_title;
        $workexp->company = $request->company;
        $workexp->location = $request->location;
        $workexp->start_date = $request->start_date;

        $workexp->end_date = $request->end_date;
        $workexp->is_present = $request->is_present;
        $workexp->certificates_copy_title = $request->certificates_copy_title;
        $workexp->certificates_copy = $name;
        $workexp->save();
    }




    public function index(Request $request)
    {
        $header = $request->header();
        $branchData = getBranchData($header);
        $doctors = [];
        if ($branchData['super_admin'] == false) {
            $doctors = MhpDoctorsMaster::where('saas_branch_id', $branchData['branch_id'])->with('title', 'birth_sex', 'usual_provider', 'department', 'specialist', 'academic')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        } else {
            $doctors = MhpDoctorsMaster::with('title', 'birth_sex', 'usual_provider', 'department', 'specialist', 'academic')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        }

        $birth_sex = MhpBirthSex::where('delete_status', 0)->get();
        return response()->json([
            'status' => 200,
            'doctors' => $doctors,
            'birth_sex' => $birth_sex,
        ]);
    }

    public function doctors_by_id($docId)
    {
        $doctors = MhpDoctorsMaster::where('id', $docId)->with('title', 'birth_sex', 'usual_provider', 'department', 'specialist', 'academic')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        $birth_sex = MhpBirthSex::where('delete_status', 0)->get();
        return response()->json([
            'status' => 200,
            'doctors' => $doctors,
            'birth_sex' => $birth_sex,
        ]);
    }

    public function doctors_consultation_fee($docId)
    {
        $doctors = MhpDoctorFee::where('doctor_id', $docId)->orderBy('id', 'desc')->leftJoin('mhp_doctor_fee_names', 'mhp_doctor_fees.accounts_group_id', '=', 'mhp_doctor_fee_names.id')->select('mhp_doctor_fee_names.fee_name as fee_type', 'mhp_doctor_fees.fee_name as amount', 'mhp_doctor_fees.doctor_id', 'mhp_doctor_fees.id')
            ->having('fee_type', 'Consultation Fee')
            ->first();
        // $doctors = MhpDoctorFee::with('accounts_group_id')->where('mhp_doctor_fee_names.accounts_group_id.fee_name', 'Consultation Fee')->get();

        // $doctors = MhpDoctorsMaster::get();

        return response()->json([
            'status' => 200,
            'doctors' => $doctors,
        ]);
    }

    public function destroy($id)
    {

        $doctorPersonal = MhpDoctorsMaster::find($id);

        $doctorPersonal->delete_status = 1;
        $doctorPersonal->update();

        return response()->json([
            'status' => 200,
            'message' => 'Doctors deleted successfully',
        ]);
    }

    public function edit($id)
    {
        $doctors = MhpDoctorsMaster::with('usual_provider')->with('department')->find($id);
        $academic = MhpDoctorsAcademic::where('doctors_master_id', 'LIKE', '%' . $id . '%')->get();
        $Certificate = MhpDoctorsCertificate::where('doctors_master_id', 'LIKE', '%' . $id . '%')->get();
        $trainnig = MhpDoctorsLicenseTraining::where('doctors_master_id', 'LIKE', '%' . $id . '%')->get();
        $work = MhpDoctorsWorkExperience::where('doctors_master_id', 'LIKE', '%' . $id . '%')->get();

        return response()->json([
            'status' => 200,
            'doctors' => $doctors,
            'academic' => $academic,
            'certificate' => $Certificate,
            'trainnig' => $trainnig,
            'work' => $work,

        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'dr_identity_no' => 'required',
            'dr_given_name' => 'required',
            'dr_last_name' => 'required',
            'dr_birth_sex_id' => 'required',
            'dr_mobile_phone' => 'required',
            'dr_work_phone' => 'required',
            'department_id' => 'required',
            'doctor_fee' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        } else {

            if ($files = $request->file('doctorImage')) {
                $names = $files->getClientOriginalName();
                $name = rand(11, 99999) . $names;
                $files->move('doctors/images/', $name);
            } else {
                $name = "";
            }


            $doctors = MhpDoctorsMaster::find($id);

            $doctors->dr_identity_no = $request->dr_identity_no;
            $doctors->title = $request->title;
            $doctors->department_id = $request->department_id;
            $doctors->specialists_id = $request->specialists_id;
            $doctors->dr_family_name = $request->dr_family_name;
            $doctors->dr_given_name = $request->dr_given_name;
            $doctors->dr_preferred_name = $request->dr_preferred_name;
            $doctors->dr_middle_name = $request->dr_middle_name;
            $doctors->dr_last_name = $request->dr_last_name;
            $doctors->dr_address_line_1 = $request->dr_address_line_1;
            $doctors->dr_address_line_2 = $request->dr_address_line_2;
            $doctors->dr_bmdc_reg_no = $request->dr_bmdc_reg_no;
            $doctors->dr_email = $request->dr_email;
            $doctors->dr_is_referred = $request->dr_is_referred;
            $doctors->dr_dob = $request->dr_dob;
            $doctors->dr_birth_sex_id = $request->dr_birth_sex_id;
            $doctors->dr_city_id = $request->dr_city_id;
            $doctors->dr_postal_code = $request->dr_postal_code;
            $doctors->dr_home_phone = $request->dr_home_phone;
            $doctors->dr_work_phone = $request->dr_work_phone;
            $doctors->dr_mobile_phone = $request->dr_mobile_phone;
            $doctors->dr_contact_via_id = $request->dr_contact_via_id;
            $doctors->dr_provider_id = $request->dr_provider_id;
            $doctors->work_experience_years  = $request->work_experience_years;
            $doctors->dr_about = $request->dr_about;
            $doctors->doctor_fee = $request->doctor_fee;

            if ($name == "") {
                $doctors->dr_images = $doctors->dr_images;
            } else {
                $doctors->dr_images = $name;
            }
            $doctors->update();
            return response()->json([
                'status' => 200,
                'message' => 'Doctors Updated Successfully',
                'doctors' => $doctors
            ]);
        }
    }
    public function update_doctor_app(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'dr_given_name' => 'required',
            'dr_last_name' => 'required',
            'dr_birth_sex_id' => 'required',
            'dr_mobile_phone' => 'required',
            'dr_work_phone' => 'required',
            'doctor_fee' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        } else {

            if ($files = $request->file('doctorImage')) {
                $names = $files->getClientOriginalName();
                $name = rand(11, 99999) . $names;
                $files->move('doctors/images/', $name);
            } else {
                $name = "";
            }


            $doctors = MhpDoctorsMaster::find($id);
            $doctors->dr_given_name = $request->dr_given_name;
            $doctors->dr_middle_name = $request->dr_middle_name;
            $doctors->dr_last_name = $request->dr_last_name;
            $doctors->dr_email = $request->dr_email;
            $doctors->dr_dob = $request->dr_dob;
            $doctors->dr_birth_sex_id = $request->dr_birth_sex_id;
            $doctors->dr_home_phone = $request->dr_home_phone;
            $doctors->dr_work_phone = $request->dr_work_phone;
            $doctors->dr_mobile_phone = $request->dr_mobile_phone;
            $doctors->work_experience_years  = $request->work_experience_years;
            $doctors->dr_about = $request->dr_about;
            $doctors->doctor_fee = $request->doctor_fee;

            if ($name == "") {
                $doctors->dr_images = $doctors->dr_images;
            } else {
                $doctors->dr_images = $name;
            }
            $doctors->update();
            return response()->json([
                'status' => 200,
                'message' => 'Doctors Updated Successfully',
                'doctors' => $doctors
            ]);
        }
    }

    public function AcademicUpdate(Request $request, $id)
    {
        $Academic = MhpDoctorsAcademic::find($id);

        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/academic/', $name);
        } else {
            $name = "";
        }
        $doctorsAcademic = MhpDoctorsAcademic::find($id);
        $doctorsAcademic->doctors_master_id = $request->doctors_master_id;
        $doctorsAcademic->degree_id = $request->degree_id;
        $doctorsAcademic->passing_year = $request->passing_year;
        $doctorsAcademic->result = $request->result;
        $doctorsAcademic->institution_id = $request->institution_id;
        $doctorsAcademic->country_id = $request->country_id;
        $doctorsAcademic->city_id = $request->city_id;
        $doctorsAcademic->scan_copy_title = $request->scan_copy_title;
        if ($name == "") {
            $doctorsAcademic->scan_copy = $doctorsAcademic->scan_copy;
        } else {
            $doctorsAcademic->scan_copy = $name;
        }
        $doctorsAcademic->update();
    }

    public function AcademicDestroy($id)
    {
        $doc = MhpDoctorsAcademic::find($id);
        $doc->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Academic Deleted Successfully',
            'data' => $doc
        ]);
    }

    public function CetificateDestroy($id)
    {
        $doc = MhpDoctorsCertificate::find($id);
        $doc->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Academic Deleted Successfully'
        ]);
    }
    public function trainingDestroy($id)
    {
        $doc = MhpDoctorsLicenseTraining::find($id);
        $doc->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Academic Deleted Successfully'
        ]);
    }
    public function workDestroy($id)
    {
        $doc = MhpDoctorsWorkExperience::find($id);
        $doc->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Academic Deleted Successfully'
        ]);
    }


    public function CetificateUpdate(Request $request, $id)
    {
        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/certificate/', $name);
        } else {
            $name = "";
        }
        $certificate = MhpDoctorsCertificate::find($id);
        $certificate->doctors_master_id = $request->doctors_master_id;
        $certificate->certificate_title = $request->certificate_title;
        $certificate->certificate_name = $request->certificate_name;
        $certificate->provider_id = $request->provider_id;
        $certificate->country_id = $request->country_id;
        $certificate->city_id = $request->city_id;
        $certificate->scan_copy_title = $request->scan_copy_title;

        if ($name == "") {
            $certificate->scan_copy = $certificate->scan_copy;
        } else {
            $certificate->scan_copy = $name;
        }
        $certificate->details_of_course = $request->details_of_course;
        $certificate->update();
    }

    public function trainingUpdate(Request $request, $id)
    {
        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/training/', $name);
        } else {
            $name = "";
        }
        $tarinnig = MhpDoctorsLicenseTraining::find($id);
        $tarinnig->doctors_master_id = $request->doctors_master_id;
        $tarinnig->training_name = $request->training_name;
        $tarinnig->issuing_organization = $request->issuing_organization;
        $tarinnig->issue_date = $request->issue_date;
        $tarinnig->expire_date = $request->expire_date;
        $tarinnig->credential_identity = $request->credential_identity;
        $tarinnig->credential_url = $request->credential_url;
        $tarinnig->certificates_copy_title = $request->certificates_copy_title;
        if ($name == "") {
            $tarinnig->certificates_copy =  $tarinnig->certificates_copy;
        } else {
            $tarinnig->certificates_copy = $name;
        }


        $tarinnig->update();
    }

    public function workUpdate(Request $request, $id)
    {
        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/workexp/', $name);
        } else {
            $name = "";
        }

        $workexp = MhpDoctorsWorkExperience::find($id);
        $workexp->doctors_master_id = $request->doctors_master_id;
        $workexp->work_experience_title = $request->work_experience_title;
        $workexp->employment_title = $request->employment_title;
        $workexp->company = $request->company;
        $workexp->location = $request->location;
        $workexp->start_date = $request->start_date;

        $workexp->end_date = $request->end_date;
        $workexp->is_present = $request->is_present;
        $workexp->certificates_copy_title = $request->certificates_copy_title;

        if ($name == "") {
            $workexp->certificates_copy = $workexp->certificates_copy;
        } else {
            $workexp->certificates_copy = $name;
        }
        $workexp->update();
    }

    public function all_doctors_booking(Request $request)
    {
        $headers = $request->header();
        $branchData = getBranchData($headers);
        if (!$branchData['branch_id']) {
            $doctors = MhpDoctorsMaster::where('delete_status', 0)->orderBy('id', 'desc')->get();
        } else {
            $doctors = MhpDoctorsMaster::where('delete_status', 0)->where('saas_branch_id', $branchData['branch_id'])->orderBy('id', 'desc')->get();
        }
        return response()->json([
            //            'status' => 200,
            'doctors' => $doctors,
            'headers' => $headers,
            'branchData' => $branchData
        ]);
    }


    public function doctor_search_by_dept($dept)
    {

        $result = MhpDoctorsMaster::where('department_id', 'LIKE', '%' . $dept . '%')
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }

    public function doctor_search_by_name($name)
    {

        $result = MhpDoctorsMaster::where('dr_given_name', 'LIKE', '%' . $name . '%')
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }

    public function doctor_search_by_Id($id)
    {

        $result = MhpDoctorsMaster::where('id', $id)
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }

    public function doctor_search($dept, $name)
    {

        $result = MhpDoctorsMaster::where('department_id', 'LIKE', '%' . $dept . '%')
            ->Where('dr_given_name', 'LIKE', '%' . $name . '%')
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }

    public function doctor_search_by_multiple_name(Request $request)
    {
        return response()->json($request->all());
        // $result = MhpDoctorsMaster::whereIn('dr_given_name',$request->data)
        // ->get();
        // if(count($result)){
        //         return Response()->json($result);
        //  }
        //  else{
        //     return response()->json(['Result' => 'No Data not found'],404);
        // }
    }

    public function doctors_profile($id)
    {
        $single_doctors = MhpDoctorsMaster::with('title', 'department', 'specialist', 'birth_sex', 'city', 'contact_via', 'usual_provider')->get();
        return response()->json([
            'status' => 200,
            'single_doctors' => $single_doctors,
        ]);
    }

    public function singleDoctorById($id)
    {
        // $doctor = DB::table('mhp_doctors_masters')
        // ->leftJoin('mhp_doctors_departments', 'mhp_doctors_departments.id', 'mhp_doctors_masters.department_id')
        // ->leftJoin('doc_specialists', 'doc_specialists.id', 'mhp_doctors_masters.specialists_id')
        // ->leftJoin('mhp_birth_sexes', 'mhp_birth_sexes.id', 'mhp_doctors_masters.dr_birth_sex_id')
        // ->leftJoin('mhp_cities', 'mhp_cities.id', 'mhp_doctors_masters.dr_city_id')
        // ->leftJoin('mhp_usual_providers', 'mhp_usual_providers.id', 'mhp_doctors_masters.dr_provider_id')
        // ->where('mhp_doctors_masters.delete_status', 0
        // )->where('mhp_doctors_masters.id', $id)->first();
        $doctor = MhpDoctorsMaster::with('title', 'department', 'specialist', 'birth_sex', 'city', 'contact_via', 'usual_provider')
            ->where('id', $id)
            ->first();
        return response()->json([
            'status' => 200,
            'doctor' => $doctor,
        ]);
    }

    ///////mobile api/////////// doctor search




    public function allDoctorSearch($dept, $name)
    {

        $result = DB::table('mhp_doctors_masters')->leftJoin('doc_specialists', 'doc_specialists.id', '=', 'mhp_doctors_masters.specialists_id')->where('mhp_doctors_masters.department_id', 'LIKE', '%' . $dept . '%')
            ->Where('mhp_doctors_masters.dr_given_name', 'LIKE', '%' . $name . '%')->orWhere('mhp_doctors_masters.dr_identity_no', 'LIKE', '%' . $name . '%')->orWhere('mhp_doctors_masters.dr_last_name', 'LIKE', '%' . $name . '%')->orWhere('mhp_doctors_masters.dr_bmdc_reg_no', 'LIKE', '%' . $name . '%', 'mhp_doctors_masters.dr_home_phone', 'LIKE', '%' . $name . '%')->orWhere('mhp_doctors_masters.dr_work_phone', 'LIKE', '%' . $name . '%')->orWhere('mhp_doctors_masters.dr_mobile_phone', 'LIKE', '%' . $name . '%')
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }


    public function randomTopDoctors()
    {

        $randomDoctors = MhpDoctorsMaster::inRandomOrder()->limit(5)->where('delete_status', 0)->get();

        return response()->json(['status' => 200, 'randomDoctors' => $randomDoctors]);
    }

    public function doctorAcademicInfo($id)
    {


        $docAcadamic = DB::table('mhp_doctors_academics')->leftJoin('mhp_countries', 'mhp_countries.id', 'mhp_doctors_academics.country_id')->leftJoin('mhp_cities', 'mhp_cities.id', 'mhp_doctors_academics.city_id')->where('mhp_doctors_academics.doctors_master_id', $id)->where('mhp_doctors_academics.delete_status', 0)->get();
        return response()->json(['status' => 200, 'docAcadamic' => $docAcadamic]);
    }

    public function doctorLicenseTrainingInfo($id)
    {
        $docLicenseTraining = MhpDoctorsLicenseTraining::where('doctors_master_id', $id)->where('delete_status', 0)->get();
        return response()->json(['status' => 200, 'docLicenseTraining' => $docLicenseTraining]);
    }

    public function doctorWorkExperience($id)
    {
        $docWorkExperience = MhpDoctorsWorkExperience::where('doctors_master_id', $id)->where('delete_status', 0)->get();
        return response()->json(['status' => 200, 'docWorkExperience' => $docWorkExperience]);
    }

    public function doctorCertificate($id)
    {
        $docCertificate = DB::table('mhp_doctors_certificates')->leftJoin('mhp_countries', 'mhp_countries.id', 'mhp_doctors_certificates.country_id')->leftJoin('mhp_cities', 'mhp_cities.id', 'mhp_doctors_certificates.city_id')->leftJoin('mhp_usual_providers', 'mhp_usual_providers.id', 'mhp_doctors_certificates.provider_id')->where('mhp_doctors_certificates.doctors_master_id', $id)->get();

        return response()->json(['status' => 200, 'docCertificate' => $docCertificate]);
    }

    public function app_token(Request $request, $id)
    {
        $doctor = MhpDoctorsMaster::find($id);

        if (!$doctor) {
            return response()->json([
                "status" => 404,
                "message" => "Doctor Not Found",
            ]);
        }

        $doctor->app_token = $request->token;
        $doctor->save();

        return response()->json([
            "status" => 200,
            "message" => "Token Updated",
            "doctor" => $doctor
        ]);
    }

    // for dg doctor version 1.0.0
    public function doctors_by_userid($id)
    {
        // return $dr_identity_no;
        $doctors = MhpDoctorsMaster::where('id', $id)->with('title', 'birth_sex', 'usual_provider', 'department', 'specialist', 'academic', 'workExperience')->where('delete_status', 0)->orderBy('id', 'desc')->first();
        return response()->json([
            'status' => 200,
            'doctors' => $doctors,
        ]);
    }


    public function doctorPatientList($id)
    {
        $patient_list = MhpPatientRequest::where('doctors_master_id', $id)->orderBy('id', 'DESC')->with('patients')->get();
        return response()->json([
            'success' => "Success",
            'data' => $patient_list,
        ], 200);
    }
    public function doctorPatientListPatientEnd($id, $branchId = 'null')
    {
        $query = MhpPatientRequest::where('doctors_master_id', $id);

        if ($branchId !== 'null') {
            $query->where('saas_branch_id', $branchId);
        }

        $count = $query->count();

        return response()->json([
            'data' => $count
        ], 200);
    }

    public function doctorListBranch($branchId = 'null')
    {
        // return $id;
        // $data = MhpDoctorsMaster::where('saas_branch_id', $id)->with('title', 'department', 'specialist', 'contact_via', 'workExperience', 'academic', 'usual_provider', 'token')->get();
        $doctors =  MhpDoctorsDepartment::with(['MhpDoctorsMaster' => function ($query) use ($branchId) {
            if ($branchId !== 'null') {
                $query->where('saas_branch_id', $branchId);
            }
        }])
            ->where('delete_status', 0)
            ->get();

        return response()->json([
            'success' => "Success",
            'data' => $doctors,
        ], 200);
    }

    public function PatientListDoctors($patientid)
    {
        $patient_list = MhpPatientRequest::where(['patient_id' => $patientid, 'status' => 1])
            ->orderBy('id', "DESC")->with('doctors')->get();
        return response()->json([
            'success' => "Success",
            'data' => $patient_list,
        ], 200);
    }
    public function deactivateDoctorWithAppointment($id, $doctorId)
    {
        $appointments = MhpPatientRequest::where(['patient_id' => $id, 'doctors_master_id' => $doctorId])
            ->get();
        if (count($appointments) > 0) {
            foreach ($appointments as $appointment) {
                $appointment->status = 0;
                $appointment->save();
            }
        }
        $patient_list = MhpPatientRequest::where(['patient_id' => $id, 'status' => 1])
            ->orderBy('id', "DESC")->with('doctors', 'token')->get();
        return response()->json([
            'success' => "Success",
            'data' => $patient_list,
        ], 200);
    }
    public function activateDoctorWithAppointment($id, $doctorId)
    {
        $appointments = MhpPatientRequest::where(['patient_id' => $id, 'doctors_master_id' => $doctorId, 'status' => 0])
            ->get();
        if (count($appointments) > 0) {
            foreach ($appointments as $appointment) {
                $appointment->status = 1;
                $appointment->save();
            }
        }
        $patient_list = MhpPatientRequest::where(['patient_id' => $id, 'status' => 1])
            ->orderBy('id', "DESC")->with('doctors', 'token')->get();
        return response()->json([
            'success' => "Success",
            'data' => $patient_list,
        ], 200);
    }
    public function deactivatedDoctors($id)
    {
        $appointments = MhpPatientRequest::where(['patient_id' => $id, 'status' => 0])
            ->with('doctors', 'token')
            ->orderBy('id', "DESC")
            ->get();
        return response()->json([
            'success' => "Success",
            'data' => $appointments,
        ], 200);
    }

    // version 1.0.00 for dg patient app
    public function patientRequest(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'dr_identity_no' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $dr_identity = MhpDoctorsMaster::where('dr_identity_no', $request->dr_identity_no)->first();

        if (!$dr_identity) {
            return response()->json([
                "message" => "Doctor Not Found",
            ], 404);
        }

        $checkId = MhpPatientRequest::where('doctors_master_id', $dr_identity->id)->where('patient_id', $id)->first();
        if ($checkId) {
            return response()->json([
                "message" => "You have already registered",
            ], 401);
        }
        $patient_request = new MhpPatientRequest();
        $patient_request->patient_id = $id;
        $patient_request->doctors_master_id = $dr_identity->id;
        $patient_request->status = 1;
        $patient_request->save();
        return response()->json([
            'message' => "Successfully store data",
        ], 200);
    }

    public function todayTransition($id)
    {

        $todaysDate = date("Y-m-d");
        $transactionSummary = DB::table('doctor_payments')
            ->leftJoin('mhp_doctors_masters', 'doctor_payments.doctor_id', '=', 'mhp_doctors_masters.id')->leftJoin('mhp_patients', 'doctor_payments.patient_hn_number', '=', 'mhp_patients.patient_hn_number')
            ->where('doctor_payments.doctor_id', $id)
            ->where('date', 'LIKE', '%' . $todaysDate . '%')
            ->select('mhp_patients.patient_hn_number', 'doctor_payments.*', DB::raw('CONCAT(mhp_doctors_masters.dr_given_name, " ", IFNULL(mhp_doctors_masters.dr_middle_name, ""), " ", IFNULL(mhp_doctors_masters.dr_last_name, "")) AS DrFullName'), DB::raw('CONCAT(mhp_patients.patient_first_name, " ", IFNULL(mhp_patients.patient_middle_name, ""), " ", IFNULL(mhp_patients.patient_last_name, "")) AS PtFullName'))->latest()->get();

        $totalAmmount = DB::table('doctor_payments')->where('doctor_id', $id)->where('date', 'like', '%' . $todaysDate . '%')->sum('amount');
        $totalTransaction = intval($totalAmmount);

        return response()->json([
            'summary' => $transactionSummary,
            'total' => $totalTransaction
        ]);
    }

    public function doctorTransaction(Request $request, $id)
    {

        if (!$request->startDate && !$request->endDate) {
            $transactionSummary = DB::table('doctor_payments')->leftJoin('mhp_doctors_masters', 'doctor_payments.doctor_id', '=', 'mhp_doctors_masters.id')->leftJoin('mhp_patients', 'doctor_payments.patient_hn_number', '=', 'mhp_patients.patient_hn_number')->where('doctor_payments.doctor_id', $id)->select('mhp_patients.patient_hn_number', 'doctor_payments.*', DB::raw('CONCAT(mhp_doctors_masters.dr_given_name, " ", IFNULL(mhp_doctors_masters.dr_middle_name, ""), " ", IFNULL(mhp_doctors_masters.dr_last_name, "")) AS DrFullName'), DB::raw('CONCAT(mhp_patients.patient_first_name, " ", IFNULL(mhp_patients.patient_middle_name, ""), " ", IFNULL(mhp_patients.patient_last_name, "")) AS PtFullName'))->latest()->get();
            $totalAmmount = DB::table('doctor_payments')->where('doctor_payments.doctor_id', $id)->sum('amount');
            $totalTransaction = intval($totalAmmount);
            return response()->json(['transactionSummary' => $transactionSummary, 'totalTransaction' => $totalTransaction]);
        } else {
            $transactionSummary = DB::table('doctor_payments')
                ->leftJoin('mhp_doctors_masters', 'doctor_payments.doctor_id', '=', 'mhp_doctors_masters.id')
                ->leftJoin('mhp_patients', 'doctor_payments.patient_id', '=', 'mhp_patients.id')
                ->where('doctor_payments.doctor_id', $id) // Explicitly specify the table name for doctor_id
                ->where('doctor_payments.date', 'LIKE', '%' . $request->endDate . '%')
                ->where('doctor_payments.date', 'LIKE', '%' . $request->startDate . '%')
                ->select(
                    'mhp_patients.patient_hn_number',
                    'doctor_payments.*',
                    DB::raw('CONCAT(mhp_doctors_masters.dr_given_name, " ", IFNULL(mhp_doctors_masters.dr_middle_name, ""), " ", IFNULL(mhp_doctors_masters.dr_last_name, "")) AS DrFullName'),
                    DB::raw('CONCAT(mhp_patients.patient_first_name, " ", IFNULL(mhp_patients.patient_middle_name, ""), " ", IFNULL(mhp_patients.patient_last_name, "")) AS PtFullName')
                )
                ->latest()
                ->get();

            $totalAmount = DB::table('doctor_payments')
                ->where('doctor_id', $id) // Explicitly specify the table name for doctor_id
                ->where('date', 'LIKE', '%' . $request->endDate . '%')
                ->where('date', 'LIKE', '%' . $request->startDate . '%')
                ->sum('amount');

            $totalTransaction = intval($totalAmount);
            return response()->json(['transactionSummary' => $transactionSummary, 'totalTransaction' => $totalTransaction]);

            // $transactionSummary = DB::table('doctor_payments')->leftJoin('mhp_doctors_masters', 'doctor_payments.doctor_id', '=', 'mhp_doctors_masters.id')->leftJoin('mhp_patients', 'doctor_payments.patient_id', '=', 'mhp_patients.id')->where('doctor_payments.doctor_id', $id)->where('date', 'LIKE', '%' . $request->endDate . '%')->where('date', 'LIKE', '%' . $request->startDate . '%')->select('mhp_patients.patient_hn_number', 'doctor_payments.*', DB::raw('CONCAT(mhp_doctors_masters.dr_given_name, " ", IFNULL(mhp_doctors_masters.dr_middle_name, ""), " ", IFNULL(mhp_doctors_masters.dr_last_name, "")) AS DrFullName'), DB::raw('CONCAT(mhp_patients.patient_first_name, " ", IFNULL(mhp_patients.patient_middle_name, ""), " ", IFNULL(mhp_patients.patient_last_name, "")) AS PtFullName'))->latest()->get();

            // $totalAmmount = DB::table('doctor_payments')->where('doctor_id', $id)->where('date', 'LIKE', '%' . $request->endDate . '%')->where('date', 'LIKE', '%' . $request->startDate . '%')->sum('amount');
            // $totalTransaction = intval($totalAmmount);
            // return response()->json(['transactionSummary' => $transactionSummary, 'totalTransaction' => $totalTransaction]);
        }
    }

    public function doctorMessages(Request $request)
    {
        $request->validate([
            'message' => 'required',
            'patient_mobile.*' => 'required',
        ]);
        $patientAllNumbers = $request->patient_mobile;
        $success = 0;
        foreach ($patientAllNumbers as $item) {
            $curl = Http::get("https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver=$item&message=$request->message");
            $count = ++$success;
        }
        if ($success >= 1) {
            return response()->json(['success' => "Message send successfully"]);
        } else {
            return response()->json(['error' => "Message went wrong"]);
        }
    }

    public function doctorHistory($dscID)
    {
        $doctor = MhpPatientPrescription::with('doctor', 'patient')->where('doctor_id', $dscID)->get();
        $patientGroupBy = $doctor->groupBy('patient_id')->count();
        return response()->json(['doctors' => $doctor, 'patient' => $patientGroupBy]);
    }
}
