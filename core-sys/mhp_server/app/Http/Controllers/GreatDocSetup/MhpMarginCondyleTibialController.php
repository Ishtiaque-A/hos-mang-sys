<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMarginCondyleTibial;
use Illuminate\Support\Facades\Validator;

class MhpMarginCondyleTibialController extends Controller
{
    //
    public function index()
    {
        $marginCondyleTibial = MhpMarginCondyleTibial::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'marginCondyleTibial'=>$marginCondyleTibial]);
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
           
            $marginCondyleTibial = new MhpMarginCondyleTibial();
            $marginCondyleTibial->name = $request->name;

         $marginCondyleTibial->save();

            return response()->json(['status'=>200,'message'=>'Margin Condyle Tibial Added Successfully']);
        }
    }


    public function edit($id)
    {
        $marginCondyleTibial=MhpMarginCondyleTibial::find($id);
        return response()->json(['status'=>200,'marginCondyleTibial'=>$marginCondyleTibial]);
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
           
            $update_marginCondyleTibial=MhpMarginCondyleTibial::find($id);
            $update_marginCondyleTibial->name=$request->name;
            $update_marginCondyleTibial->update();

            return response()->json(['status'=>200,'message'=>'Margin Condyle Tibial Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_marginCondyleTibial = MhpMarginCondyleTibial::find($id);
        if ($del_marginCondyleTibial)
        {
            if ($del_marginCondyleTibial['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_marginCondyleTibial->delete_status = $delete_status;
            $del_marginCondyleTibial->save();
            return response()->json([
                'status' => 200,
                'message' => 'Margin Condyle Tibial deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Margin Condyle Tibial Found',
            ]);
        }

    }
}


