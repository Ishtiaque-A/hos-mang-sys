<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpTimeSetup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimeSetupController extends Controller
{
    //

    public function index()
    {
        $timesetup = MhpTimeSetup::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'timesetup' => $timesetup,
        ]);
    }

    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'time_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $timesetup = new MhpTimeSetup();
            $timesetup->time_name = $request->input('time_name');
            $timesetup->save();

            return response()->json([
                'status' => 200,
                'message' => 'Time Setup Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $timesetup = MhpTimeSetup::find($id);
        if ($timesetup) {
            return response()->json([
                'status' => 200,
                'timesetup' => $timesetup,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No City Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'time_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $timesetup = MhpTimeSetup::find($id);
            if ($timesetup) {
                $timesetup->time_name = $request->input('time_name');
                $timesetup->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Time Setup Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Time Setup Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $timesetup = MhpTimeSetup::find($id);
        if ($timesetup)
        {
            if ($timesetup['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $timesetup->delete_status = $delete_status;
            $timesetup->save();
            return response()->json([
                'status' => 200,
                'message' => 'Time Setup deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Time Setup Found',
            ]);
        }

    }

    public function timesetup_dropdown()
    {
        $timesetup = MhpTimeSetup::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'timesetup' => $timesetup,
        ]);
    }

}
