<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpUsualLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class LocationController extends Controller
{
    //

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usual_location_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{
            $locations = new MhpUsualLocation();
            $locations->usual_location_name = $request->input('usual_location_name');
            $locations->save();

            return response()->json([
                'status' => 200,
                'message' => 'Location Inserted Successfully',
            ]);
        }
    }

    public function index()
    {
        $locations = MhpUsualLocation::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'locations' => $locations,
        ]);
    }

    public function edit($id)
    {
        $location = MhpUsualLocation::find($id);
        if ($location) {
            return response()->json([
                'status' => 200,
                'location' => $location,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Location Id Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'usual_location_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{

            $location = MhpUsualLocation::find($id);
            if ($location) {
                $location->usual_location_name = $request->input('usual_location_name');
                $location->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Location Updated successfully',
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Location Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $location = MhpUsualLocation::find($id);
        if ($location)
        {
            if ($location['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $location->delete_status = $delete_status;
            $location->save();
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

}
