<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpState;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StateController extends Controller
{
    //
    public function index()
    {
        $states = MhpState::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'states' => $states,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'state_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $states = new MhpState();
            $states->state_name = $request->input('state_name');
            $states->save();

            return response()->json([
                'status' => 200,
                'message' => 'State Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $states = MhpState::find($id);
        if ($states) {
            return response()->json([
                'status' => 200,
                'states' => $states,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No State Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'state_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $states = MhpState::find($id);
            if ($states) {
                $states->state_name = $request->input('state_name');
                $states->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'State Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No State Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $states = MhpState::find($id);
        if ($states)
        {
            if ($states['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $states->delete_status = $delete_status;
            $states->save();
            return response()->json([
                'status' => 200,
                'message' => 'State deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No State Found',
            ]);
        }
    }

    public function states_dropdown()
    {
        $states = MhpState::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'states' => $states,
        ]);
    }
}
