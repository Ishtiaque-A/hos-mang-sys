<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpPathalogyTestName;
use Illuminate\Http\Request;
use Validator;

class PathalogyTestNameController extends Controller
{
    public function index(){

        $all_pathalogy =MhpPathalogyTestName::orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'all_pathalogy'=>$all_pathalogy]);
    }
   
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'test_name' => 'required|max:100',
        ]);
           
        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $pathalogy_test = new MhpPathalogyTestName();
            $pathalogy_test->test_name = $request->test_name;
            $pathalogy_test->save();

            return response()->json(['status'=>200,'message'=>'Pathology Added Successfully']);
        }
    }

       public function edit($id)
    {
        $edit_pathalogy=MhpPathalogyTestName::find($id);
        return response()->json(['status'=>200,'edit_pathalogy'=>$edit_pathalogy]);
    }

    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'test_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_path=MhpPathalogyTestName::find($id);
            $update_path->test_name=$request->test_name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Pathology Updated Successfully']);
        }
    }


      public function destroy($id)
    {
        $del_lab = MhpPathalogyTestName::find($id);
        $del_lab->delete();
    return response()->json(['status'=>200,'message'=>'Pathology Deleted Successfully']);

        }
}
