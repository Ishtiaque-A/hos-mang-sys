<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnFour;
use Illuminate\Support\Facades\Validator;
class CnsCnFourController extends Controller
{
    public function index()
    {
        $cnFour = CnsCnFour::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnFour'=>$cnFour]);
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
            $cnFour = new CnsCnFour();
            $cnFour->name = $request->name;
            $cnFour->save();

            return response()->json(['status'=>200,'message'=>'CN-V Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnFour=CnsCnFour::find($id);
        return response()->json(['status'=>200,'cnFour'=>$cnFour]);
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
            $update_cnFour=CnsCnFour::find($id);
            $update_cnFour->name=$request->name;

            $update_cnFour->update();

            return response()->json(['status'=>200,'message'=>'CN-V  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnFour = CnsCnFour::find($id);

        if ($del_cnFour)
        {
            if ($del_cnFour['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnFour->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-V  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-V  Found',
            ]);
        }


    }
  
}
