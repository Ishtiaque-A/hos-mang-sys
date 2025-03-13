<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpContactVia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactViaController extends Controller
{
    //
    public function index()
    {
        $contact_via = MhpContactVia::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'contact_via' => $contact_via,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contact_via_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $contact_via = new MhpContactVia();
            $contact_via->contact_via_name = $request->input('contact_via_name');
            $contact_via->save();

            return response()->json([
                'status' => 200,
                'message' => 'Contact Via Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $contact_via = MhpContactVia::find($id);
        if ($contact_via) {
            return response()->json([
                'status' => 200,
                'contact_via' => $contact_via,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Contact Via Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'contact_via_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $contact_via = MhpContactVia::find($id);
            if ($contact_via) {
                $contact_via->contact_via_name = $request->input('contact_via_name');
                $contact_via->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Contact Via Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Contact Via Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $contact_via = MhpContactVia::find($id);
        if ($contact_via)
        {
            if ($contact_via['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $contact_via->delete_status = $delete_status;
            $contact_via->save();
            return response()->json([
                'status' => 200,
                'message' => 'Contact Via deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Gender Found',
            ]);
        }
    }

    public function contact_via_dropdown()
    {
        $contact_via = MhpContactVia::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'contact_via' => $contact_via,
        ]);
    }

}
