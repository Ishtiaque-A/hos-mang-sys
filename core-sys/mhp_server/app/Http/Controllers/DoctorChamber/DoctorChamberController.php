<?php

namespace App\Http\Controllers\DoctorChamber;

use App\Http\Controllers\Controller;
use App\Models\MhpAppointmentScheduler;
use Illuminate\Http\Request;
use App\Models\MhpDoctorChamber;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpUsualProvider;
use DateInterval;
use DateTime;
use DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class DoctorChamberController extends Controller
{

    private function timeSlotsArray($morningSlots, $date)
    {

        $fromTime = new DateTime($morningSlots['slot_from']);
        $toTime = new DateTime($morningSlots['slot_to']);
        $resultArray = [];

        while ($fromTime <= $toTime) {
            $resultArray[] = ['slots' => $fromTime->format('g:i a')];
            $fromTime->add(new DateInterval('PT10M'));
        }
        $finalResult = [];
        $scheduleData = MhpAppointmentScheduler::where('StartTime', 'like', "%$date%")->select('StartTime')->get();
        foreach ($resultArray as $itemA) {
            $status = 'available';
            foreach ($scheduleData as $itemB) {

                $itemBTime = new DateTime($itemB['StartTime']);

                if ($itemBTime->format('g:i a') == $itemA['slots']) {
                    $status = 'booked';
                    break;
                }
            }

            $finalResult[] = [
                'slots' => $itemA['slots'],
                'status' => $status,
            ];
        }

        return $finalResult;
    }
    public function doctor_time_solt($id, $date, $type)
    {

        $formatDate = Carbon::parse($date)->format('d/m/Y');
        $morningSlots = MhpDoctorChamber::where('doctor_id', $id)
            ->where('status', 'on_duty')
            ->where('type', 'morning')
            ->where('appointment_type', $type)
            ->where('day', $formatDate)->first();

        if ($morningSlots) {
            $mData = $this->timeSlotsArray($morningSlots, $date);
        } else {
            $mData = [];
        }

        $eveningSlots = MhpDoctorChamber::where('doctor_id', $id)
            ->where('status', 'on_duty')
            ->where('type', 'evening')
            ->where('appointment_type', $type)
            ->where('day', $formatDate)->first();

        if ($eveningSlots) {
            $eData = $this->timeSlotsArray($eveningSlots, $date);
        } else {
            $eData = [];
        }

        return response()->json([
            'date' => $formatDate,
            'mData' => $mData,
            'eData' => $eData,
        ], 200);
    }

    public function doc_time_slots_for_app($id, $branchId = 'null', $date = null)
    {
        $currentDate = Carbon::today()->format('d/m/Y');
        $sevenDaysAgo = Carbon::now()->addDays(7);
        if ($date) {

            $new_date = Carbon::parse($date);
            $data = MhpDoctorChamber::where('doctor_id', $id)
                ->where('status', 'on_duty')
                ->where('day', $new_date->format('d/m/Y'))
                ->where('delete_status', 0);

            if ($branchId !== 'null') {
                $data->where('saas_branch_id', $branchId);
            }
            $results = $data->get();

            return response()->json([
                'data' => $results
            ], 201);
        } else {

            // If $date parameter is not provided, get data for the next 7 days
            $data = MhpDoctorChamber::where('doctor_id', $id)
                ->where('status', 'on_duty')
                ->whereRaw("STR_TO_DATE(CONCAT(day, '/', month, '/', year), '%d/%m/%Y') >= STR_TO_DATE('{$currentDate}', '%d/%m/%Y')")
                ->where('delete_status', 0);

            if ($branchId !== 'null') {
                $data->where('saas_branch_id', $branchId);
            }
            $results = $data->get();



            return response()->json([
                'data' => $results
            ], 201);
        }
    }
    public function index($id)
    {
        $docTimelSlots = DB::table('mhp_doctor_chambers')
            ->where('mhp_doctor_chambers.doctor_id', $id)
            ->where('mhp_doctor_chambers.delete_status', 0)
            ->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', 'mhp_doctor_chambers.doctor_id')
            ->leftJoin('mhp_usual_providers', 'mhp_doctor_chambers.chamber_id', 'mhp_usual_providers.id')
            ->select('mhp_doctor_chambers.*', 'mhp_doctors_masters.dr_given_name', 'mhp_usual_providers.usual_provider_name')->get();

        return response()->json([
            'status' => 200,
            'docTimeSlots' => $docTimelSlots
        ]);
    }

    public function AllData()
    {

        $docTimelSlots = DB::table('mhp_doctor_chambers')->where('mhp_doctor_chambers.delete_status', 0)->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', 'mhp_doctor_chambers.doctor_id')->leftJoin('mhp_usual_providers', 'mhp_doctor_chambers.chamber_id', 'mhp_usual_providers.id')->select('mhp_doctor_chambers.*', 'mhp_doctors_masters.dr_given_name', 'mhp_usual_providers.usual_provider_name')->get();

        return response()->json([
            'status' => 200,
            'docTimeSlots' => $docTimelSlots
        ]);
    }

    public function store(Request $request)
    {

        $docTimelSlots = new MhpDoctorChamber();
        $docTimelSlots->doctor_id = $request->doctor_id;
        $docTimelSlots->chamber_id = $request->chamber_id;
        $docTimelSlots->month = $request->month;
        $docTimelSlots->all_month = $request->all_month;
        $docTimelSlots->day = $request->day;
        $docTimelSlots->year = $request->year;
        $docTimelSlots->slot_from = $request->slot_from;
        $docTimelSlots->slot_to = $request->slot_to;
        $docTimelSlots->type = $request->type;
        $docTimelSlots->save();
        return response()->json(['status' => 200, 'message' => 'Doctor chamber Added Successfully']);
    }
    public function getDoctorName($doctorId)
    {
        $doctor_name = MhpDoctorsMaster::where('id', $doctorId)->where('delete_status', 0)->get();

        return response()->json([
            'status' => 200,
            'doctor_name' => $doctor_name,
        ]);
    }

    public function getChamberName($chamberId)
    {
        $chamber_name = MhpUsualProvider::where('id', $chamberId)->where('delete_status', 0)->get();

        return response()->json([
            'status' => 200,
            'chamber_name' => $chamber_name,
        ]);
    }

    public function doctorSearchById($id)
    {

        $doctor = MhpDoctorsMaster::where('id', $id)->where('delete_status', 0)->first();

        return response()->json([
            'status' => 200,
            'doctor' => $doctor,
        ]);
    }

    public function allTimeSlots(Request $request, $id)
    {
        if ($request->userType == 'Employee' || $request->userType == 'Super_Admin') {
            $headers = $request->header();
            $branchData = getBranchData($headers);
            $doctors = MhpDoctorsMaster::where('saas_branch_id', $branchData['branch_id'])->pluck('id')->toArray();

            $docTimelSlots = MhpDoctorChamber::with('doctor', 'usual_provider')
                ->when($request->userType == 'Employee', function ($query) use ($doctors) {
                    return $query->whereIn('doctor_id', $doctors);
                })
                ->get();

            return response()->json([
                'status' => 200,
                'docTimeSlots' => $docTimelSlots
            ]);
        }


        $docTimelSlots = MhpDoctorChamber::with('doctor', 'usual_provider')
            ->where('doctor_id', $id)
            ->get();


        return response()->json([
            'status' => 200,
            'docTimeSlots' => $docTimelSlots
        ]);
    }

    public function edit($id)
    {
        $editTimeSlots = MhpDoctorChamber::find($id);


        return response()->json([
            'status' => 200,
            'editTimeSlots' => $editTimeSlots
        ]);
    }

    public function update(Request $request, $id)
    {

        $docTimelSlots = MhpDoctorChamber::find($id);
        $docTimelSlots->doctor_id = $request->doctor_id;
        $docTimelSlots->chamber_id = $request->chamber_id;
        $docTimelSlots->month = $request->month;
        $docTimelSlots->all_month = $request->all_month;
        $docTimelSlots->day = $request->day;
        $docTimelSlots->year = $request->year;
        $docTimelSlots->slot_from = $request->slot_from;
        $docTimelSlots->slot_to = $request->slot_to;
        $docTimelSlots->type = $request->type;
        $docTimelSlots->update();
        return response()->json(['status' => 200, 'message' => 'Doctor chamber Updated Successfully']);
    }

    public function destroy($id)
    {

        $del_slots = MhpDoctorChamber::find($id);
        if ($del_slots) {
            if ($del_slots['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $del_slots->delete_status = $delete_status;
            $del_slots->save();
            return response()->json([
                'status' => 200,
                'message' => 'Doctor chamber deleted Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No  Found',
            ]);
        }
    }




    public function doctorChamberValidationForm(Request $request)
    {


        $appointment_types = ['morning' => 0, 'evening' => 0];
        $morningData = MhpDoctorChamber::where('doctor_id', $request->doctor_id)
            ->where('year', $request->year)
            ->where('month', $request->month)
            ->where('type', 'morning')
            ->count();
        $eveningData = MhpDoctorChamber::where('doctor_id', $request->doctor_id)
            ->where('year', $request->year)
            ->where('month', $request->month)
            ->where('type', 'evening')
            ->count();

        $appointment_types['morning'] = $morningData;
        $appointment_types['evening'] = $eveningData;
        return response()->json($appointment_types, 200);
    }

    public function saveChamberData(Request $request)
    {

        $allData = $request->all();
        $header = $request->header();
        $branchData = getBranchData($header);
        foreach ($allData['data'] as $item) {
            $doctorChamber = new MhpDoctorChamber();
            $doctorChamber->chamber_id = $item['chamber_id'];
            $doctorChamber->doctor_id = $item['doctor_id'];
            $doctorChamber->year = $item['year'];
            $doctorChamber->month = $item['month'];
            $doctorChamber->status = $item['status'];
            $doctorChamber->day = $item['day'];
            $doctorChamber->slot_from = $item['slot_from'];
            $doctorChamber->slot_to = $item['slot_to'];
            $doctorChamber->type = $item['type'];
            if ($branchData['super_admin'] == false) {
                $doctorChamber->saas_branch_id = $branchData['branch_id'];
                $doctorChamber->saas_branch_name = $branchData['branch_name'];
            }
            $doctorChamber->appointment_type = $item['appointment_type'];
            $doctorChamber->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Doctor chamber Added Successfully',
            'allData' => $allData,
        ]);
    }

    public function updateData(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'slotFrom' => 'required',
            'slotTo' => 'required',
            'appointment_type' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(), 'status' => 401]);
        }

        $doctorChamber = MhpDoctorChamber::find($id);
        $doctorChamber->status = $request->status;
        $doctorChamber->slot_from = $request->slotFrom;
        $doctorChamber->slot_to = $request->slotTo;
        $doctorChamber->appointment_type = $request->appointment_type;
        $doctorChamber->save();
        return response()->json([
            'status' => 200,
            'message' => 'Doctor chamber Update Successfully',
            'allData' => $doctorChamber,
        ]);
    }

    public function getDdoctorSchedule($id)
    {
        $doctorChamber = MhpDoctorChamber::find($id);
        return response()->json([
            'status' => 200,
            'allData' => $doctorChamber,
        ]);
    }

    public function filteringDoctorChamber(Request $request, $date, $doctor)
    {
        $date =  date('d/m/Y', strtotime($date));
        if ($doctor == 'null' || $doctor == null) {
            $headers = $request->header();
            $branchData = getBranchData($headers);
            $doctors = MhpDoctorsMaster::where('saas_branch_id', $branchData['branch_id'])->pluck('id')->toArray();
            $data = MhpDoctorChamber::where('day', $date)
                ->when(!$branchData['super_admin'], function ($query) use ($branchData) {
                    return $query->where('saas_branch_id', $branchData['branch_id']);
                })
                ->with('doctor', 'usual_provider')
                ->get();
            return response()->json([
                'status' => 200,
                'allData' => $data,
                'doctor' => $branchData,
            ]);
        } else {
            $data = MhpDoctorChamber::where('day', $date)
                ->where('doctor_id', $doctor)
                ->with('doctor', 'usual_provider')
                ->get();
            return response()->json([
                'status' => 200,
                'allData' => $data,
            ]);
        }
    }
}
