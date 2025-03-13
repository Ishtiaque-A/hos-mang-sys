<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\DocTimeSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class TimeSlotsController extends Controller
{
    //
    public function index()
    {
        $time_slots = DocTimeSlot::with('doctorInfo')->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'time_slots' => $time_slots,
        ]);
    }

    public function store(Request $request)
    {


  $column1 = $request->input('startTime');
    $column2 = $request->input('endTime');
    $column3 = $request->input('doctor_id');

    $whereData = [
        ['startTime', $column1],
        ['endTime', $column2],
        ['doctor_id', $column3],
    ];


    $count = DB::table('doc_time_slots')->where($whereData)
                                ->count();
 
    if($count > 0){

        return response()->json([
                'status' => 400,
                'errors' => 'the three field is not unique',
            ]);
    }else{
    

            $time_slots = new DocTimeSlot();
            $time_slots->startTime = $request->startTime;
            $time_slots->endTime = $request->endTime;
            $time_slots->doctor_id = $request->doctor_id;
            $time_slots->save();

            return response()->json([
                'status' => 200,
                'message' => 'Time Slots Added Successfully',
            ]);

        

    }
}
    public function edit($id)
    {
        $time_slots = DocTimeSlot::find($id);

        if ($time_slots)
        {
            return response()->json([
                'status' => 200,
                'time_slots' => $time_slots,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            // 'time_slots_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $time_slots = DocTimeSlot::find($id);
          $time_slots->startTime = $request->startTime;
            $time_slots->endTime = $request->endTime;    
        $time_slots->doctor_id = $request->doctor_id;
     
               $time_slots->update();

            return response()->json([
                'status' => 200,
                'message' => 'Time Slots Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $time_slots = DocTimeSlot::find($id);
        if ($time_slots)
        {
            $time_slots->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Time Slots deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Time Slots Found',
            ]);
        }
    }

    public function getDoctorTime($id,$date){


        $times=DocTimeSlot::where('doctor_id',$id)->where('delete_status',0)->where('startTime','LIKE', '%'.$date.'%')->get();


       // foreach($times as $value) {
       //      echo "startTime: $value->startTime <br>";
       //      echo "endTime: $value->endTime <br>";

       //  // var_dump($moment->endTime).format('LT');
       //      // substr()
       //  }


    return response()->json(

      ['status'=>200,'availableTimes'=>$times]
    );

    }


}
