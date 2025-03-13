<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnEight;
use Illuminate\Support\Facades\Validator;
class CnsCnEightController extends Controller
{
    
     public function index()
    {
        $cnEight = CnsCnEight::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnEight'=>$cnEight]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $cnEight = new CnsCnEight();
            $cnEight->name = $request->name;
            $cnEight->save();

            return response()->json(['status'=>200,'message'=>'CN-XI Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnEight=CnsCnEight::find($id);
        return response()->json(['status'=>200,'cnEight'=>$cnEight]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_cnEight=CnsCnEight::find($id);
            $update_cnEight->name=$request->name;

            $update_cnEight->update();

            return response()->json(['status'=>200,'message'=>'CN-XI  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnEight = CnsCnEight::find($id);

        if ($del_cnEight)
        {
            if ($del_cnEight['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnEight->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-XI  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-XI  Found',
            ]);
        }


    }
}
