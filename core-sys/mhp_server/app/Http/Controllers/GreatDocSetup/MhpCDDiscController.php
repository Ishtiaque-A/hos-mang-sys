<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCDDisc;
use Illuminate\Support\Facades\Validator;
class MhpCDDiscController extends Controller
{
    //
    public function index()
    {
        $CDDisc = MhpCDDisc::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'CDDisc'=>$CDDisc]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'CDDisc_name' => 'required|max:100',
       
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
           
            $CDDisc = new MhpCDDisc();
            $CDDisc->CDDisc_name = $request->CDDisc_name;

         $CDDisc->save();

            return response()->json(['status'=>200,'message'=>'CD Disc Added Successfully']);
        }
    }


    public function edit($id)
    {
        $CDDisc=MhpCDDisc::find($id);
        return response()->json(['status'=>200,'CDDisc'=>$CDDisc]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'CDDisc_name' => 'required|max:100',
         

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
           
            $update_CDDisc=MhpCDDisc::find($id);
            $update_CDDisc->CDDisc_name=$request->CDDisc_name;
            $update_CDDisc->update();

            return response()->json(['status'=>200,'message'=>'CD Disc Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_CDDisc = MhpCDDisc::find($id);
        if ($del_CDDisc)
        {
            if ($del_CDDisc['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_CDDisc->delete_status = $delete_status;
            $del_CDDisc->save();
            return response()->json([
                'status' => 200,
                'message' => 'CD Disc deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No CD Disc Found',
            ]);
        }

    }
}



