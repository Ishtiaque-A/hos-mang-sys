<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnSix;
use Illuminate\Support\Facades\Validator;
class CnsCnSixController extends Controller
{
     public function index()
    {
        $cnSix = CnsCnSix::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnSix'=>$cnSix]);
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
            $cnSix = new CnsCnSix();
            $cnSix->name = $request->name;
            $cnSix->save();

            return response()->json(['status'=>200,'message'=>'CN-VIII Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnSix=CnsCnSix::find($id);
        return response()->json(['status'=>200,'cnSix'=>$cnSix]);
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
            $update_cnSix=CnsCnSix::find($id);
            $update_cnSix->name=$request->name;

            $update_cnSix->update();

            return response()->json(['status'=>200,'message'=>'CN-VIII  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnSix = CnsCnSix::find($id);

        if ($del_cnSix)
        {
            if ($del_cnSix['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnSix->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-VIII  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-VIII  Found',
            ]);
        }


    }
}
