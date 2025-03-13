<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpProcedure;

use Illuminate\Support\Facades\Validator;

class ProcedureNameController extends Controller
{
    public function index()
    {

        $procedureName = MhpProcedure::with('accounts','accounts_type','accounts_group')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'procedureName' => $procedureName,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'procedure_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $procedureName = new MhpProcedure();
            $procedureName->procedure_name = $request->input('procedure_name');
            $procedureName->accounts_id = $request->input('accounts_id');
            $procedureName->accounts_type_id = $request->input('accounts_type_id');
            $procedureName->accounts_group_id = $request->input('accounts_group_id');
            $procedureName->save();

            return response()->json([
                'status' => 200,
                'message' => 'Procedure Name Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $procedureName = MhpProcedure::find($id);
        if ($procedureName) {
            return response()->json([
                'status' => 200,
                'procedureName' => $procedureName,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Procedure Name Id Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'procedure_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $procedureName = MhpProcedure::find($id);
            if ($procedureName) {
                $procedureName->procedure_name = $request->input('procedure_name');
                $procedureName->accounts_id = $request->input('accounts_id');
                $procedureName->accounts_type_id = $request->input('accounts_type_id');
                $procedureName->accounts_group_id = $request->input('accounts_group_id');
                $procedureName->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Procedure Name Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Procedure Name Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $drugs = MhpProcedure::find($id);
        if ($drugs) {
            if ($drugs['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $drugs->delete_status = $delete_status;
            $drugs->save();
            return response()->json([
                'status' => 200,
                'message' => 'Procedure Name deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Procedure Name Found',
            ]);
        }
    }
}
