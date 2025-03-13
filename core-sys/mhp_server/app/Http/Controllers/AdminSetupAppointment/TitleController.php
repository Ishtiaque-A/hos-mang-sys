<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TitleController extends Controller
{
    //
    public function index()
    {
        $title = MhpTitle::where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'title' => $title,
        ]);
    }

    public function store(Request $request)
    {
        //        dd('asdfsdf');
        $validator = Validator::make($request->all(), [
            'title_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $title = new MhpTitle();
            $title->title_name = $request->input('title_name');
            $title->save();

            return response()->json([
                'status' => 200,
                'message' => 'Title Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $title = MhpTitle::find($id);
        if ($title) {
            return response()->json([
                'status' => 200,
                'title' => $title,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Title Id Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        //        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'title_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $title = MhpTitle::find($id);
            if ($title) {
                $title->title_name = $request->input('title_name');
                $title->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Title Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Title Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $title = MhpTitle::find($id);
        if ($title) {
            if ($title['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $title->delete_status = $delete_status;
            $title->save();
            return response()->json([
                'status' => 200,
                'message' => 'Status deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Gender Found',
            ]);
        }
    }

    public function title_dropdown()
    {
        $title = MhpTitle::where('delete_status', 0)->orderBy('id', 'desc')->get();
        $doctor = MhpDoctorsMaster::latest()->first();
        if ($doctor) {
            $generate = $doctor->id + 1001;
        } else {
            $generate = 1001;
        }

        $doctor_DIN = "DC-{$generate}";

        return response()->json([
            'status' => 200,
            'title' => $title,
            'DIN' => $doctor_DIN,
        ]);
    }
}
