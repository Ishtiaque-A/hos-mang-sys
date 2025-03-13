<?php

namespace App\Http\Controllers;

use App\Models\MhpLabAgent;
use App\Models\MhpLabAgentAcademic;
use App\Models\MhpLabAgentCertificate;
use App\Models\MhpLabAgentLicence;
use App\Models\MhpLabAgentWorkExp;
use Illuminate\Http\Request;

class MhpLabAgentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpLabAgent::query();
        if (!$branchData['super_admin']) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $data = $query->with('titleName', 'genderName')->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "Lab agent list",
            "agent" => $data
        ]);
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
        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }
        $branchData = getBranchData($request->header());
        $data = new MhpLabAgent;
        if (!$branchData['super_admin']) {
            $data->saas_branch_id = $branchData['branch_id'];
            $data->saas_branch_name = $branchData['branch_name'];
        } else {
            $data->saas_branch_id = $request->saas_branch_id;
            $data->saas_branch_name = $request->saas_branch_name;
        }
        $data->type = $request->type;
        $data->title = $request->title;
        $data->name = $request->name;
        $data->fatherName = $request->fatherName;
        $data->motherName = $request->motherName;
        $data->dob = $request->dob;
        $data->gender = $request->gender;
        $data->workPhone = $request->workPhone;
        $data->mobilePhone = $request->mobilePhone;
        $data->email = $request->email;
        $data->address = $request->address;
        $data->housePlan = $request->housePlan;
        $data->emergencyCenter = $request->emergencyCenter;
        $data->specialist = $request->specialist;
        $data->specialistArray = $request->specialistArray;
        $data->image = $name;

        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Lab agent data added  successfully",
            "agentInfo" => $data,
            'request' => $request->all()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpLabAgent  $mhpLabAgent
     * @return \Illuminate\Http\Response
     */
    public function saveAcademic(Request $request)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = new MhpLabAgentAcademic();
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->degreeName = $request->degreeName;
        $data->countryName = $request->countryName;
        $data->passingYear = $request->passingYear;
        $data->cityName = $request->cityName;
        $data->result = $request->result;
        $data->scanCopyTitle = $request->scanCopyTitle;
        $data->institutionName = $request->institutionName;
        $data->scanCopy = $name;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Academic added successfully",
            "data" => $data
        ]);
    }
    public function saveCertificate(Request $request)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = new MhpLabAgentCertificate();
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->degreeName = $request->degreeName;
        $data->countryName = $request->countryName;
        $data->passingYear = $request->passingYear;
        $data->cityName = $request->cityName;
        $data->result = $request->result;
        $data->scanCopyTitle = $request->scanCopyTitle;
        $data->institutionName = $request->institutionName;
        $data->scanCopy = $name;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "Certificate added successfully",
            "data" => $data
        ]);
    }
    public function saveLicense(Request $request)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = new MhpLabAgentLicence();
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->title = $request->title;
        $data->credentialID = $request->credentialID;
        $data->issueOrganize = $request->issueOrganize;
        $data->credentialURL = $request->credentialURL;
        $data->issueDate = $request->issueDate;
        $data->certificateCopy = $request->certificateCopy;
        $data->expireDate = $request->expireDate;
        $data->scanCopy = $name;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "License and training added successfully",
            "data" => $data
        ]);
    }
    public function saveWorkExp(Request $request)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = new MhpLabAgentWorkExp();
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->title = $request->title;
        $data->startDate = $request->startDate;
        $data->employmentType = $request->employmentType;
        $data->isPresent = $request->isPresent;
        $data->companyName = $request->companyName;
        $data->endDate = $request->endDate;
        $data->location = $request->location;
        $data->certificateCopy = $request->certificateCopy;
        $data->scanCopy = $name;
        $data->save();

        return response()->json([
            "status" => 200,
            "message" => "License and training added successfully",
            "data" => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpLabAgent  $mhpLabAgent
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $agent = MhpLabAgent::find($id);
        $academic = MhpLabAgentAcademic::where('lab_agent_master_id', 'LIKE', '%' . $id . '%')->get();
        $certificate = MhpLabAgentCertificate::where('lab_agent_master_id', 'LIKE', '%' . $id . '%')->get();
        $training = MhpLabAgentLicence::where('lab_agent_master_id', 'LIKE', '%' . $id . '%')->get();
        $work = MhpLabAgentWorkExp::where('lab_agent_master_id', 'LIKE', '%' . $id . '%')->get();
        return response()->json([
            "status" => 200,
            "message" => "Agent all data",
            "agent" => $agent,
            "academic" => $academic,
            "certificate" => $certificate,
            "training" => $training,
            "work" => $work,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpLabAgent  $mhpLabAgent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }
        $data = MhpLabAgent::find($id);
        $data->type = $request->type;
        $data->title = $request->title;
        $data->name = $request->name;
        $data->fatherName = $request->fatherName;
        $data->motherName = $request->motherName;
        $data->dob = $request->dob;
        $data->gender = $request->gender;
        $data->workPhone = $request->workPhone;
        $data->mobilePhone = $request->mobilePhone;
        $data->email = $request->email;
        $data->address = $request->address;
        $data->housePlan = $request->housePlan;
        $data->emergencyCenter = $request->emergencyCenter;
        $data->specialist = $request->specialist;
        $data->specialistArray = $request->specialistArray;
        $data->image = $name;

        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Lab agent data updated successfully",
            "agentInfo" => $data
        ]);
    }
    public function updateAcademic(Request $request, $id)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = MhpLabAgentAcademic::find($id);
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->degreeName = $request->degreeName;
        $data->countryName = $request->countryName;
        $data->passingYear = $request->passingYear;
        $data->cityName = $request->cityName;
        $data->result = $request->result;
        $data->scanCopyTitle = $request->scanCopyTitle;
        $data->institutionName = $request->institutionName;
        $data->scanCopy = $name;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Academic updated successfully",
            "data" => $data
        ]);
    }
    public function updateCertificate(Request $request, $id)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = MhpLabAgentCertificate::find($id);
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->degreeName = $request->degreeName;
        $data->countryName = $request->countryName;
        $data->passingYear = $request->passingYear;
        $data->cityName = $request->cityName;
        $data->result = $request->result;
        $data->scanCopyTitle = $request->scanCopyTitle;
        $data->institutionName = $request->institutionName;
        $data->scanCopy = $name;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Certificate updated successfully",
            "data" => $data
        ]);
    }
    public function updateLicense(Request $request, $id)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = MhpLabAgentLicence::find($id);
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->title = $request->title;
        $data->credentialID = $request->credentialID;
        $data->issueOrganize = $request->issueOrganize;
        $data->credentialURL = $request->credentialURL;
        $data->issueDate = $request->issueDate;
        $data->certificateCopy = $request->certificateCopy;
        $data->expireDate = $request->expireDate;
        $data->scanCopy = $name;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "License and training updated successfully",
            "data" => $data
        ]);
    }
    public function updateWorkExp(Request $request, $id)
    {
        if ($files = $request->file('scanCopy')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = MhpLabAgentWorkExp::find($id);
        $data->lab_agent_master_id = $request->lab_agent_master_id;
        $data->title = $request->title;
        $data->startDate = $request->startDate;
        $data->employmentType = $request->employmentType;
        $data->isPresent = $request->isPresent;
        $data->companyName = $request->companyName;
        $data->endDate = $request->endDate;
        $data->location = $request->location;
        $data->certificateCopy = $request->certificateCopy;
        $data->scanCopy = $name;
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "License and training updated successfully",
            "data" => $data
        ]);
    }

    // remove certificate 
    public function removeAcademic($id)
    {

        $data = MhpLabAgentAcademic::find($id);
        $data->delete();

        return response()->json([
            "status" => 200,
            "message" => "Academic deleted successfully",
            "data" => $data
        ]);
    }
    public function removeCertificate($id)
    {
        $data = MhpLabAgentCertificate::find($id);

        $data->delete();

        return response()->json([
            "status" => 200,
            "message" => "Certificate deleted successfully",
            "data" => $data
        ]);
    }
    public function removeLicense($id)
    {

        $data = MhpLabAgentLicence::find($id);
        $data->delete();

        return response()->json([
            "status" => 200,
            "message" => "License and training deleted successfully",
            "data" => $data
        ]);
    }
    public function removeWorkExp($id)
    {

        $data = MhpLabAgentWorkExp::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "License and training deleted successfully",
            "data" => $data
        ]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpLabAgent  $mhpLabAgent
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MhpLabAgent::find($id);
        $academic = MhpLabAgentAcademic::where('lab_agent_master_id', $id,)->get();
        $certificate = MhpLabAgentCertificate::where('lab_agent_master_id', $id,)->get();
        $license = MhpLabAgentLicence::where('lab_agent_master_id', $id,)->get();
        $work = MhpLabAgentWorkExp::where('lab_agent_master_id', $id,)->get();

        foreach ($academic as $aca) {
            $aca->delete();
        }
        foreach ($certificate as $cert) {
            $cert->delete();
        }
        foreach ($license as $li) {
            $li->delete();
        }
        foreach ($work as $wo) {
            $wo->delete();
        }
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Lab Agent Deleted Successfully",
            "agent" => $data,
            "academic" => $academic,
            "certificate" => $certificate,
            "work" => $work,
        ]);
    }
}
