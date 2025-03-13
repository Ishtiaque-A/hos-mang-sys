<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpReligion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ReligionController extends Controller
{
    //
    public function index()
    {
        $religions = MhpReligion::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'religions' => $religions
         ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'religion_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpReligion();
            $data->religion_name = $request->religion_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Religion Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $religion = MhpReligion::find($id);

        if ($religion)
        {
            return response()->json([
                'status' => 200,
                'religion' => $religion,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Religion Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpReligion::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'religion_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->religion_name = $request->religion_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Religion Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Religion Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $religion = MhpReligion::find($id);
        if ($religion)
        {
            if ($religion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $religion->delete_status = $delete_status;
            $religion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Religion deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Religion Found',
            ]);
        }
    }

    public function religion_dropdown()
    {
        $religion = MhpReligion::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'religion' => $religion,
        ]);
    }
}
