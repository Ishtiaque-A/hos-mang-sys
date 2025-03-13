<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpTimeSetup;
use App\Models\MhpUsualProvider;
use Illuminate\Http\Request;

class DocTimeSlotsController extends Controller
{
    //
    public function timeslots_dropdown()
    {
        $serviceprovider = MhpUsualProvider::where('delete_status',0)->orderBy('id','desc')->get();
        $doctors = MhpDoctorsMaster::where('delete_status',0)->orderBy('id','desc')->get();
        $time_per_patients = MhpTimeSetup::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'serviceprovider' => $serviceprovider,
            'doctors' => $doctors,
            'time_per_patients' => $time_per_patients,
        ]);
    }

}
