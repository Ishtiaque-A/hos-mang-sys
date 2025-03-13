<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpOthersName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class OthersNameController extends Controller
{
    public function index()
    {

        $othersName = MhpOthersName::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'othersName' => $othersName,
        ]);

    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'others_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else {
            $othersName = new MhpOthersName();
            $othersName->others_name = $request->input('others_name');
            $othersName->save();

            return response()->json([
                'status' => 200,
                'message' => 'Others Name Added Successfully',
            ]);
        }

    }

    public function edit($id)
    {
        $othersName = MhpOthersName::find($id);
        if ($othersName){
            return response()->json([
                'status' => 200,
                'othersName' => $othersName,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Others Name Id Found',
            ]);
        }

    }



    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'others_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else {
            $othersName = MhpOthersName::find($id);
            if ($othersName) {
                $othersName->others_name = $request->input('others_name');
                $othersName->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Others Name Updated Successfully',
                ]);
            }else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Others Name Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $drugs = MhpOthersName::find($id);
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
                    'message' => 'Others Name deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                    'message' => 'No Others Name Found',
            ]);
        }
    }

}
