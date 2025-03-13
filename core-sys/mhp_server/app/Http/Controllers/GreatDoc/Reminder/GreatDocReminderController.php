<?php

namespace App\Http\Controllers\GreatDoc\Reminder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocReminder;

class GreatDocReminderController extends Controller
{
    public function store(Request $request){
          $reminder = new MhpGreatDocReminder();
            $reminder->reason_id = $request->reason_id;
            $reminder->patient_id = $request->patient_id;
            $reminder->dr_id = $request->dr_id;
            $reminder->location_id = $request->location_id;
            $reminder->dueBetween = $request->dueBetween;
            $reminder->andDate = $request->andDate;
            $reminder->onDate = $request->onDate;
            $reminder->onDate = $request->onDate;
            $reminder->inactive_patient = $request->inactive_patient;
            $reminder->overrude_reminder = $request->overrude_reminder;
            $reminder->multipleChecked = implode(',', $request->multipleChecked);

         $reminder->save();

            return response()->json(['status'=>200,'message'=>'Reminder   Added Successfully']);
        }
    }

