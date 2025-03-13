<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DocSpecialist;
use App\Models\MhpDoctorsDepartment;
use Illuminate\Support\Facades\Validator;

class SpecialistController extends Controller
{
    //

    public function index()
    {
        $specialist = DocSpecialist::with('department')->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'specialist' => $specialist,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'department_id' => 'required',
            'specialists_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $country = new DocSpecialist();
            $country->department_id = $request->department_id;
            $country->specialists_name = $request->specialists_name;
            $country->save();

            return response()->json([
                'status' => 200,
                'message' => 'Specialist Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $specialist = DocSpecialist::find($id);
        if ($specialist) {
            return response()->json([
                'status' => 200,
                'specialist' => $specialist,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Specialist Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'department_id' => 'required',
            'specialists_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $country = DocSpecialist::find($id);
            $country->department_id = $request->department_id;
            $country->specialists_name = $request->specialists_name;
            $country->update();

            return response()->json([
                'status' => 200,
                'message' => 'Specialist Updated Successfully',
            ]);

        }

    }

    public function destroy($id)
    {
        $drugs = DocSpecialist::find($id);
        if ($drugs)
        {
            if ($drugs['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $drugs->delete_status = $delete_status;
            $drugs->save();
            return response()->json([
                'status' => 200,
                'message' => 'Specialist deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Specialist Found',
            ]);
        }
    }

    public function department_dropdown()
    {
        $department = MhpDoctorsDepartment::where('delete_status',0)->get();
        return response()->json([
            'status' => 200,
            'department' => $department,
        ]);
    }

}
