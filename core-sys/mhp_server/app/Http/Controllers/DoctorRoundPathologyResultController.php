<?php

namespace App\Http\Controllers;

use App\Models\DoctorRoundPathologyResult;
use App\Models\DoctorRoundPathologyResultDetails;
use Illuminate\Http\Request;
use App\Models\RadiologyResultParameter;
use DB;
class DoctorRoundPathologyResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $data = new DoctorRoundPathologyResult();
        $data->appointment_id = $request->appointment_id;
        $data->doctor_id = $request->doctor_id;
        $data->patient_id = $request->patient_id;
        $data->date = $request->date;
        $data->save();
        $arr = $request->result;
        foreach ($arr as $key => $result) {
            $details = new DoctorRoundPathologyResultDetails();
            $details->result_id = $data->id;
            $details->name = $result['name'];
            $details->value = $result['value'];
            $details->setup_id = $result['id'];
            $details->save();
        }
        return response()->json(['status' => 200, 'message' => 'Data Added Successfully', 'data' => $data]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DoctorRoundPathologyResult  $doctorRoundPathologyResult
     * @return \Illuminate\Http\Response
     */
    public function show(DoctorRoundPathologyResult $doctorRoundPathologyResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DoctorRoundPathologyResult  $doctorRoundPathologyResult
     * @return \Illuminate\Http\Response
     */
    public function edit(DoctorRoundPathologyResult $doctorRoundPathologyResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DoctorRoundPathologyResult  $doctorRoundPathologyResult
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DoctorRoundPathologyResult $doctorRoundPathologyResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DoctorRoundPathologyResult  $doctorRoundPathologyResult
     * @return \Illuminate\Http\Response
     */
    public function destroy(DoctorRoundPathologyResult $doctorRoundPathologyResult)
    {
        //
    }

    public function PathologyResultShow($patient_id)
    {
 
        $results = DoctorRoundPathologyResult::with(['doctor', 'details'])->where('patient_id', $patient_id)->get();
        $parameters = RadiologyResultParameter::with(['details'])->orderBy('id', 'asc')->get();
        $resultIds = [];
        foreach ($results as $result) {
            // Access the result_id from details if details relationship is available
            if ($result->details) {
                // Assuming details is a collection, iterate through it
                foreach ($result->details as $detail) {
                    $resultIds[] = $detail->result_id;
                    // Process $resultId as needed
                    // Example: echo $resultId;
                }
            }
        }
        $parameters = RadiologyResultParameter::with(['details' => function ($query) use ($resultIds) {
            $query->whereIn('result_id', $resultIds)
                  ->orderBy('created_at', 'desc');  // Order by `created_at` descending to show last input first
        }])->orderBy('id', 'asc')->get();
        
       
        return response()->json([
            'message' => 'Pathology report retrieved successfully',
            'status' => 200,
            'data' => [
                'results' => $results,
                'parameters' =>$parameters,
            ]
        ]);

           
    }
}
