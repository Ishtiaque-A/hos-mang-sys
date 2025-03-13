<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPhoriaOne;
use Illuminate\Support\Facades\Validator;

class MhpPhoriaOneController extends Controller
{
    //
    public function index()
    {
        $PhoriaOne = MhpPhoriaOne::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PhoriaOne'=>$PhoriaOne]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PhoriaOne_name' => 'required|max:100',
       
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
           
            $PhoriaOne = new MhpPhoriaOne();
            $PhoriaOne->PhoriaOne_name = $request->PhoriaOne_name;

         $PhoriaOne->save();

            return response()->json(['status'=>200,'message'=>'Phoria One Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PhoriaOne=MhpPhoriaOne::find($id);
        return response()->json(['status'=>200,'PhoriaOne'=>$PhoriaOne]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PhoriaOne_name' => 'required|max:100',
         

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
           
            $update_PhoriaOne=MhpPhoriaOne::find($id);
            $update_PhoriaOne->PhoriaOne_name=$request->PhoriaOne_name;
            $update_PhoriaOne->update();

            return response()->json(['status'=>200,'message'=>'Phoria One Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PhoriaOne = MhpPhoriaOne::find($id);
        if ($del_PhoriaOne)
        {
            if ($del_PhoriaOne['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PhoriaOne->delete_status = $delete_status;
            $del_PhoriaOne->save();
            return response()->json([
                'status' => 200,
                'message' => 'Phoria One deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Phoria One Found',
            ]);
        }

    }
}


