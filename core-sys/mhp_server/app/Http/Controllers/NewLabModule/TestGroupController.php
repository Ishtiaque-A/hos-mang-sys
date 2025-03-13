<?php

namespace App\Http\Controllers\NewLabModule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNewLabModuleTestGroup;
use Illuminate\Support\Facades\Validator;
class TestGroupController extends Controller
{

    public function index()
    {
        $test_group = MhpNewLabModuleTestGroup::orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'test_group'=>$test_group]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'test_group_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $test_group = new MhpNewLabModuleTestGroup();
            $test_group->test_group_name = $request->test_group_name;
            $test_group->save();

            return response()->json(['status'=>200,'message'=>'test_group Added Successfully']);
        }
    }


    public function edit($id)
    {
        $test_group=MhpNewLabModuleTestGroup::find($id);
        return response()->json(['status'=>200,'test_group'=>$test_group]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'test_group_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_test_group=MhpNewLabModuleTestGroup::find($id);
            $update_test_group->test_group_name=$request->test_group_name;

            $update_test_group->update();

            return response()->json(['status'=>200,'message'=>'test_group  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_test_group = MhpNewLabModuleTestGroup::find($id);

            $del_test_group->delete();
            return response()->json([
                'status' => 200,
                'message' => 'test_group  deleted successfully',
            ]);

        }




}
