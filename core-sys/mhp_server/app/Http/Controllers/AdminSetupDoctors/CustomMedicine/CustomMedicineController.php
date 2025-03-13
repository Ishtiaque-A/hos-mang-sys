<?php

namespace App\Http\Controllers\AdminSetupDoctors\CustomMedicine;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCustomMedicine;
use App\Models\MhpIngerdientChild;
use DB;
use App\Models\MhpIngredient;
use Validator;

class CustomMedicineController extends Controller
{
    public function index()
    {

        $all_custom_medicine = DB::table('mhp_ingerdient_children')
            ->leftJoin('mhp_custom_medicines', 'mhp_ingerdient_children.custom_medicine_id', 'mhp_custom_medicines.id')
            ->leftJoin('mhp_ingredients', 'mhp_ingerdient_children.ingredient_id', 'mhp_ingredients.id')
            ->leftJoin('mhp_medicine_categories', 'mhp_custom_medicines.medicine_category_id', 'mhp_medicine_categories.id')
            ->leftJoin('mhp_route_names', 'mhp_custom_medicines.route_id', 'mhp_route_names.id')
            ->leftJoin('mhp_custom_restrictions', 'mhp_custom_medicines.restriction_id', 'mhp_custom_restrictions.id')
            ->select('mhp_ingerdient_children.*', 'mhp_ingredients.ingredient_name', 'mhp_custom_medicines.custom_medicine_name', 'mhp_custom_medicines.medicine_category_id', 'mhp_custom_medicines.route_id', 'mhp_medicine_categories.medicinecategory_name', 'mhp_custom_medicines.restriction_id', 'mhp_route_names.route_name', 'mhp_custom_restrictions.restriction_name')->get();


        return response()->json([
            'status' => 200,
            'all_custom_medicine' => $all_custom_medicine,

        ]);
    }

    public function custom_medicine()
    {

        $all_custom_medicine = MhpCustomMedicine::get();


        return response()->json([
            'status' => 200,
            'all_custom_medicine' => $all_custom_medicine,

        ]);
    }

    public function custom_medicine_search($name)
    {

        $all_custom_medicine = MhpCustomMedicine::where('custom_medicine_name','like','%'.$name.'%')->get();


        return response()->json([
            'status' => 200,
            'all_custom_medicine' => $all_custom_medicine,

        ]);
    }

    public function custom_medicine_ingredient($medicenID)
    {

        $medicine_ingredient = MhpIngerdientChild::where('custom_medicine_id',$medicenID)->with('MhpIngredient')->get();


        return response()->json([
            'status' => 200,
            'medicine_ingredient' => $medicine_ingredient,

        ]);
    }


    public function store(Request $request)

    {
        // $validator = Validator::make($request->all(),[
        //     //    'custom_medicine_name' => 'required|unique:mhp_custom_medicines,custom_medicine_name',
        //     //    'strength' => 'required',
        //     'custom_medicine_name' => 'required|max:100',
        //    ]);


        //    if ($validator->fails())
        //    {
        //        return response()->json([
        //            'status' => 400,
        //            'errors' => $validator->messages(),
        //        ]);
        //    }
        //    else{
        //              $custom_medicine = new MhpCustomMedicine();
        //        $custom_medicine->custom_medicine_name = $request->custom_medicine_name;
        //        $custom_medicine->strength = $request->strength;
        //        $custom_medicine->medicine_category_id = $request->medicine_category_id;
        //        $custom_medicine->other_details = $request->other_details;
        //        $custom_medicine->route_id = $request->route_id;
        //        $custom_medicine->qty = $request->qty;
        //        $custom_medicine->unit = $request->unit;
        //        $custom_medicine->repeats = $request->repeats;
        //        $custom_medicine->restriction_id = $request->restriction_id;
        //        $custom_medicine->save();

        //        return response()->json([
        //            'status' => 200,
        //            'message' => 'Custom Medicine Added Successfully',
        //         //    'custom_medicine' => $custom_medicine,

        //        ]);

        //    }


        // $custom_medicine = new MhpCustomMedicine();
        // $custom_medicine->custom_medicine_name = $request->custom_medicine_name;
        // $custom_medicine->strength = $request->strength;
        // $custom_medicine->medicine_category_id = $request->medicine_category_id;
        // $custom_medicine->other_details = $request->other_details;
        // $custom_medicine->route_id = $request->route_id;
        // $custom_medicine->qty = $request->qty;
        // $custom_medicine->unit = $request->unit;
        // $custom_medicine->repeats = $request->repeats;
        // $custom_medicine->restriction_id = $request->restriction_id;
        // $custom_medicine->save();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Custom Medicine Added Successfully',
        //     'custom_medicine' => $custom_medicine,

        // ]);


        $validator = Validator::make($request->all(),[
            'custom_medicine_name' => 'required|max:100',
            'strength' => 'required|max:100',
            'medicine_category_id' => 'required|max:100',
            'other_details' => 'required|max:100',
            'route_id' => 'required|max:100',
            'qty' => 'required|max:100',
            'unit' => 'required|max:100',
            'repeats' => 'required|max:100',
            'restriction_id' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $custom_medicine = new MhpCustomMedicine();
        $custom_medicine->custom_medicine_name = $request->custom_medicine_name;
        $custom_medicine->strength = $request->strength;
        $custom_medicine->medicine_category_id = $request->medicine_category_id;
        $custom_medicine->other_details = $request->other_details;
        $custom_medicine->route_id = $request->route_id;
        $custom_medicine->qty = $request->qty;
        $custom_medicine->unit = $request->unit;
        $custom_medicine->repeats = $request->repeats;
        $custom_medicine->restriction_id = $request->restriction_id;
        $custom_medicine->save();
            return response()->json(['status'=>200,'custom_medicine'=>$custom_medicine ,'message'=>'Custom Medicine Added Successfully']);
        }
    }


    public function saveIngredientChildren(Request $request)
    {
        $ingredient_children = new MhpIngerdientChild();
        $ingredient_children->ingredient_id = $request->ingredient_id;
        $ingredient_children->ingredient_strength = $request->ingredient_strength;
        $ingredient_children->ingredient_unit = $request->ingredient_unit;
        $ingredient_children->custom_medicine_id = $request->custom_medicine_id;
        $ingredient_children->save();

        return response()->json([
            'status' => 200,
            'message' => 'Custom Medicine Added Successfully',
        ]);
    }

    public function edit($id)
    {
        $edit_ingredient = MhpIngerdientChild::find($id);

        $edit_custom_medicine = MhpCustomMedicine::where('id', $edit_ingredient->custom_medicine_id)->first();

        return response()->json([
            'status' => 200,
            'edit_ingredient' => $edit_ingredient,
            'edit_custom_medicine' => $edit_custom_medicine,
        ]);
    }

    public function update(Request $request, $id)
    {
        $update_ingredient = MhpIngerdientChild::find($id);
        $update_ingredient->custom_medicine_id = $request->custom_medicine_id;
        $update_ingredient->ingredient_id = $request->ingredient_id;
        $update_ingredient->ingredient_unit = $request->ingredient_unit;
        $update_ingredient->ingredient_strength = $request->ingredient_strength;

        $update_ingredient->update();

        return response()->json(
            [
                'status' => 200,
                'message' => 'Ingredient Updated Successfully',
                'update_ingredient' => $update_ingredient,
            ]
        );

        // $validator = Validator::make($request->all(),[
        //     'ingredient_name' => 'required|max:100',
        // ]);
           

        // if ($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $validator->messages(),
        //     ]);

        // }else{
        //     $update_ingredient=MhpIngredient::find($id);
        //     $update_ingredient->ingredient_name=$request->ingredient_name;

        //     $update_ingredient->update();

        //     return response()->json(['status'=>200,'message'=>'Ingredient  Updated Successfully']);
        // }
    }

    public function updateCustomMedicine(Request $request, $id)
    {
        // $update_custom_medicine = MhpCustomMedicine::find($id);
        // $update_custom_medicine->custom_medicine_name = $request->custom_medicine_name;
        // $update_custom_medicine->strength = $request->strength;
        // $update_custom_medicine->medicine_category_id = $request->medicine_category_id;
        // $update_custom_medicine->other_details = $request->other_details;
        // $update_custom_medicine->route_id = $request->route_id;
        // $update_custom_medicine->qty = $request->qty;
        // $update_custom_medicine->unit = $request->unit;
        // $update_custom_medicine->repeats = $request->repeats;
        // $update_custom_medicine->restriction_id = $request->restriction_id;
        // $update_custom_medicine->update();

        // return response()->json(
        //     [
        //         'status' => 200,
        //         'message' => 'Custom Medicine  Updated Successfully',
        //         'update_custom_medicine' => $update_custom_medicine,
        //     ]
        // );

        $validator = Validator::make($request->all(),[
            'custom_medicine_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_custom_medicine = MhpCustomMedicine::find($id);
            $update_custom_medicine->custom_medicine_name = $request->custom_medicine_name;
            $update_custom_medicine->strength = $request->strength;
            $update_custom_medicine->medicine_category_id = $request->medicine_category_id;
            $update_custom_medicine->other_details = $request->other_details;
            $update_custom_medicine->route_id = $request->route_id;
            $update_custom_medicine->qty = $request->qty;
            $update_custom_medicine->unit = $request->unit;
            $update_custom_medicine->repeats = $request->repeats;
            $update_custom_medicine->restriction_id = $request->restriction_id;
            $update_custom_medicine->update();

            return response()->json(['status'=>200,'message'=>'Custom Medicine  Updated Successfully']);
        }
    }


    public function destroy($id)
    {
        $del_custom_medicine = MhpIngerdientChild::find($id);

        if ($del_custom_medicine) {
            if ($del_custom_medicine['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $del_custom_medicine->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Custom Medicine  deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Custom Medicine Found',
            ]);
        }
    }

    public function getIngredientName($id)
    {

        $ingredient = MhpIngredient::find($id);
        return response()->json([
            'status' => 200,
            'ingredient' => $ingredient,
        ]);
    }
}
