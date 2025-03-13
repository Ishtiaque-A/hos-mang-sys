<?php

namespace App\Http\Controllers\GreatDocSetup\Review;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocReview;
use DB;

class ReviewNameController extends Controller
{
    public function store(Request $request)
    {

        $reson = new MhpGreatDocReview();
        $reson->patient_ID =(int) $request->patient_ID;
        $reson->review_name = $request->review_name;
        $reson->date = $request->date;
        $reson->note = $request->note;

        
        $reson->patient_mobile = $request->patient_mobile;
        $reson->doctor_id =(int)$request->doctor_id;
        $reson->doctor_name = $request->doctor_name;
        $reson->patient_name = $request->patient_name;
        $reson->save();

        return response()->json(['status' => 200, 'message' => 'Review Added Successfully']);
    }
}
