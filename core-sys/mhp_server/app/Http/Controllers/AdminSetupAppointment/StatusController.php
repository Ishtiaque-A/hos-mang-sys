<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    //
    public function index()
    {
        $status = MhpStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'statuses' => $status,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'status_name' => 'required|max:191',
            'color' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $status = new MhpStatus();
            $status->status_name = $request->status_name;
            $status->color = $request->color;
            $status->save();

            return response()->json([
                'status' => 200,
                'message' => 'Status Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $status = MhpStatus::find($id);
        if ($status) {
            return response()->json([
                'status' => 200,
                'statuses' => $status,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Ethnicity Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status_name' => 'required|max:191',
            'color' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $status = MhpStatus::find($id);
            $status->status_name = $request->status_name;
            $status->color = $request->color;
            $status->update();
            
            return response()->json([
                'status' => 200,
                'message' => 'Status Update Successfully',
            ]);
        }

    }

    public function destroy($id)
    {

        $status = MhpStatus::find($id);
        if ($status)
        {
            if ($status['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $status->delete_status = $delete_status;
            $status->save();
            return response()->json([
                'status' => 200,
                'message' => 'Status deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Gender Found',
            ]);
        }
    }

    public function pstatus_dropdown()
    {
        $pstatus = MhpStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'pstatus' => $pstatus,
        ]);
    }
}
