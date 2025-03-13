<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFlexorDigitorumProfundusTest;
use Validator;

class MhpFlexorDigitorumProfundusTestController extends Controller
{
    //
    public function index()
    {
        $flexorDigitorumProfundusTest = MhpFlexorDigitorumProfundusTest::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'flexorDigitorumProfundusTest' => $flexorDigitorumProfundusTest]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $flexorDigitorumProfundusTest = new MhpFlexorDigitorumProfundusTest();
            $flexorDigitorumProfundusTest->name = $request->name;
            $flexorDigitorumProfundusTest->save();
            return response()->json([
                "status" => 200,
                "message" => "Flexor Digitorum Profundus Test Added successfully"
            ]);
        }
    }


    public function edit($id)
    {
        $flexorDigitorumProfundusTest = MhpFlexorDigitorumProfundusTest::find($id);
        return response()->json(['status' => 200, 'flexorDigitorumProfundusTest' => $flexorDigitorumProfundusTest]);
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $update_flexorDigitorumProfundusTest =MhpFlexorDigitorumProfundusTest::find($id);
            $update_flexorDigitorumProfundusTest->name = $request->name;
            $update_flexorDigitorumProfundusTest->save();
            return response()->json([
                "status" => 200,
                "message" => "Flexor Digitorum Profundus Test updated successfully"
            ]);
        }
    }

    public function destroy($id)
    {
        $del_flexorDigitorumProfundusTest = MhpFlexorDigitorumProfundusTest::find($id);
        $del_flexorDigitorumProfundusTest->delete_status = 1;
        $del_flexorDigitorumProfundusTest->save();
        return response()->json([
            'status' => 200,
            'message' => 'Flexor Digitorum Profundus Test deleted successfully',
        ]);
    }
}
