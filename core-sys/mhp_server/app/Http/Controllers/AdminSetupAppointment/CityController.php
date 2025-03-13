<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpCity;
use App\Models\MhpContactVia;
use App\Models\MhpOccupation;
use App\Models\MhpState;
use App\Models\MhpUsualAccount;
use App\Models\MhpUsualProvider;
use App\Models\MhpDoctorsDepartment;
use App\Models\DocSpecialist;
use App\Models\PtnBloodGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{
    //
    public function index()
    {
        $city = MhpCity::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'city' => $city,
        ]);
    }

    public function store(Request $request)
    {
//        dd('asdfsdf');
        $validator = Validator::make($request->all(), [
            'city_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $city = new MhpCity();
            $city->country_id = 1;
            $city->city_name = $request->input('city_name');
            $city->save();

            return response()->json([
                'status' => 200,
                'message' => 'City Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $city = MhpCity::find($id);
        if ($city) {
            return response()->json([
                'status' => 200,
                'city' => $city,
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
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'city_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $city = MhpCity::find($id);
            if ($city) {
                $city->country_id = 1;
                $city->city_name = $request->input('city_name');
                $city->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'City Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No City Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $city = MhpCity::find($id);
        if ($city)
        {
            if ($city['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $city->delete_status = $delete_status;
            $city->save();
            return response()->json([
                'status' => 200,
                'message' => 'City deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No City Found',
            ]);
        }
    }

    public function city_dropdown()
    {
        $city = MhpCity::where('delete_status',0)->orderBy('id','desc')->get();
        $contactvia = MhpContactVia::where('delete_status',0)->orderBy('id','desc')->get();
        $states = MhpState::where('delete_status',0)->orderBy('id','desc')->get();
        $usualprovider = MhpUsualProvider::where('delete_status',0)->orderBy('id','desc')->get();
        $usualaccount = MhpUsualAccount::where('delete_status',0)->orderBy('id','desc')->get();
        $occupation = MhpOccupation::where('delete_status',0)->orderBy('id','desc')->get();
        $department = MhpDoctorsDepartment::where('delete_status',0)->orderBy('id','desc')->get();
        $specialist = DocSpecialist::where('delete_status',0)->orderBy('id','desc')->get();
        $blood_group = PtnBloodGroup::where('delete_status',0)->orderBy('id','desc')->get();

        return response()->json([
            'status' => 200,
            'city' => $city,
            'contactvia' => $contactvia,
            'states' => $states,
            'usualprovider' => $usualprovider,
            'usualaccount' => $usualaccount,
            'occupation' => $occupation,
            'department' => $department,
            'specialist' => $specialist,
            'blood_group' => $blood_group,
        ]);
    }
}
