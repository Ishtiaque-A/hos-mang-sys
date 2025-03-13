<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSite;
use Illuminate\Support\Facades\Validator;

class MhpSiteController extends Controller
{
    //
    public function index()
    {
        $Site = MhpSite::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Site'=>$Site]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Site_name' => 'required|max:100',
       
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
           
            $Site = new MhpSite();
            $Site->Site_name = $request->Site_name;

         $Site->save();

            return response()->json(['status'=>200,'message'=>'Site Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Site=MhpSite::find($id);
        return response()->json(['status'=>200,'Site'=>$Site]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Site_name' => 'required|max:100',
         

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
           
            $update_Site=MhpSite::find($id);
            $update_Site->Site_name=$request->Site_name;
            $update_Site->update();

            return response()->json(['status'=>200,'message'=>'Site Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Site = MhpSite::find($id);
        if ($del_Site)
        {
            if ($del_Site['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Site->delete_status = $delete_status;
            $del_Site->save();
            return response()->json([
                'status' => 200,
                'message' => 'Site deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Site Found',
            ]);
        }

    }
}
