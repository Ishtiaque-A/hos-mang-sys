<?php

namespace App\Http\Controllers\Billing\Digital;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDigital;
use Illuminate\Support\Facades\Validator;

class DigitalController extends Controller
{
    public function index()
    {
        $digital = MhpDigital::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'digital'=>$digital]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'digital_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $digital = new MhpDigital();
            $digital->digital_name = $request->digital_name;
            $digital->save();

            return response()->json(['status'=>200,'message'=>'Digital Added Successfully']);
        }
    }


    public function edit($id)
    {
        $digital=MhpDigital::find($id);
        return response()->json(['status'=>200,'digital'=>$digital]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'digital_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_digital=MhpDigital::find($id);
            $update_digital->digital_name=$request->digital_name;

            $update_digital->update();

            return response()->json(['status'=>200,'message'=>'Digital  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_digital = MhpDigital::find($id);

        if ($del_digital)
        {
            if ($del_digital['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_digital->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Digital  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Digital  Found',
            ]);
        }


    }
  
}
