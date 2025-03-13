<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCodeMustBeCircledReason;
// use Illuminate\Support\Facades\Validator;
use Validator;

class MhpCodeMustBeCircledReasonController extends Controller
{
       //
       public function index()
       {
           $codeMustBeCircledReason = MhpCodeMustBeCircledReason::where('delete_status',0)->orderBy('id','desc')->get();
   
   
           return response()->json(
               ['status'=>200,'codeMustBeCircledReason'=>$codeMustBeCircledReason]);
       }
   
   
   
       public function store(Request $request)
       {
   
           $validator = Validator::make($request->all(),[
               'name' => 'required|max:100',
          
           ],
           // ['status_id.required' => 'Status field is required!'] 
       );
   
           if ($validator->fails())
           {
               return response()->json([
                   'status' => 400,
                   'errors' => $validator->messages(),
               ]);
   
           } 
           else{
              
               $codeMustBeCircledReason = new MhpCodeMustBeCircledReason();
               $codeMustBeCircledReason->name = $request->name;
   
            $codeMustBeCircledReason->save();
   
               return response()->json(['status'=>200,'message'=>'Code Must Be Circled Reason Added Successfully']);
           }
       }
   
   
       public function edit($id)
       {
           $codeMustBeCircledReason=MhpCodeMustBeCircledReason::find($id);
           return response()->json(['status'=>200,'codeMustBeCircledReason'=>$codeMustBeCircledReason]);
       }
   
   
       public function update(Request $request, $id)
       {
   
           $validator = Validator::make($request->all(),[
               'name' => 'required|max:100',
            
           ],
               // ['status_id.required'=>'Status field is required']
           );
   
           if ($validator->fails())
           {
               return response()->json([
                   'status' => 400,
                   'errors' => $validator->messages(),
               ]);
   
           }
            else{
              
               $update_codeMustBeCircledReason=MhpCodeMustBeCircledReason::find($id);
               $update_codeMustBeCircledReason->name=$request->name;
               $update_codeMustBeCircledReason->update();
   
               return response()->json(['status'=>200,'message'=>'Code Must Be Circled Reason Updated Successfully']);
           }
       }
   
       public function destroy($id)
       {
           $del_codeMustBeCircledReason = MhpCodeMustBeCircledReason::find($id);
           if ($del_codeMustBeCircledReason)
           {
               if ($del_codeMustBeCircledReason['delete_status']==0){
                   $delete_status = 1;
               }else{
                   $delete_status = 0;
               }
               $del_codeMustBeCircledReason->delete_status = $delete_status;
               $del_codeMustBeCircledReason->save();
               return response()->json([
                   'status' => 200,
                   'message' => 'Code Must Be Circled Reason deleted successfully',
               ]);
   
           }else{
               return response()->json([
                   'status' => 404,
                   'message' => 'No Code Must Be Circled Reason Found',
               ]);
           }
   
       }
}
