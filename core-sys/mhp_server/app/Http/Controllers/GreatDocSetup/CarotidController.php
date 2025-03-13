<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpCarotid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarotidController extends Controller
{
    //

    public function index()
    {
        $carotid = MhpCarotid::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'carotid' => $carotid,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'carotid_name' => 'required|max:100',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $carotid = new MhpCarotid();
            $carotid->selection_criteria= $request->selection_criteria;
            $carotid->carotid_name = $request->carotid_name;
            $carotid->save();

            return response()->json([
                'status' => 200,
                'message' => 'Carotid Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $carotid = MhpCarotid::find($id);

        if ($carotid)
        {
            return response()->json([
                'status' => 200,
                'carotid' => $carotid,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Carotid Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'carotid_name' => 'required|max:100',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $carotid = MhpCarotid::find($id);
            $carotid->selection_criteria = $request->selection_criteria;
            $carotid->carotid_name = $request->carotid_name;
            $carotid->update();

            return response()->json([
                'status' => 200,
                'message' => 'Carotid Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $carotid = MhpCarotid::find($id);
        if ($carotid)
        {
            if ($carotid['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $carotid->delete_status = $delete_status;
            $carotid->save();

            return response()->json([
                'status' => 200,
                'message' => 'Carotid deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Carotid Found',
            ]);
        }
    }

}
