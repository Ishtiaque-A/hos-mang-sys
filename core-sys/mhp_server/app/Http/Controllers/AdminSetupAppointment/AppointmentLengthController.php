<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\MhpAppointmentLength;

class AppointmentLengthController extends Controller
{
    public function index()
    {
        $appointment_lengths = MhpAppointmentLength::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'appointment_lengths' => $appointment_lengths,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'appointment_lengths_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpAppointmentLength();
            $data->appointment_lengths_name = $request->appointment_lengths_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Appointment Length Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $appointment_lengths = MhpAppointmentLength::find($id);

        if ($appointment_lengths)
        {
            return response()->json([
                'status' => 200,
                'appointment_lengths' => $appointment_lengths,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Appointment Length Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpAppointmentLength::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'appointment_lengths_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->appointment_lengths_name = $request->appointment_lengths_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Appointment Length Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Appointment Length Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $appointment_lengths = MhpAppointmentLength::find($id);
        if ($appointment_lengths)
        {
            if ($appointment_lengths['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $appointment_lengths->delete_status = $delete_status;
            $appointment_lengths->save();
            return response()->json([
                'status' => 200,
                'message' => 'Appointment Length deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Appointment Length Found',
            ]);
        }
    }
}
