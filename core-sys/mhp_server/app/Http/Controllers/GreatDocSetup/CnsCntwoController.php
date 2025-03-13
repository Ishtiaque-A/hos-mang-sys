<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnTwo;
use Illuminate\Support\Facades\Validator;

class CnsCntwoController extends Controller
{
    public function index()
    {
        $cnTwo = CnsCnTwo::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'cnTwo' => $cnTwo]
        );
    }



    public function store(Request $request)
    {
        // return $request->all();

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $cnTwo = new CnsCnTwo();
            $cnTwo->name = $request->name;
            $cnTwo->save();

            return response()->json(['status' => 200, 'message' => 'CN-II Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnTwo = CnsCnTwo::find($id);
        return response()->json(['status' => 200, 'cnTwo' => $cnTwo]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $update_cnTwo = CnsCnTwo::find($id);
            $update_cnTwo->name = $request->name;

            $update_cnTwo->update();

            return response()->json(['status' => 200, 'message' => 'CN-II  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnTwo = CnsCnTwo::find($id);

        if ($del_cnTwo) {
            if ($del_cnTwo['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $del_cnTwo->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-II  deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No CN-II  Found',
            ]);
        }
    }
}
