<?php

namespace App\Http\Controllers\GreatDocSetup\Paediatric;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPaediatricDental;
class PaediatricDentalSection extends Controller
{
    public function store(Request $request)
    {
    //         $validator = Validator::make($request->all(),[
    //         'diagnosis_id' => 'required|max:100',
    //         'diagnosis_for_id' => 'required|max:100',
    //         'diagnosis_action_id' => 'required|max:100',
       
    //     ],
    // );

    //     if ($validator->fails())
    //     {
    //         return response()->json([
    //             'status' => 400,
    //             'errors' => $validator->messages(),
    //         ]);

    //     } 
    //     else{
    
            $paediatric_dental = new MhpPaediatricDental();
            $paediatric_dental->daily_tooth_brush = $request->daily_tooth_brush;
            $paediatric_dental->family_history  = $request->family_history ;
            $paediatric_dental->regular_dentist = $request->regular_dentist;
            $paediatric_dental->patient_id = $request->patient_id;
            $paediatric_dental->save();

            return response()->json(['status'=>200,'message'=>'Paediatric Dental Added Successfully']);
        
    // }
}
}
