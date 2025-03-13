<?php

namespace App\Http\Controllers;

use App\Models\MhpCustomRestriction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomRestrictionController extends Controller
{
    public function index()
   {
       $restriction = MhpCustomRestriction::where('delete_status',0)->orderBy('id','desc')->get();


       return response()->json(
           ['status'=>200,'restriction'=>$restriction]);
   }



   public function store(Request $request)
   {

       $validator = Validator::make($request->all(),[
           'restriction_name' => 'required|max:100',
       ]);
          

       if ($validator->fails())
       {
           return response()->json([
               'status' => 400,
               'errors' => $validator->messages(),
           ]);

       }else{
           $restriction = new MhpCustomRestriction();
           $restriction->restriction_name = $request->restriction_name;
           $restriction->save();

           return response()->json(['status'=>200,'message'=>'restriction Added Successfully']);
       }
   }


   public function edit($id)
   {
       $restriction=MhpCustomRestriction::find($id);
       return response()->json(['status'=>200,'restriction'=>$restriction]);
   }


   public function update(Request $request, $id)
   {

           $validator = Validator::make($request->all(),[
           'restriction_name' => 'required|max:100',
       ]);
          

       if ($validator->fails())
       {
           return response()->json([
               'status' => 400,
               'errors' => $validator->messages(),
           ]);

       }else{
           $update_restriction=MhpCustomRestriction::find($id);
           $update_restriction->restriction_name=$request->restriction_name;

           $update_restriction->update();

           return response()->json(['status'=>200,'message'=>'restriction  Updated Successfully']);
       }
   }

   public function destroy($id)
   {
       $del_restriction = MhpCustomRestriction::find($id);

       if ($del_restriction)
       {
           if ($del_restriction['delete_status']==0){
               $delete_status = 1;
           }else{
               $delete_status = 0;
           }
           $del_restriction->delete();
           return response()->json([
               'status' => 200,
               'message' => 'restriction  deleted successfully',
           ]);

       }else{
           return response()->json([
               'status' => 404,
               'message' => 'No restriction  Found',
           ]);
       }


   }
 
}
