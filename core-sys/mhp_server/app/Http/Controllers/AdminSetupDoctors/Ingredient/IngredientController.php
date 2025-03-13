<?php

namespace App\Http\Controllers\AdminSetupDoctors\Ingredient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpIngredient;
use Illuminate\Support\Facades\Validator;
class IngredientController extends Controller
{
     public function index()
    {
        $ingredient = MhpIngredient::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ingredient'=>$ingredient]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ingredient_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $ingredient = new MhpIngredient();
            $ingredient->ingredient_name = $request->ingredient_name;
            $ingredient->save();

            return response()->json(['status'=>200,'message'=>'ingredient Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ingredient=MhpIngredient::find($id);
        return response()->json(['status'=>200,'ingredient'=>$ingredient]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'ingredient_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_ingredient=MhpIngredient::find($id);
            $update_ingredient->ingredient_name=$request->ingredient_name;

            $update_ingredient->update();

            return response()->json(['status'=>200,'message'=>'Ingredient  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ingredient = MhpIngredient::find($id);

        if ($del_ingredient)
        {
            if ($del_ingredient['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ingredient->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Ingredient  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No ingredient  Found',
            ]);
        }


    }
}
