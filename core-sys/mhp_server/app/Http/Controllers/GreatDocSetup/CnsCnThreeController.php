<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnThree;
use Illuminate\Support\Facades\Validator;
class CnsCnThreeController extends Controller
{
     public function index()
    {
        $cnThree = CnsCnThree::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnThree'=>$cnThree]);
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
            $cnThree = new CnsCnThree();
            $cnThree->name = $request->name;
            $cnThree->save();

            return response()->json(['status'=>200,'message'=>'CN-III Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnThree=CnsCnThree::find($id);
        return response()->json(['status'=>200,'cnThree'=>$cnThree]);
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
            $update_cnThree=CnsCnThree::find($id);
            $update_cnThree->name=$request->name;

            $update_cnThree->update();

            return response()->json(['status'=>200,'message'=>'CN-III  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnThree = CnsCnThree::find($id);

        if ($del_cnThree)
        {
            if ($del_cnThree['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnThree->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-III  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-III  Found',
            ]);
        }


    }
  
}
