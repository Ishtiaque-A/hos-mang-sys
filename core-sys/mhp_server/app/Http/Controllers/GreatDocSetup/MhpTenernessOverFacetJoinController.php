<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTenernessOverFacetJoin;
use Illuminate\Support\Facades\Validator;

class MhpTenernessOverFacetJoinController extends Controller
{
    //
    public function index()
    {
        $TenernessOverFacetJoin = MhpTenernessOverFacetJoin::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'TenernessOverFacetJoin'=>$TenernessOverFacetJoin]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'TenernessOverFacetJoin_name' => 'required|max:100',
       
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
           
            $TenernessOverFacetJoin = new MhpTenernessOverFacetJoin();
            $TenernessOverFacetJoin->TenernessOverFacetJoin_name = $request->TenernessOverFacetJoin_name;

         $TenernessOverFacetJoin->save();

            return response()->json(['status'=>200,'message'=>'Tenerness Over FacetJoin Added Successfully']);
        }
    }


    public function edit($id)
    {
        $TenernessOverFacetJoin=MhpTenernessOverFacetJoin::find($id);
        return response()->json(['status'=>200,'TenernessOverFacetJoin'=>$TenernessOverFacetJoin]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'TenernessOverFacetJoin_name' => 'required|max:100',
         

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
           
            $update_TenernessOverFacetJoin=MhpTenernessOverFacetJoin::find($id);
            $update_TenernessOverFacetJoin->TenernessOverFacetJoin_name=$request->TenernessOverFacetJoin_name;
            $update_TenernessOverFacetJoin->update();

            return response()->json(['status'=>200,'message'=>'Tenerness Over FacetJoin Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_TenernessOverFacetJoin = MhpTenernessOverFacetJoin::find($id);
        if ($del_TenernessOverFacetJoin)
        {
            if ($del_TenernessOverFacetJoin['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_TenernessOverFacetJoin->delete_status = $delete_status;
            $del_TenernessOverFacetJoin->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tenerness Over FacetJoin deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tenerness Over FacetJoin Found',
            ]);
        }

    }
}

