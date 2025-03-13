<?php

namespace App\Http\Controllers;

use App\Models\LabShift;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LabShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = LabShift::where('status', 1)->orderBy('id', 'desc')->get();
        return response()->json($data);
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
    // public function store(Request $request)
    // {
    //     $data = new LabShift();
    //     $data->name = $request->name;
    //     $data->status = 1;
    //     $data->start_time = $request->start_time;
    //     $data->end_time = $request->end_time;
    //     $data->total_time = $request->total_time;
    //     $data->save();
    //     return response()->json($data);
    // }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:lab_shifts,name',
            'start_time' => 'required', // Make sure start_time is in 'HH:mm:ss' format
            'end_time' => 'required',
            'total_time' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
                'status' => 422
            ], 422);
        }

        $startTime = Carbon::parse($request->start_time);
        $endTime = Carbon::parse($request->end_time);

        // Check for overlapping shifts
        $overlap = LabShift::where('status', 1)
            ->where(function ($query) use ($startTime, $endTime) {
                $query->where(function ($q) use ($startTime, $endTime) {
                    // Case where new shift's start time falls within an existing shift
                    $q->where('start_time', '<=', $startTime->format('H:i:s'))
                        ->where('end_time', '>=', $startTime->format('H:i:s'));
                })->orWhere(function ($q) use ($startTime, $endTime) {
                    // Case where new shift's end time falls within an existing shift
                    $q->where('start_time', '<=', $endTime->format('H:i:s'))
                        ->where('end_time', '>=', $endTime->format('H:i:s'));
                })->orWhere(function ($q) use ($startTime, $endTime) {
                    // Case where the new shift completely overlaps an existing shift
                    $q->where('start_time', '>=', $startTime->format('H:i:s'))
                        ->where('end_time', '<=', $endTime->format('H:i:s'));
                });
            })
            ->exists();

        if ($overlap) {
            return response()->json(['error' => 'The shift times overlap with an existing shift.'], 422);
        }

        // Save the new shift if there’s no overlap
        $data = new LabShift();
        $data->name = $request->name;
        $data->status = 1;
        $data->start_time = $request->start_time;
        $data->end_time = $request->end_time;
        $data->total_time = $request->total_time;
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Shift created successfully.',
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LabShift  $labShift
     * @return \Illuminate\Http\Response
     */
    public function show(LabShift $labShift)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LabShift  $labShift
     * @return \Illuminate\Http\Response
     */
    public function edit(LabShift $labShift)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LabShift  $labShift
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:lab_shifts,name,' . $id,
            'start_time' => 'required', // Make sure start_time is in 'HH:mm:ss' format
            'end_time' => 'required',
            'total_time' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
                'status' => 422
            ], 422);
        }
        $data = LabShift::find($id);
        $data->name = $request->name;
        $data->status = $request->status ? $request->status : 1;
        $data->start_time = $request->start_time;
        $data->end_time = $request->end_time;
        $data->total_time = $request->total_time;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Shift updated successfully.',
            'data' => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LabShift  $labShift
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = LabShift::find($id);
        $data->status = 0;
        $data->save();
        return response()->json($data);
    }
    public function current()
    {

        $currentTime = Carbon::now()->format('H:i:s');

        // Retrieve all shifts with active status
        $shifts = DB::table('lab_shifts')
            ->where('status', 1) // Assuming 1 means active
            ->get();

        foreach ($shifts as $shift) {
            $startTime = Carbon::parse($shift->start_time);
            $endTime = Carbon::parse($shift->end_time);

            // Check if the shift spans midnight
            if ($endTime->lessThan($startTime)) {
                // If it spans midnight, check if current time is after start or before end
                if ($currentTime >= $startTime->format('H:i:s') || $currentTime <= $endTime->format('H:i:s')) {
                    return $shift;
                }
            } else {
                // Regular shift (does not span midnight)
                if ($currentTime >= $startTime->format('H:i:s') && $currentTime <= $endTime->format('H:i:s')) {
                    return $shift;
                }
            }
        }
        return null;
    }
}
