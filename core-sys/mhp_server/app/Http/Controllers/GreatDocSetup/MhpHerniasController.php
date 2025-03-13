<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHernias;
use Illuminate\Support\Facades\Validator;

class MhpHerniasController extends Controller
{
    //
    public function index()
    {
        $hernias = MhpHernias::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'hernias'=>$hernias]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'hernias_name' => 'required|max:100',
       
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
           
            $hernias = new MhpHernias();
            $hernias->hernias_name = $request->hernias_name;

         $hernias->save();

            return response()->json(['status'=>200,'message'=>'Hernias Added Successfully']);
        }
    }


    public function edit($id)
    {
        $hernias=MhpHernias::find($id);
        return response()->json(['status'=>200,'hernias'=>$hernias]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'hernias_name' => 'required|max:100',
         

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
           
            $update_hernias=MhpHernias::find($id);
            $update_hernias->hernias_name=$request->hernias_name;
            $update_hernias->update();

            return response()->json(['status'=>200,'message'=>'Hernias Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_hernias = MhpHernias::find($id);
        if ($del_hernias)
        {
            if ($del_hernias['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_hernias->delete_status = $delete_status;
            $del_hernias->save();
            return response()->json([
                'status' => 200,
                'message' => 'Hernias deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Hernias Found',
            ]);
        }

    }
}
