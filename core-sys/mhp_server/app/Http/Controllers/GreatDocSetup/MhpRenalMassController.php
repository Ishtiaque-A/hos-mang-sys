<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRenalMass;
use Illuminate\Support\Facades\Validator;

class MhpRenalMassController extends Controller
{
    //
    public function index()
    {
        $renalmass = MhpRenalMass::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'renalmass'=>$renalmass]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'renalmass_name' => 'required|max:100',
       
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
           
            $renalmass = new MhpRenalMass();
            $renalmass->renalmass_name = $request->renalmass_name;

         $renalmass->save();

            return response()->json(['status'=>200,'message'=>'Renal Mass Added Successfully']);
        }
    }


    public function edit($id)
    {
        $renalmass=MhpRenalMass::find($id);
        return response()->json(['status'=>200,'renalmass'=>$renalmass]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'renalmass_name' => 'required|max:100',
         

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
           
            $update_renalmass=MhpRenalMass::find($id);
            $update_renalmass->renalmass_name=$request->renalmass_name;
            $update_renalmass->update();

            return response()->json(['status'=>200,'message'=>'Renal Mass Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_renalmass = MhpRenalMass::find($id);
        if ($del_renalmass)
        {
            if ($del_renalmass['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_renalmass->delete_status = $delete_status;
            $del_renalmass->save();
            return response()->json([
                'status' => 200,
                'message' => 'Renal Mass deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Renal Mass Found',
            ]);
        }

    }
}
