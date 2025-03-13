<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDoctorFeeName;
use Illuminate\Support\Facades\Validator;

class DoctorFeeNameController extends Controller
{
    public function index()
    {
        $doctorFeeName = MhpDoctorFeeName::with('accounts', 'accounts_type','invoice')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json(
            ['status' => 200, 'doctorFeeName' => $doctorFeeName]
        );
    }
    public function store(Request $request)
    {
        $doctorFeeName = new MhpDoctorFeeName();
        $doctorFeeName->fee_name = $request->fee_name;
        $doctorFeeName->accounts_id = $request->accounts_id;
        $doctorFeeName->accounts_type_id = $request->accounts_type_id;
        $doctorFeeName->save();
        return response()->json(['status' => 200, 'message' => 'Doctor FeeName Added Successfully']);
    }
    public function edit($id)
    {
        $doctorFeeName = MhpDoctorFeeName::with('accounts', 'accounts_type')->find($id);
        return response()->json(['status' => 200, 'doctorFeeName' => $doctorFeeName]);
    }
    public function update(Request $request, $id)
    {
        $update_doctorFeeName = MhpDoctorFeeName::find($id);
        $update_doctorFeeName->fee_name = $request->fee_name;
        $update_doctorFeeName->accounts_id = $request->accounts_id;
        $update_doctorFeeName->accounts_type_id = $request->accounts_type_id;
        $update_doctorFeeName->update();
        return response()->json(['status' => 200, 'message' => 'Doctor FeeName  Updated Successfully']);
    }
    public function destroy($id)
    {
        $del_doctorFeeName = MhpDoctorFeeName::find($id);
        $del_doctorFeeName->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Doctor FeeName  deleted successfully',
        ]);
    }
}
