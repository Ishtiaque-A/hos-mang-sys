<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHandAndFinger;
use Illuminate\Support\Facades\Validator;

class MhpHandAndFingerController extends Controller
{
    //
    public function index()
    {
        $handandfinger = MhpHandAndFinger::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'handandfinger'=>$handandfinger]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'handandfinger_name' => 'required|max:100',
       
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
           
            $handandfinger = new MhpHandAndFinger();
            $handandfinger->handandfinger_name = $request->handandfinger_name;

         $handandfinger->save();

            return response()->json(['status'=>200,'message'=>'Hand And Finger Added Successfully']);
        }
    }


    public function edit($id)
    {
        $handandfinger=MhpHandAndFinger::find($id);
        return response()->json(['status'=>200,'handandfinger'=>$handandfinger]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'handandfinger_name' => 'required|max:100',
         

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
           
            $update_handandfinger=MhpHandAndFinger::find($id);
            $update_handandfinger->handandfinger_name=$request->handandfinger_name;
            $update_handandfinger->update();

            return response()->json(['status'=>200,'message'=>'Hand And Finger Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_handandfinger = MhpHandAndFinger::find($id);
        if ($del_handandfinger)
        {
            if ($del_handandfinger['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_handandfinger->delete_status = $delete_status;
            $del_handandfinger->save();
            return response()->json([
                'status' => 200,
                'message' => 'Hand And Finger deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Hand And Finger Found',
            ]);
        }

    }
}


