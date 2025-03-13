<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnFive;
use Illuminate\Support\Facades\Validator;
class CnsCnFiveController extends Controller
{
    public function index()
    {
        $cnFive = CnsCnFive::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnFive'=>$cnFive]);
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
            $cnFive = new CnsCnFive();
            $cnFive->name = $request->name;
            $cnFive->save();

            return response()->json(['status'=>200,'message'=>'CN-VII Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnFive=CnsCnFive::find($id);
        return response()->json(['status'=>200,'cnFive'=>$cnFive]);
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
            $update_cnFive=CnsCnFive::find($id);
            $update_cnFive->name=$request->name;

            $update_cnFive->update();

            return response()->json(['status'=>200,'message'=>'CN-VII  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnFive = CnsCnFive::find($id);

        if ($del_cnFive)
        {
            if ($del_cnFive['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnFive->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-VII  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-VII  Found',
            ]);
        }


    }
}
