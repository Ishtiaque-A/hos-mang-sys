<?php
namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsCnOne;
use Illuminate\Support\Facades\Validator;

class CnsCnOneController extends Controller
{
    public function index()
    {
        $cnOne = CnsCnOne::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'cnOne'=>$cnOne]);
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
            $cnOne = new CnsCnOne();
            $cnOne->name = $request->name;
            $cnOne->save();

            return response()->json(['status'=>200,'message'=>'CN-I Added Successfully']);
        }
    }


    public function edit($id)
    {
        $cnOne=CnsCnOne::find($id);
        return response()->json(['status'=>200,'cnOne'=>$cnOne]);
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
            $update_cnOne=CnsCnOne::find($id);
            $update_cnOne->name=$request->name;

            $update_cnOne->update();

            return response()->json(['status'=>200,'message'=>'CN-I  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_cnOne = CnsCnOne::find($id);

        if ($del_cnOne)
        {
            if ($del_cnOne['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_cnOne->delete();
            return response()->json([
                'status' => 200,
                'message' => 'CN-I  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CN-I  Found',
            ]);
        }


    }
  
}


