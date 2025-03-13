<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpVisitType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisitTypeController extends Controller
{
    //
    public function visitstore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'visit_type_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{
            $visitors = new MhpVisitType();
            $visitors->visit_type_name = $request->input('visit_type_name');
            $visitors->save();

            return response()->json([
                'status' => 200,
                'message' => 'Visitors created successfully',
            ]);
        }
    }

    public function visitindex()
    {
        $visitors = MhpVisitType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'visitors' => $visitors,
        ]);
    }

    public function visitedit($id)
    {
        $visitors = MhpVisitType::find($id);
        if ($visitors) {
            return response()->json([
                'status' => 200,
                'visitors' => $visitors,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Visitor Id Found',
            ]);
        }

    }

    public function visiteupdate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'visit_type_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{
            $visitor = MhpVisitType::find($id);
            if ($visitor) {
                $visitor->visit_type_name = $request->input('visit_type_name');
                $visitor->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Visitor Updated successfully',
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Visitor Id Found',
                ]);
            }

        }
    }

    public function visitdestroy($id){

        $visit_type = MhpVisitType::find($id);
        if ($visit_type)
        {
            if ($visit_type['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $visit_type->delete_status = $delete_status;
            $visit_type->save();
            return response()->json([
                'status' => 200,
                'message' => 'Visit Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Visit Type Found',
            ]);
        }
    }

    public function visittype_dropdown()
    {
        $visittype = MhpVisitType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'visittype' => $visittype,
        ]);
    }

}
