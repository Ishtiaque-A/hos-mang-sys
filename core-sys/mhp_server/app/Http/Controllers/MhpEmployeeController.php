<?php

namespace App\Http\Controllers;

use App\Models\MhpBirthSex;
use App\Models\MhpEmployee;
use App\Models\MhpEmployeeAcademic;
use App\Models\MhpEmployeeCertificate;
use App\Models\MhpEmployeeLicences;
use App\Models\MhpEmployeeWorksAndExperiense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MhpEmployeeController extends Controller
{
    public function generateEmployeeId()
    {
        $employee = MhpEmployee::orderBy('id', 'desc')->first();
        $employeeId = 100000;
        if ($employee) {
            $employeeId += $employee->id;
        } else {
            $id = 1;
        }
        return response()->json([
            'status' => 200,
            'employee_id' => 'EIN-' . $employeeId
        ]);
    }
    public function store(Request $request)

    {

        $validator = Validator::make($request->all(), [
            'identity_no' => 'required',
            'user_type_id' => 'required',
            'first_name' => 'required',
            'given_name' => 'required',
            'last_name' => 'required',
            'birth_sex_id' => 'required',
            'work_phone' => 'required',
        ]);

        $branchData = getBranchData($request->header());


        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            if ($files = $request->file('employeeImage')) {
                $names = $files->getClientOriginalName();
                $name = rand(11, 99999) . $names;
                $files->move('employee/images/', $name);
            } else {
                $name = "";
            }

            if ($files = $request->file('employeeSignatureImage')) {
                $names = $files->getClientOriginalName();
                $signature_name = rand(11, 99999) . $names;
                $files->move('employee/signature/', $signature_name);
            } else {
                $signature_name = "";
            }


            $employee = new MhpEmployee();
            if (!$branchData['super_admin']) {
                $employee->saas_branch_id = $branchData['branch_id'];
                $employee->saas_branch_name = $branchData['branch_name'];
            } else {
                $employee->saas_branch_id = $request->saas_branch_id;
                $employee->saas_branch_name = $request->saas_branch_name;
            }
            $employee->identity_no = $request->identity_no;
            $employee->title = $request->title;
            $employee->department_id = $request->department_id;
            $employee->specialists_id = $request->specialists_id;
            $employee->first_name = $request->first_name;
            $employee->given_name = $request->given_name;
            $employee->preferred_name = $request->preferred_name;
            $employee->middle_name = $request->middle_name;

            $employee->last_name = $request->last_name;

            $employee->address_line_1 = $request->address_line_1;
            $employee->address_line_2 = $request->address_line_2;
            $employee->bmdc_reg_no = $request->bmdc_reg_no;
            $employee->email = $request->email;

            $employee->image =  $name;
            $employee->signature_image =  $signature_name;

            $employee->dob = $request->dob;
            $employee->birth_sex_id = $request->birth_sex_id;
            $employee->city_id = $request->city_id;
            $employee->postal_code = $request->postal_code;
            $employee->home_phone = $request->home_phone;
            $employee->work_phone = $request->work_phone;
            $employee->mobile_phone = $request->mobile_phone;
            $employee->contact_via_id = $request->contact_via_id;
            $employee->provider_id = $request->provider_id;
            $employee->user_type_id = $request->user_type_id;
            $employee->save();

            return response()->json([
                'status' => 200,
                'message' => 'Emlpoyee Inserted Successfully',
                'employee' => $employee
            ]);
        }
    }

    public function academic(Request $request)
    {

        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('employee/scan_copy/academic/', $name);
        } else {
            $name = "";
        }
        $employeeAcademic = new MhpEmployeeAcademic();
        $employeeAcademic->employee_id = $request->employee_id;
        $employeeAcademic->degree_id = $request->degree_id;
        $employeeAcademic->passing_year = $request->passing_year;
        $employeeAcademic->result = $request->result;
        $employeeAcademic->institution_id = $request->institution_id;
        $employeeAcademic->country_id = $request->country_id;
        $employeeAcademic->city_id = $request->city_id;
        $employeeAcademic->scan_copy_title = $request->scan_copy_title;
        $employeeAcademic->scan_copy = $name;
        $employeeAcademic->save();
    }


    public function certificate(Request $request)
    {

        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('employee/scan_copy/certificate/', $name);
        } else {
            $name = "";
        }
        $certificate = new MhpEmployeeCertificate();
        $certificate->employee_id = $request->employee_id;
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
            $files->move('employee/scan_copy/training/', $name);
        } else {
            $name = "";
        }
        $tarinnig = new MhpEmployeeLicences();
        $tarinnig->employee_id = $request->employee_id;
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
            $files->move('employee/scan_copy/workexp/', $name);
        } else {
            $name = "";
        }

        $workexp = new MhpEmployeeWorksAndExperiense();
        $workexp->employee_id = $request->employee_id;
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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $branchData = getBranchData($request->header());
        $employeeQuery = MhpEmployee::query();
        if (!$branchData['super_admin']) {
            $employeeQuery->where('saas_branch_id', $branchData['branch_id']);
        }
        $employee = $employeeQuery->with('birth_sex', 'user_type')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        $birth_sex = MhpBirthSex::where('delete_status', 0)->get();
        return response()->json([
            'status' => 200,
            'employee' => $employee,
            'birth_sex' => $birth_sex
        ]);
    }
    public function nurse()
    {
        $employee = DB::table('mhp_employees')->leftJoin('mhp_user_types', 'mhp_user_types.id', 'mhp_employees.user_type_id')->leftJoin('mhp_birth_sexes', 'mhp_birth_sexes.id', 'mhp_employees.birth_sex_id')->where('user_type_name', 'LIKE', '%' . 'nurse' . '%')->get();

        return response()->json([
            'status' => 200,
            'nurse' => $employee,

        ]);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpEmployee  $mhpEmployee
     * @return \Illuminate\Http\Response
     */


    public function edit($id)
    {
        $employee = MhpEmployee::with('usual_provider', 'user_type')->find($id);
        $academic = MhpEmployeeAcademic::where('employee_id', 'LIKE', '%' . $id . '%')->get();
        $Certificate = MhpEmployeeCertificate::where('employee_id', 'LIKE', '%' . $id . '%')->get();
        $trainnig = MhpEmployeeLicences::where('employee_id', 'LIKE', '%' . $id . '%')->get();
        $work = MhpEmployeeWorksAndExperiense::where('employee_id', 'LIKE', '%' . $id . '%')->get();

        return response()->json([
            'status' => 200,
            'employee' => $employee,
            'academic' => $academic,
            'certificate' => $Certificate,
            'trainnig' => $trainnig,
            'work' => $work,

        ]);
    }



    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'identity_no' => 'required',
            'user_type_id' => 'required',
            'first_name' => 'required',
            'given_name' => 'required',
            'last_name' => 'required',
            'birth_sex_id' => 'required',
            'work_phone' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            if ($files = $request->file('doctorImage')) {
                $names = $files->getClientOriginalName();
                $name = rand(11, 99999) . $names;
                $files->move('employee/images/', $name);
            } else {
                $name = "";
            }


            $doctors = MhpEmployee::find($id);

            $doctors->identity_no = $request->identity_no;
            $doctors->title = $request->title;
            $doctors->department_id = $request->department_id;
            $doctors->specialists_id = $request->specialists_id;
            $doctors->first_name = $request->first_name;
            $doctors->given_name = $request->given_name;
            $doctors->preferred_name = $request->preferred_name;
            $doctors->middle_name = $request->middle_name;
            $doctors->last_name = $request->last_name;
            $doctors->address_line_1 = $request->address_line_1;
            $doctors->address_line_2 = $request->address_line_2;
            $doctors->bmdc_reg_no = $request->bmdc_reg_no;
            $doctors->email = $request->email;
            $doctors->is_referred = $request->is_referred;
            $doctors->dob = $request->dob;
            $doctors->birth_sex_id = $request->birth_sex_id;
            $doctors->city_id = $request->city_id;
            $doctors->postal_code = $request->postal_code;
            $doctors->home_phone = $request->home_phone;
            $doctors->work_phone = $request->work_phone;
            $doctors->mobile_phone = $request->mobile_phone;
            $doctors->contact_via_id = $request->contact_via_id;
            $doctors->provider_id = $request->provider_id;

            $doctors->user_type_id = $request->user_type_id;

            if ($name == "") {
                $doctors->image = $doctors->image;
            } else {
                $doctors->image = $name;
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
        $Academic = MhpEmployeeAcademic::find($id);

        if ($files = $request->file('scan_copy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('doctors/scan_copy/academic/', $name);
        } else {
            $name = "";
        }
        $doctorsAcademic = MhpEmployeeAcademic::find($id);
        $doctorsAcademic->employee_id = $request->employee_id;
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
        $doc = MhpEmployeeAcademic::find($id);
        $doc->delete();
    }

    public function CetificateDestroy($id)
    {
        $doc = MhpEmployeeCertificate::find($id);
        $doc->delete();
    }
    public function trainingDestroy($id)
    {
        $doc = MhpEmployeeLicences::find($id);
        $doc->delete();
    }
    public function workDestroy($id)
    {
        $doc = MhpEmployeeWorksAndExperiense::find($id);
        $doc->delete();
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
        $certificate = MhpEmployeeCertificate::find($id);
        $certificate->employee_id = $request->employee_id;
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
        $tarinnig = MhpEmployeeLicences::find($id);
        $tarinnig->employee_id = $request->employee_id;
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

        $workexp = MhpEmployeeWorksAndExperiense::find($id);
        $workexp->employee_id = $request->employee_id;
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


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpEmployee  $mhpEmployee
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $doctorPersonal = MhpEmployee::find($id);

        $doctorPersonal->delete_status = 1;
        $doctorPersonal->update();
    }

    public function employee_profile($id)
    {
        $employee = MhpEmployee::with('birth_sex', 'user_type', 'title', 'city', 'contact_via', 'usual_provider')->findOrFail($id);
        return response()->json([
            'status' => 200,
            'employee' => $employee,
        ]);
    }
}
