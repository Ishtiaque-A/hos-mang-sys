<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpReviewName;
use Validator;
class ReviewNameSetUpController extends Controller
{

 public function index()
    {
        $review_name = MhpReviewName::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'review_name'=>$review_name]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'review_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $review_name = new MhpReviewName();
            $review_name->review_name = $request->review_name;
            $review_name->save();

            return response()->json(['status'=>200,'message'=>'Review Name Added Successfully']);
        }
    }


    public function edit($id)
    {
        $review_name=MhpReviewName::find($id);
        return response()->json(['status'=>200,'review_name'=>$review_name]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'review_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_review_name=MhpReviewName::find($id);
            $update_review_name->review_name=$request->review_name;

            $update_review_name->update();

            return response()->json(['status'=>200,'message'=>'Review Name   Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_review_name = MhpReviewName::find($id);

        if ($del_review_name)
        {
            if ($del_review_name['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_review_name->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Review Name  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No review_name  Found',
            ]);
        }


    }
}
