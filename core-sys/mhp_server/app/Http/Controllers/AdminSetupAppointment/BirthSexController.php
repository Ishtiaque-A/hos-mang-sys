<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpBirthSex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BirthSexController extends Controller
{
    //
    public function index()
    {
        $birth_sex = MhpBirthSex::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'birth_sex' => $birth_sex,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'birth_sex_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $birth_sex = new MhpBirthSex();
            $birth_sex->birth_sex_name = $request->input('birth_sex_name');
            $birth_sex->save();

            return response()->json([
                'status' => 200,
                'message' => 'Gender Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $birth_sex = MhpBirthSex::find($id);
        if ($birth_sex) {
            return response()->json([
                'status' => 200,
                'birth_sex' => $birth_sex,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Gender Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'birth_sex_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $birth_sex = MhpBirthSex::find($id);
            if ($birth_sex) {
                $birth_sex->birth_sex_name = $request->input('birth_sex_name');
                $birth_sex->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Gender Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Gender Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $birth_sex = MhpBirthSex::find($id);
        if ($birth_sex)
        {
            if ($birth_sex['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $birth_sex->delete_status = $delete_status;
            $birth_sex->save();
            return response()->json([
                'status' => 200,
                'message' => 'Gender deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Gender Found',
            ]);
        }
    }

    public function gender_dropdown()
    {
        $gender = MhpBirthSex::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'gender' => $gender,
        ]);
    }

}
