<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpDrugUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DrugUnitController extends Controller
{
    public function index()
    {

        $units = MhpDrugUnit::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'units' => $units,
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'drug_unit' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $units = new MhpDrugUnit();
            $units->drug_unit = $request->input('drug_unit');
            $units->save();

            return response()->json([
                'status' => 200,
                'message' => 'Drug Unit Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $units = MhpDrugUnit::find($id);
        if ($units) {
            return response()->json([
                'status' => 200,
                'units' => $units,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Drug Unit Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'drug_unit' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $units = MhpDrugUnit::find($id);
            if ($units) {
                $units->drug_unit = $request->input('drug_unit');
                $units->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Drug Unit Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Drug Unit Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {

        $drugs = MhpDrugUnit::find($id);
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
                'message' => 'Drug Unit deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Drug Unit Found',
            ]);
        }

    }

}
