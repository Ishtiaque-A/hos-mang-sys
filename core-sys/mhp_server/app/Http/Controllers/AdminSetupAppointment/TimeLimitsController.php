<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\DocTimeLimit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimeLimitsController extends Controller
{
    //

    public function index()
    {
        $time_limits = DocTimeLimit::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'time_limits' => $time_limits,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'time_limits_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $time_limits = new DocTimeLimit();
            $time_limits->time_limits_name = $request->time_limits_name;
            $time_limits->save();

            return response()->json([
                'status' => 200,
                'message' => 'Time Limits Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $time_limits = DocTimeLimit::find($id);

        if ($time_limits)
        {
            return response()->json([
                'status' => 200,
                'time_limits' => $time_limits,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Time Limits Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'time_limits_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $time_limits = DocTimeLimit::find($id);
            $time_limits->time_limits_name = $request->time_limits_name;
            $time_limits->update();

            return response()->json([
                'status' => 200,
                'message' => 'Time Limits Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $time_limits = DocTimeLimit::find($id);
        if ($time_limits)
        {
            if ($time_limits['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $time_limits->delete_status = $delete_status;
            $time_limits->save();
            return response()->json([
                'status' => 200,
                'message' => 'Time Limits deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Time Limits Found',
            ]);
        }
    }

}
