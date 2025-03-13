<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnTen;
use Illuminate\Support\Facades\Validator;
class CnsCnTenController extends Controller
{
     public function index()
    {
        $cnTen = CnsCnTen::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnTen'=>$cnTen]);
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
            $cnTen = new CnsCnTen();
            $cnTen->name = $request->name;
            $cnTen->save();

            return response()->json(['status'=>200,'message'=>'CN-X Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnTen=CnsCnTen::find($id);
        return response()->json(['status'=>200,'cnTen'=>$cnTen]);
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
            $update_cnTen=CnsCnTen::find($id);
            $update_cnTen->name=$request->name;

            $update_cnTen->update();

            return response()->json(['status'=>200,'message'=>'CN-X  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnTen = CnsCnTen::find($id);

        if ($del_cnTen)
        {
            if ($del_cnTen['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnTen->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-X  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-X  Found',
            ]);
        }


    }
}
