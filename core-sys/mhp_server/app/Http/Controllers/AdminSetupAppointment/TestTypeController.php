<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpTestType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TestTypeController extends Controller
{
    //

    public function teststore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'test_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{
            $tests = new MhpTestType();
            $tests->test_name = $request->input('test_name');
            $tests->save();

            return response()->json([
                'status' => 200,
                'message' => 'Test Created Successfully',
            ]);
        }
    }

    public function testindex()
    {
        $tests = MhpTestType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'tests' => $tests,
        ]);
    }

    public function testedit($id)
    {
        $testor = MhpTestType::find($id);
        if ($testor) {
            return response()->json([
                'status' => 200,
                'testor' => $testor,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Test Id Found',
            ]);
        }

    }

    public function testupdate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'test_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else{

            $testor = MhpTestType::find($id);
            if ($testor) {
                $testor->test_name = $request->input('test_name');
                $testor->created_by = $request->input('created_by');
                $testor->updated_by = $request->input('updated_by');
                $testor->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Test Updated successfully',
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Test Id Found',
                ]);
            }
        }
    }

    public function testdestroy($id){

        $testor = MhpTestType::find($id);
        if ($testor)
        {
            if ($testor['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $testor->delete_status = $delete_status;
            $testor->save();
            return response()->json([
                'status' => 200,
                'message' => 'Test Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Test Type Length Found',
            ]);
        }
    }

}
