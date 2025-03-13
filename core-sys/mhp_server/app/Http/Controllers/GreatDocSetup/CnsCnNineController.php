<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnNine;
use Illuminate\Support\Facades\Validator;
class CnsCnNineController extends Controller
{
     
     public function index()
    {
        $cnNine = CnsCnNine::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnNine'=>$cnNine]);
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
            $cnNine = new CnsCnNine();
            $cnNine->name = $request->name;
            $cnNine->save();

            return response()->json(['status'=>200,'message'=>'CN-XII Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnNine=CnsCnNine::find($id);
        return response()->json(['status'=>200,'cnNine'=>$cnNine]);
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
            $update_cnNine=CnsCnNine::find($id);
            $update_cnNine->name=$request->name;

            $update_cnNine->update();

            return response()->json(['status'=>200,'message'=>'CN-XII  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnNine = CnsCnNine::find($id);

        if ($del_cnNine)
        {
            if ($del_cnNine['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnNine->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-XII  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-XII  Found',
            ]);
        }


    }
}
