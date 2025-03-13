<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSubBodyPart;
use App\Models\MhpMainBodyPart;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
class MhpSubBodyPartController extends Controller
{
      public function index()
    {
        // $SubBodyPart = MhpSubBodyPart::with('MainBodyPart')->where('delete_status',0)->orderBy('id','desc')->get();

        $SubBodyPart = DB::table('mhp_sub_body_parts')->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_sub_body_parts.MainBodyPart_id')->where('mhp_sub_body_parts.delete_status',0)->select('mhp_sub_body_parts.*','mhp_sub_body_parts.SubBodyPart_name','mhp_main_body_parts.MainBodyPart_name')->orderBy('mhp_sub_body_parts.id','desc')->get();


        return response()->json(
            ['status'=>200,'SubBodyPart'=>$SubBodyPart]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'SubBodyPart_name' => 'required|max:100',
            'MainBodyPart_id' => 'required|max:100',
        ],
['MainBodyPart_id.required'=>'Main Body Part Name is required']
         );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $SubBodyPart = new MhpSubBodyPart();
            $SubBodyPart->SubBodyPart_name = $request->SubBodyPart_name;
            $SubBodyPart->MainBodyPart_id = $request->MainBodyPart_id;
            $SubBodyPart->save();

            return response()->json(['status'=>200,'message'=>'Sub Body Part Added Successfully']);
        }
    }


    public function edit($id)
    {
        $SubBodyPart=MhpSubBodyPart::find($id);
        return response()->json(['status'=>200,'SubBodyPart'=>$SubBodyPart]);
    }


    public function update(Request $request, $id)
    {

     
            $update_SubBodyPart=MhpSubBodyPart::find($id);
            $update_SubBodyPart->SubBodyPart_name = $request->SubBodyPart_name;
            $update_SubBodyPart->MainBodyPart_id = $request->MainBodyPart_id;
            $update_SubBodyPart->update();

            return response()->json(['status'=>200,'message'=>'Sub Body Part  Updated Successfully']);
        }
    

    public function destroy($id)
    {
        $del_SubBodyPart = MhpSubBodyPart::find($id);
        if ($del_SubBodyPart)
        {
            if ($del_SubBodyPart['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_SubBodyPart->delete_status = $delete_status;
            $del_SubBodyPart->save();
            return response()->json([
                'status' => 200,
                'message' => 'Sub Body Part  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Sub Body Part  Found',
            ]);
        }


    }
    public function mainbodypart_dropdown(){
        $status_list = MhpMainBodyPart::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status'=>200,
            'status_list'=>$status_list
        ]);
    }

    public function getAllSubBody($id)
    {

   $SubBodyParts=DB::table('mhp_sub_body_parts')->where('MainBodyPart_id',$id)->where('delete_status',0)->get();

   return response()->json([

  'status'=>200,
  'SubBodyParts'=>$SubBodyParts
   ]);

}


//mobile api 
public function getAllSubBodyName($name){


   $allSubBodyParts=DB::table('mhp_sub_body_parts')->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_sub_body_parts.MainBodyPart_id')->where('mhp_main_body_parts.MainBodyPart_name', 'like', '%' .$name. '%')->select('mhp_sub_body_parts.*','mhp_main_body_parts.MainBodyPart_name')->where('mhp_sub_body_parts.delete_status', 0)->get();


return response()->json(['status'=>200,'allSubBodyParts' => $allSubBodyParts]);

}
   


   }


