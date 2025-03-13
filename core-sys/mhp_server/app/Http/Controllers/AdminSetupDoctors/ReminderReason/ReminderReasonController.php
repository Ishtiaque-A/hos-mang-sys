<?php

namespace App\Http\Controllers\AdminSetupDoctors\ReminderReason;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpReminderReason;
use Illuminate\Support\Facades\Validator;

class ReminderReasonController extends Controller
{
   public function index()
    {
        $reminder_reason = MhpReminderReason::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'reminder_reason'=>$reminder_reason]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'reason_name' => 'required|max:100',
       
        ],
        // ['status_id.required' => 'Status field is required!'] 
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } 
        else{
           
            $reminder_reason = new MhpReminderReason();
            $reminder_reason->reason_name = $request->reason_name;

         $reminder_reason->save();

            return response()->json(['status'=>200,'message'=>'Reminder Reason  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $reminder_reason=MhpReminderReason::find($id);
        return response()->json(['status'=>200,'reminder_reason'=>$reminder_reason]);
    }


    public function update(Request $request, $id)
    {

    
     
           
            $update_reminder_reason=MhpReminderReason::find($id);
            $update_reminder_reason->reason_name=$request->reason_name;
            $update_reminder_reason->update();

            return response()->json(['status'=>200,'message'=>'Reminder Reason  Updated Successfully']);
    }

    public function destroy($id)
    {
        $del_reminder_reason = MhpReminderReason::find($id);
        if ($del_reminder_reason)
        {
            if ($del_reminder_reason['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_reminder_reason->delete_status = $delete_status;
            $del_reminder_reason->save();
            return response()->json([
                'status' => 200,
                'message' => 'Reminder Reason  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Reminder Reason  Found',
            ]);
        }

    }
}
