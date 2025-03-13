<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDoctorFee;
use App\Models\MhpDoctorFeeName;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class DoctorFeeController extends Controller
{
    public function index()
    {
        // $doctorFee = MhpDoctorFee::where('delete_status',0)->orderBy('id','desc')->get();
        $doctorFee = DB::table('mhp_doctor_fees')->leftJoin('mhp_doctors_masters', 'mhp_doctor_fees.doctor_id', '=', 'mhp_doctors_masters.id')->leftJoin('mhp_doctor_fee_names', 'mhp_doctor_fees.doctorfee_id', '=', 'mhp_doctor_fee_names.id')->where('mhp_doctor_fees.delete_status', 0)->select('mhp_doctors_masters.*', 'mhp_doctor_fees.*',)->get();

        // dd($doctorFee);


        return response()->json(
            ['status' => 200, 'doctorFee' => $doctorFee]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'fee_name' => 'required|integer|',
            'doctor_id' => 'required',
            'item_code' => 'required|unique:mhp_doctor_fees',
            //  'doctorfee_id'=>'required',
            //  'accouts_id'=>'required',
            //  'acconts_type_id'=>'required',

        ], ['doctor_id.required' => 'Doctor Name field is required!']);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $doctorFee = new MhpDoctorFee();
            $doctorFee->doctorfee_id = $request->doctorfee_id;
            $doctorFee->fee_name = $request->fee_name;
            $doctorFee->doctor_id = $request->doctor_id;
            $doctorFee->item_code = $request->item_code;
            $doctorFee->accounts_id = $request->accounts_id;
            $doctorFee->accounts_type_id = $request->accounts_type_id;
            $doctorFee->accounts_group_id = $request->accounts_group_id;
            $doctorFee->save();



            return response()->json(['status' => 200, 'message' => 'Doctor Fee Added Successfully']);
        }
    }



    public function edit($id)
    {
        $doctorFee = MhpDoctorFee::find($id);
        return response()->json(['status' => 200, 'doctorFee' => $doctorFee]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'fee_name' => 'required|integer|',
                'doctor_id' => 'required',
                'item_code' => 'required',
                // 'doctorfee_id'=>'required'

            ],
            ['doctor_id.required' => 'Doctor Name field is required!']
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $update_doctorFee = MhpDoctorFee::find($id);

            $update_doctorFee->doctorfee_id = $request->doctorfee_id;
            $update_doctorFee->fee_name = $request->fee_name;
            $update_doctorFee->doctor_id = $request->doctor_id;
            $update_doctorFee->item_code = $request->item_code;
            $update_doctorFee->accounts_id = $request->accounts_id;
            $update_doctorFee->accounts_type_id = $request->accounts_type_id;
            $update_doctorFee->accounts_group_id = $request->accounts_group_id;

            $update_doctorFee->update();


            return response()->json(['status' => 200, 'message' => 'Doctor Fee Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_doctorFee = MhpDoctorFee::find($id);
        if ($del_doctorFee) {
            if ($del_doctorFee['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $del_doctorFee->delete_status = $delete_status;
            $del_doctorFee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Doctor Fee deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No doctorFee Found',
            ]);
        }
    }
    public function doctorFeeById($id)
    {
        $doctor_fee = MhpDoctorFee::where('doctor_id', $id)->first();
        return response()->json([
            'status' => 200,
            'doctor_fee' => $doctor_fee,
        ]);
    }

    public function allDoctorFee()
    {
        $doctorFees = MhpDoctorFeeName::where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'doctorFees' => $doctorFees,
        ]);
    }
    public function doctorSubProcedureById($id)
    {

        $doctorFees = MhpDoctorFee::where('doctorfee_id', $id)->where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'doctorFees' => $doctorFees,
        ]);
    }
    public function accounts_group_by_id($id)
    {


        $data = MhpDoctorFeeName::where('accounts_type_id', $id)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'accounts' => $data,
        ]);
    }
}
