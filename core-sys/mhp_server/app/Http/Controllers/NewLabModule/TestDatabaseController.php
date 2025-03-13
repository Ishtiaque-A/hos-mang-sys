<?php

namespace App\Http\Controllers\NewLabModule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLabModuleTestCatgeory;
use App\Models\MhpNewLabModuleTestGroup;

use App\Models\MhpNewLabModuleTestName ;
use App\Models\MhpTestDatabase ;
use Illuminate\Support\Facades\Validator;
use DB;
class TestDatabaseController extends Controller
{
      public function index()
    {
          $test_name=DB::table('mhp_test_databases')->leftJoin('mhp_lab_module_test_catgeories','mhp_lab_module_test_catgeories.id','mhp_test_databases.test_category_id')->leftJoin('mhp_new_lab_module_test_groups','mhp_test_databases.test_group_id','mhp_new_lab_module_test_groups.id')->leftJoin('mhp_new_lab_module_test_names','mhp_test_databases.test_name_id','mhp_new_lab_module_test_names.id')->select('mhp_lab_module_test_catgeories.*','mhp_test_databases.*','mhp_new_lab_module_test_names.*','mhp_new_lab_module_test_groups.*')->get();

        return response()->json([
            'status'=>200,
            'test_name'=>$test_name
        ]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'test_group_id' => 'required|max:100',
            'test_category_id' => 'required|max:100',
            'test_name_id' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $test_category = new MhpTestDatabase ();
            $test_category->test_group_id = $request->test_group_id;
            $test_category->test_category_id = $request->test_category_id;
            $test_category->test_name_id = $request->test_name_id;
            $test_category->sub_test_name = $request->sub_test_name;
            $test_category->sub_test_fee = $request->sub_test_fee;


            $test_category->save();

            return response()->json(['status'=>200,'message'=>'Test Database Added Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_test_name = MhpTestDatabase::find($id);

            $del_test_name->delete();

                 $test_name=DB::table('mhp_test_databases')->leftJoin('mhp_lab_module_test_catgeories','mhp_lab_module_test_catgeories.id','mhp_test_databases.test_category_id')->leftJoin('mhp_new_lab_module_test_groups','mhp_test_databases.test_group_id','mhp_new_lab_module_test_groups.id')->leftJoin('mhp_new_lab_module_test_names','mhp_test_databases.test_name_id','mhp_new_lab_module_test_names.id')->select('mhp_lab_module_test_catgeories.*','mhp_test_databases.*','mhp_new_lab_module_test_names.*','mhp_new_lab_module_test_groups.*')->get();

            return response()->json([
                'status' => 200,
                'test_name'=>$test_name,

                'message' => 'Test Database  deleted successfully',
            ]);

        }
    
}
