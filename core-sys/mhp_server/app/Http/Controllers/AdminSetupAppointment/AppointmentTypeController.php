<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\MhpAppointmentType;

class AppointmentTypeController extends Controller
{
    //

    public function index()
    {
        $appointment_types = MhpAppointmentType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'appointment_types' => $appointment_types,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'appointment_types_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpAppointmentType();
            $data->appointment_types_name = $request->appointment_types_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Appointment Types Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $appointment_types = MhpAppointmentType::find($id);

        if ($appointment_types)
        {
            return response()->json([
                'status' => 200,
                'appointment_types' => $appointment_types,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Appointment Types Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpAppointmentType::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'appointment_types_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->appointment_types_name = $request->appointment_types_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Appointment Types Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Appointment Types Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $appointment_type = MhpAppointmentType::find($id);
        if ($appointment_type)
        {
            if ($appointment_type['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $appointment_type->delete_status = $delete_status;
            $appointment_type->save();
            return response()->json([
                'status' => 200,
                'message' => 'Appointment Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Appointment Type Found',
            ]);
        }
    }

}
