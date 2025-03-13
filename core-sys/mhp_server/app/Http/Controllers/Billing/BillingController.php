<?php

namespace App\Http\Controllers\Billing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBilling;
use App\Models\MhpDoctorFee;
use App\Models\MhpInvoice;

class BillingController extends Controller
{

    public function index($id, $ivoiceNumber)
    {
        $allbilling = MhpBilling::where('patient_id', $id)->where('invoice_number', $ivoiceNumber)->where('delete_status', 0)->orderBy('id', 'desc')->get();



        return response()->json(
            ['status' => 200, 'allbilling' => $allbilling]
        );
    }


    public function getdoctors_by_fee_name($id)
    {
        $getdoctors = MhpDoctorFee::with('doctor_id')->where('accounts_group_id', $id)->orderBy('id', 'desc')->get();
        return response()->json(
            [
                'status' => 200,
                'getdoctors' => $getdoctors
            ]
        );
    }





    public function store(Request $request)
    {
        $billing = new MhpBilling();
        $billing->invoice_number = $request->invoice_number;
        $billing->doctor_id = $request->doctor_id;
        $billing->procedure_id = $request->procedure_id;
        $billing->patient_id = $request->patient_id;
        $billing->item_code = $request->item_code;
        $billing->item_details = $request->item_details;
        $billing->rate = $request->rate;
        $billing->qty = $request->qty;
        $billing->vat = $request->vat;
        $billing->tax = $request->tax;
        $billing->total = $request->total;
        $billing->save();

        return response()->json([
            'status' => 200,
            'message' => 'Billing Added Successfully',
            'billing' => $billing
        ]);
    }

    public function update(Request $request, $id)
    {

        // $validator = Validator::make($request->all(),[
        //     'fee_name' => 'required|integer|',
        //     'doctor_id' => 'required',
        //     'item_code' => 'required|unique:mhp_doctor_fees',
        // ],
        //    ['doctor_id.required' => 'Doctor Name field is required!']
        // );

        // if ($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $validator->messages(),
        //     ]);

        // }
        //  else{

        $update_billing = MhpBilling::find($id);
        $update_billing->item_details = $request->item_details;
        $update_billing->qty = $request->qty;
        $update_billing->rate = $request->rate;

        $update_billing->update();


        return response()->json(['status' => 200, 'message' => 'Billing Updated Successfully']);
    }




    public function edit($id)
    {

        $editBilling = MhpBilling::find($id);

        // if($editBilling['procedure_fee_id']=='null'){
        //      dd('asdasdasdasd');
        // }
        return response()->json(['status' => 200, 'edit_Billing' => $editBilling]);
    }

    public function destroy($id)
    {
        $del_billing = MhpBilling::find($id);
        if ($del_billing) {
            if ($del_billing['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $del_billing->delete_status = $delete_status;
            $del_billing->save();
            return response()->json([
                'status' => 200,
                'message' => 'Bill deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Billing Found',
            ]);
        }
    }


    public function doctorFeesDatas($doctorFeeId, $doctorid)
    {
        $resultFee = MhpDoctorFee::where('doctor_id', $doctorid)->where('doctorfee_id', $doctorFeeId)->first();

        return response()->json(
            [
                'status' => 200,
                'resultFee' => $resultFee
            ]
        );
    }


    public function save_invoice(Request $request)
    {
        $invoice = new MhpInvoice();
        $invoice->patient_id = $request->patient_id;
        $invoice->invoice_number = $request->invoice_number;
        $invoice->issued_date = $request->issued_date;
        $invoice->due_date = $request->due_date;
        $invoice->total_bill_amount = $request->total_bill_amount;
        $invoice->payment_amount = $request->payment_amount;
        $invoice->saas_branch_id = $request->saas_branch_id;
        $invoice->saas_branch_name = $request->saas_branch_name;
        $invoice->save();
        return response()->json(
            [
                'status' => 200,
                'message' => 'Invoce Data Save Succesfully',
                'invoice' => $invoice
            ]
        );
    }


    public function get_all_billing(Request $request)
    {
        $branchData = getBranchData($request->header());
        $query = MhpInvoice::query();
        if ($branchData['super_admin'] == false) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }
        $invoice = $query->with('patient_id')->orderBy('id', 'desc')->get();

        return response()->json(
            [
                'status' => 200,
                'message' => 'invoice Data Save Successfully',
                'invoice' => $invoice
            ]
        );
    }

    public function get_billing($id)
    {
        $invoice = MhpInvoice::where('invoice_number', $id)->with('patient_id')->first();

        return response()->json(
            [
                'status' => 200,
                'message' => 'Invoce Data Save Succesfully',
                'invoice' => $invoice
            ]
        );
    }
}
