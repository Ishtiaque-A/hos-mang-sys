<?php

namespace App\Http\Controllers\AdminSetupDoctors\MedicineCategory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMedicineCategory;
use Illuminate\Support\Facades\Validator;

class MedicineCategoryController extends Controller
{
      public function index() {
        $medicinecategory = MhpMedicineCategory::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'medicinecategory'=>$medicinecategory]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'medicinecategory_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $medicinecategory = new MhpMedicineCategory();
            $medicinecategory->medicinecategory_name = $request->medicinecategory_name;
            $medicinecategory->save();

            return response()->json(['status'=>200,'message'=>'Medicine Category  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $medicinecategory=MhpMedicineCategory::find($id);
        return response()->json(['status'=>200,'medicinecategory'=>$medicinecategory]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'medicinecategory_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_medicinecategory=MhpMedicineCategory::find($id);
            $update_medicinecategory->medicinecategory_name=$request->medicinecategory_name;

            $update_medicinecategory->update();

            return response()->json(['status'=>200,'message'=>'Medicine Category   Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_medicinecategory = MhpMedicineCategory::find($id);

        if ($del_medicinecategory)
        {
            if ($del_medicinecategory['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_medicinecategory->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Medicine Category  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No medicinecategory  Found',
            ]);
        }


    }
}
