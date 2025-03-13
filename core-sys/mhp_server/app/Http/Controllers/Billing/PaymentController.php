<?php

namespace App\Http\Controllers\Billing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPayment;
use Validator;
use DB;
class PaymentController extends Controller
{

   
     public function store(Request $request)
    {
    $validator = Validator::make($request->all(),[          
            'amount' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
       
       $payment=new MhpPayment();
       $payment->patient_id=$request->patient_id;
       $payment->invoice_number=$request->invoice_number;
        $payment->payment_type=$request->payment_type;
       $payment->bank_id=$request->bank_id;
       $payment->branch_id=$request->branch_id;
       $payment->check_number=$request->check_number;
       $payment->card_id=$request->card_id;
       $payment->card_number=$request->card_number;
       $payment->digital_id=$request->digital_id;
       $payment->transaction_number=$request->transaction_number;
       $payment->amount=$request->amount;
       $payment->save();

        return response()->json(['status'=>200,'message'=>'Payment Added Successfully']);
    }
}

    public function getAllPayment($id,$invoiceNumber)
    {
        $allPayments=MhpPayment::where('patient_id',$id)
        ->where('invoice_number',$invoiceNumber)
        ->where('delete_status',0)
        ->with('bank_id')
        ->with('branch_id')
        ->with('card_id')
        ->with('digital_id')
        ->orderBy('id','desc')->get();
        return response()->json(['status'=>200,'allPayments'=>$allPayments]);
    }

   public function edit($id){

        $editPayments=MhpPayment::find($id);

        return response()->json(['status'=>200,'edit_Payments'=>$editPayments]);
    }


    public function update(Request $request,$id)
    {     
        
      // return $request->all();
      
       $update_payment=MhpPayment::find($id);     
       $update_payment->patient_id=$request->patient_id;
       $update_payment->invoice_number=$request->invoice_number;
       $update_payment->payment_type=$request->payment_type;
       $update_payment->bank_id=$request->bank_id;
       $update_payment->branch_id=$request->branch_id;
       $update_payment->check_number=$request->check_number;
       $update_payment->card_id=$request->card_id;
       $update_payment->card_number=$request->card_number;
       $update_payment->digital_id=$request->digital_id;
       $update_payment->transaction_number=$request->transaction_number;
       $update_payment->amount=$request->amount;
       $update_payment->update();

        return response()->json(['status'=>200,'message'=>'Payment Updated Successfully']);
    }
 // }

    public function destroy($id)
    {
        $del_payment = MhpPayment::find($id);
        if ($del_payment)
        {
            if ($del_payment['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_payment->delete_status = $delete_status;
            $del_payment->save();
            return response()->json([
                'status' => 200,
                'message' => 'Payment deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Payment Found',
            ]);
        }


    }

    public function allPaymentAmount($id){
  $allPaymentAmount=MhpPayment::where('patient_id',$id)->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json(['status'=>200,'allPaymentAmount'=>$allPaymentAmount]);
    }

    
}
