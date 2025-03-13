<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpFrequencyName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FrequencyNameController extends Controller
{
    public function index()
    {

        $frequencyName = MhpFrequencyName::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'frequencyName' => $frequencyName,
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'frequency_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $frequencyName = new MhpFrequencyName();
            $frequencyName->frequency_name = $request->input('frequency_name');
            $frequencyName->save();

            return response()->json([
                'status' => 200,
                'message' => 'Frequency Name Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $frequencyName = MhpFrequencyName::find($id);
        if ($frequencyName) {
            return response()->json([
                'status' => 200,
                'frequencyName' => $frequencyName,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Frequency Name Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'frequency_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $frequencyName = MhpFrequencyName::find($id);
            if ($frequencyName) {
                $frequencyName->frequency_name = $request->input('frequency_name');
                $frequencyName->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Frequency Name Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Frequency Name Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $drugs = MhpFrequencyName::find($id);
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
                'message' => 'Frequency Name deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Frequency Name Found',
            ]);
        }

    }

}
