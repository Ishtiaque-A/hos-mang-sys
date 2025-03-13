<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpEOMAccomodation;
use Illuminate\Support\Facades\Validator;

class MhpEOMAccomodationController extends Controller
{
    //
    public function index()
    {
        $EOMAccomodation = MhpEOMAccomodation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'EOMAccomodation'=>$EOMAccomodation]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'EOMAccomodation_name' => 'required|max:100',
       
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
           
            $EOMAccomodation = new MhpEOMAccomodation();
            $EOMAccomodation->EOMAccomodation_name = $request->EOMAccomodation_name;

         $EOMAccomodation->save();

            return response()->json(['status'=>200,'message'=>'EOM Accomodation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $EOMAccomodation=MhpEOMAccomodation::find($id);
        return response()->json(['status'=>200,'EOMAccomodation'=>$EOMAccomodation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'EOMAccomodation_name' => 'required|max:100',
         

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
           
            $update_EOMAccomodation=MhpEOMAccomodation::find($id);
            $update_EOMAccomodation->EOMAccomodation_name=$request->EOMAccomodation_name;
            $update_EOMAccomodation->update();

            return response()->json(['status'=>200,'message'=>'EOM Accomodation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_EOMAccomodation = MhpEOMAccomodation::find($id);
        if ($del_EOMAccomodation)
        {
            if ($del_EOMAccomodation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_EOMAccomodation->delete_status = $delete_status;
            $del_EOMAccomodation->save();
            return response()->json([
                'status' => 200,
                'message' => 'EOM Accomodation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No EOM Accomodation Found',
            ]);
        }

    }
}


