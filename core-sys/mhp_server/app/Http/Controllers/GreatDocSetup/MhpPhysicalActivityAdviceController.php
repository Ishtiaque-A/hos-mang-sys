<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpPhysicalActivityAdvice;
use Illuminate\Http\Request;

class MhpPhysicalActivityAdviceController extends Controller
{
    //
    public function store(Request $request)
    {
        $physicalActivityAdvice = new MhpPhysicalActivityAdvice();
        $physicalActivityAdvice->patient_id = $request->patient_id;
        $physicalActivityAdvice->doctor_id = $request->doctor_id;
        $physicalActivityAdvice->image = $request->image;
        $physicalActivityAdvice->balance__training__ternary = $request->balance__training__ternary;
        $physicalActivityAdvice->flexibility__exercise__ternary = $request->flexibility__exercise__ternary;
        $physicalActivityAdvice->moderate__intensity__exercise__ternary = $request->moderate__intensity__exercise__ternary;
        $physicalActivityAdvice->frequency__value = $request->frequency__value;
        $physicalActivityAdvice->previews__date = $request->previews__date;

        $physicalActivityAdvice->aerobic_exercise = $request->aerobic_exercise;
        $physicalActivityAdvice->strength_building = $request->strength_building;
        $physicalActivityAdvice->endurance = $request->endurance;
        $physicalActivityAdvice->save();

        return response()->json([
            'status' => 200,
            'message' => 'Physical Activity Advice data Inserted Successfully',
            'physicalActivityAdvice' => $physicalActivityAdvice
        ]);
    }


    public function index($id)
    {
        $physicalActivityAdvice = MhpPhysicalActivityAdvice::with('doctor')->where('patient_id',$id)->orderBy('id','desc')->get();
        
        return response()->json([
            'status' => 200,
            'message' => 'Physical Activity Advice ',
            'physicalActivityAdvice' => $physicalActivityAdvice
        ]);
    }
    public function destroy($id)
    {
        $physicalActivityAdvice = MhpPhysicalActivityAdvice::find($id);
        $physicalActivityAdvice->delete();
        
        return response()->json([
            'status' => 200,
            'message' => 'Data delete sucessfully'
        ]);
    }


}
