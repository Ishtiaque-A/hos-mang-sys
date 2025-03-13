<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\MhpOccupationalHazards;

class OccupationalHazardsController extends Controller
{
    //

    public function index()
    {
        $occupational_hazards = MhpOccupationalHazards::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'occupational_hazards' => $occupational_hazards,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'occupational_hazards_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpOccupationalHazards();
            $data->occupational_hazards_name = $request->occupational_hazards_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Occupational Hazards Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $occupational_hazards = MhpOccupationalHazards::find($id);

        if ($occupational_hazards)
        {
            return response()->json([
                'status' => 200,
                'occupational_hazards' => $occupational_hazards,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Occupational Hazards Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpOccupationalHazards::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'occupational_hazards_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->occupational_hazards_name = $request->occupational_hazards_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Occupational Hazards Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Occupational Hazards Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $occupational_hazards = MhpOccupationalHazards::find($id);
        if ($occupational_hazards)
        {
            if ($occupational_hazards['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $occupational_hazards->delete_status = $delete_status;
            $occupational_hazards->save();
            return response()->json([
                'status' => 200,
                'message' => 'Occupational Hazards deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Occupational Hazards Found',
            ]);
        }

    }

    public function occupational_hazards_dropdown()
    {
        $occupational_hazards = MhpOccupationalHazards::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'occupational_hazards' => $occupational_hazards,
        ]);
    }


}
