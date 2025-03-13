<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVitalSignUnit;
use Illuminate\Support\Facades\Validator;
class VitalSignUnit extends Controller
{
     public function index()
    {
        $vitalunit = MhpVitalSignUnit::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'vitalunit' => $vitalunit,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'vitalunit_name' => 'required|max:100',

        ]);

        if ($validator->fails()) {
            return response()->json([
                 'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $vitalunit = new MhpVitalSignUnit();
            $vitalunit->vitalunit_name = $request->input('vitalunit_name');
            $vitalunit->save();

            return response()->json([
                'status' => 200,
                'message' => 'Vital Unit Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $vitalunit = MhpVitalSignUnit::find($id);
        if ($vitalunit) {
            return response()->json([
                'status' => 200,
                'vitalunit' => $vitalunit,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Vital Unit Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'vitalunit_name' => 'required|max:191',
   
        ]);

        if ($validator->fails()) {
            return response()->json([
                 'status' => 400,
                'errors' => $validator->messages(),       

                 ]);
        } else {
            $vitalunit = MhpVitalSignUnit::find($id);
            if ($vitalunit) {
                $vitalunit->vitalunit_name = $request->input('vitalunit_name');


                $vitalunit->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Vital Unit Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Vital Unit Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {

        $vitalunit = MhpVitalSignUnit::find($id);
        if ($vitalunit)
        {
            if ($vitalunit['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $vitalunit->delete_status= $delete_status;
            $vitalunit->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Vital Unit deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Vital Unit Found',
            ]);
        }
    }

  
}
