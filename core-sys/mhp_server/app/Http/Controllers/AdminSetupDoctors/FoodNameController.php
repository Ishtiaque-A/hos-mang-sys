<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpFoodName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FoodNameController extends Controller
{
    public function index()
    {

        $foodsName = MhpFoodName::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'foodsName' => $foodsName,
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'food_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        }
        else {
            $foodsName = new MhpFoodName();
            $foodsName->food_name = $request->input('food_name');
            $foodsName->save();

            return response()->json([
                'status' => 200,
                'message' => 'Food Name Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $foodsName = MhpFoodName::find($id);
        if ($foodsName) {
            return response()->json([
                'status' => 200,
                'foodsName' => $foodsName,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Food Name Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'food_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $foodsName = MhpFoodName::find($id);
            if ($foodsName) {
                $foodsName->food_name = $request->input('food_name');
                $foodsName->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Food Name Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Food Name Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $drugs = MhpFoodName::find($id);
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
                'message' => 'Food Name deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Food Name Found',
            ]);
        }

    }

}
