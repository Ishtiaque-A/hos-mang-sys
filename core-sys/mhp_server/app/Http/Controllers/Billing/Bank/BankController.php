<?php

namespace App\Http\Controllers\Billing\Bank;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBank;
use App\Models\MhpBranch;
use Illuminate\Support\Facades\Validator;

class BankController extends Controller
{
    
    public function index()
    {
        $bank = MhpBank::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'bank'=>$bank]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'bank_name' => 'required|max:100',
            'branch_id' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $bank = new MhpBank();
            $bank->branch_id = $request->branch_id;
            $bank->bank_name = $request->bank_name;
            $bank->save();

            return response()->json(['status'=>200,'message'=>'Bank Added Successfully']);
        }
    }


    public function edit($id)
    {
        $bank=MhpBank::find($id);
        return response()->json(['status'=>200,'bank'=>$bank]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'bank_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_bank=MhpBank::find($id);
              $update_bank->branch_id = $request->branch_id;
            $update_bank->bank_name=$request->bank_name;

            $update_bank->update();

            return response()->json(['status'=>200,'message'=>'Bank  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_bank = MhpBank::find($id);

        if ($del_bank)
        {
            if ($del_bank['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_bank->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Bank  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No bank  Found',
            ]);
        }


    }
    public function allBranch(){
    	$allBranch=MhpBranch::where('delete_status',0)->get();

       return response()->json([
       	'status' => 200,
         'allBranch' =>$allBranch,
       ]);
    }
}
