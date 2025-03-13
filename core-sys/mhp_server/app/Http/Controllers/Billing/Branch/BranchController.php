<?php

namespace App\Http\Controllers\Billing\Branch;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBranch;
use Illuminate\Support\Facades\Validator;
class BranchController extends Controller
{
    public function index()
    {
        $branch = MhpBranch::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'branch'=>$branch]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'branch_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $branch = new MhpBranch();
            $branch->branch_name = $request->branch_name;
            $branch->save();

            return response()->json(['status'=>200,'message'=>'Branch Added Successfully']);
        }
    }


    public function edit($id)
    {
        $branch=MhpBranch::find($id);
        return response()->json(['status'=>200,'branch'=>$branch]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'branch_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_branch=MhpBranch::find($id);
            $update_branch->branch_name=$request->branch_name;

            $update_branch->update();

            return response()->json(['status'=>200,'message'=>'Branch  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_branch = MhpBranch::find($id);

        if ($del_branch)
        {
            if ($del_branch['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_branch->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Branch  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No branch  Found',
            ]);
        }


    }
}
