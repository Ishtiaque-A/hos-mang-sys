<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpExmaninationList;
use Illuminate\Support\Facades\Validator;

class MhpExmaninationListController extends Controller
{
    //
    public function index()
    {
        $exmaninationlist = MhpExmaninationList::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'exmaninationlist'=>$exmaninationlist]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'exmaninationlist_name' => 'required|max:100',
       
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
           
            $exmaninationlist = new MhpExmaninationList();
            $exmaninationlist->exmaninationlist_name = $request->exmaninationlist_name;

         $exmaninationlist->save();

            return response()->json(['status'=>200,'message'=>'Exmanination List Added Successfully']);
        }
    }


    public function edit($id)
    {
        $exmaninationlist=MhpExmaninationList::find($id);
        return response()->json(['status'=>200,'exmaninationlist'=>$exmaninationlist]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'exmaninationlist_name' => 'required|max:100',
         

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
           
            $update_exmaninationlist=MhpExmaninationList::find($id);
            $update_exmaninationlist->exmaninationlist_name=$request->exmaninationlist_name;
            $update_exmaninationlist->update();

            return response()->json(['status'=>200,'message'=>'Exmanination List Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_exmaninationlist = MhpExmaninationList::find($id);
        if ($del_exmaninationlist)
        {
            if ($del_exmaninationlist['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_exmaninationlist->delete_status = $delete_status;
            $del_exmaninationlist->save();
            return response()->json([
                'status' => 200,
                'message' => 'Exmanination List deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Exmanination List Found',
            ]);
        }

    }
}

