<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnSeven;
use Illuminate\Support\Facades\Validator;
class CnsCnSevenController extends Controller
{
     public function index()
    {
        $cnSeven = CnsCnSeven::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnSeven'=>$cnSeven]);
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
            $cnSeven = new CnsCnSeven();
            $cnSeven->name = $request->name;
            $cnSeven->save();

            return response()->json(['status'=>200,'message'=>'CN-IX, X Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnSeven=CnsCnSeven::find($id);
        return response()->json(['status'=>200,'cnSeven'=>$cnSeven]);
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
            $update_cnSeven=CnsCnSeven::find($id);
            $update_cnSeven->name=$request->name;

            $update_cnSeven->update();

            return response()->json(['status'=>200,'message'=>'CN-IX, X  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnSeven = CnsCnSeven::find($id);

        if ($del_cnSeven)
        {
            if ($del_cnSeven['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnSeven->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-IX, X  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-IX, X  Found',
            ]);
        }


    }
}
