<?php

namespace App\Http\Controllers\Appointments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAppointmentStatusColor;
use Validator;
class AppointmentStatusColorController extends Controller
{
       public function index()
    {
        $status_color = MhpAppointmentStatusColor::orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'status_color' => $status_color,
        ]);
    }

    public function store(Request $request){
          $validator = Validator::make($request->all(),[
            'status_name' => 'required|unique:mhp_appointment_status_colors',
            'color' => 'required|unique:mhp_appointment_status_colors',
            'sequence' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
             $status_color = new MhpAppointmentStatusColor();
            $status_color->color = $request->color;
            $status_color->sequence = $request->sequence;
            $status_color->status_name = $request->status_name;
            $status_color->save();

            return response()->json([
                'status' => 200,
                'message' => 'Appointment Status Color Added Successfully',
            ]);
    }
}

   public function edit($id)
    {
        $edit_data=MhpAppointmentStatusColor::find($id);
        return response()->json(['status'=>200,'edit_data'=>$edit_data]);
    }


      public function update(Request $request,$id){
        //   $validator = Validator::make($request->all(),[
        //     'status_name' => 'required|unique:mhp_appointment_status_colors',
        //     'color' => 'required|unique:mhp_appointment_status_colors',
        //     'sequence' => 'required|unique:mhp_appointment_status_colors',
        // ]);

        // if ($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $validator->messages(),
        //     ]);

        // }else{
             $update_status_color =MhpAppointmentStatusColor::find($id);
            $update_status_color->color = $request->color;
            $update_status_color->sequence = $request->sequence;
            $update_status_color->status_name = $request->status_name;
            $update_status_color->save();

            return response()->json([
                'status' => 200,
                'message' => 'Appointment Status Color Updated Successfully',
            ]);
    // }
}


}
