<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DoctorInboxTheResultIs;
use Illuminate\Support\Facades\Validator;

class theResultIsController extends Controller
{
    public function index()
    {
        $theResultIs = DoctorInboxTheResultIs::orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'theResultIs' => $theResultIs]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'the_result_is_name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $theResultIs = new DoctorInboxTheResultIs();
            $theResultIs->the_result_is_name = $request->the_result_is_name;
            $theResultIs->save();

            return response()->json(['status' => 200, 'message' => 'theResultIs Added Successfully']);
        }
    }


    public function edit($id)
    {
        $theResultIs = DoctorInboxTheResultIs::find($id);
        return response()->json(['status' => 200, 'theResultIs' => $theResultIs]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'the_result_is_name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $update_theResultIs = DoctorInboxTheResultIs::find($id);
            $update_theResultIs->the_result_is_name = $request->the_result_is_name;

            $update_theResultIs->update();

            return response()->json(['status' => 200, 'message' => 'theResultIs  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_theResultIs = DoctorInboxTheResultIs::find($id);

        if ($del_theResultIs) {

            $del_theResultIs->delete();
            return response()->json([
                'status' => 200,
                'message' => 'theResultIs  deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No theResultIs  Found',
            ]);
        }
    }
}
