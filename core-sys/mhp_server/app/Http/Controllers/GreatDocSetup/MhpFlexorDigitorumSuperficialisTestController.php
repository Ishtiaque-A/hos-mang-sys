<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFlexorDigitorumSuperficialisTest;
use Illuminate\Support\Facades\Validator;

class MhpFlexorDigitorumSuperficialisTestController extends Controller
{
    //
    public function index()
    {
        $flexorDigitorumSuperficialisTest = MhpFlexorDigitorumSuperficialisTest::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'flexorDigitorumSuperficialisTest' => $flexorDigitorumSuperficialisTest]
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
            $flexorDigitorumSuperficialisTest = new MhpFlexorDigitorumSuperficialisTest();
            $flexorDigitorumSuperficialisTest->name = $request->name;
            $flexorDigitorumSuperficialisTest->save();
            return response()->json([
                "status" => 200,
                "message" => "Flexor Digitorum Superficialis Test added successfully"
            ]);
        }
    }


    public function edit($id)
    {
        $flexorDigitorumSuperficialisTest = MhpFlexorDigitorumSuperficialisTest::find($id);
        return response()->json(['status' => 200, 'flexorDigitorumSuperficialisTest' => $flexorDigitorumSuperficialisTest]);
    }


    public function update(Request $request, $id)
    {

        // $validator = Validator::make(
        //     $request->all(),
        //     [
        //         'name' => 'required|max:100',


        //     ],
        //     // ['status_id.required'=>'Status field is required']
        // );

        // if ($validator->fails()) {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $validator->messages(),
        //     ]);
        // } else {

        //     $update_flexorDigitorumSuperficialisTest = MhpFlexorDigitorumSuperficialisTest::find($id);
        //     $update_flexorDigitorumSuperficialisTest->name = $request->name;
        //     $update_flexorDigitorumSuperficialisTest->update();

        //     return response()->json(['status' => 200, 'message' => 'Flexor Digitorum Superficialis Test Updated Successfully']);
        // }
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $update_flexorDigitorumSuperficialisTest =MhpFlexorDigitorumSuperficialisTest::find($id);
            $update_flexorDigitorumSuperficialisTest->name = $request->name;
            $update_flexorDigitorumSuperficialisTest->save();
            return response()->json([
                "status" => 200,
                "message" => "Flexor Digitorum Superficialis Test updated successfully"
            ]);
        }
    }

    public function destroy($id)
    {
        $del_flexorDigitorumSuperficialisTest = MhpFlexorDigitorumSuperficialisTest::find($id);
        $del_flexorDigitorumSuperficialisTest->delete_status = 1;
        $del_flexorDigitorumSuperficialisTest->save();
        return response()->json([
            'status' => 200,
            'message' => 'Flexor Digitorum Superficialis Test deleted successfully',
        ]);
    }
}
