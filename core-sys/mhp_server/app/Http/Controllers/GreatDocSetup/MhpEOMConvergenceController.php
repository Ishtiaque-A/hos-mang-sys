<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpEOMConvergence;
use Illuminate\Support\Facades\Validator;

class MhpEOMConvergenceController extends Controller
{
    //
    public function index()
    {
        $EOMConvergence = MhpEOMConvergence::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'EOMConvergence'=>$EOMConvergence]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'EOMConvergence_name' => 'required|max:100',
       
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
           
            $EOMConvergence = new MhpEOMConvergence();
            $EOMConvergence->EOMConvergence_name = $request->EOMConvergence_name;

         $EOMConvergence->save();

            return response()->json(['status'=>200,'message'=>'EOM Convergence Added Successfully']);
        }
    }


    public function edit($id)
    {
        $EOMConvergence=MhpEOMConvergence::find($id);
        return response()->json(['status'=>200,'EOMConvergence'=>$EOMConvergence]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'EOMConvergence_name' => 'required|max:100',
         

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
           
            $update_EOMConvergence=MhpEOMConvergence::find($id);
            $update_EOMConvergence->EOMConvergence_name=$request->EOMConvergence_name;
            $update_EOMConvergence->update();

            return response()->json(['status'=>200,'message'=>'EOM Convergence Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_EOMConvergence = MhpEOMConvergence::find($id);
        if ($del_EOMConvergence)
        {
            if ($del_EOMConvergence['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_EOMConvergence->delete_status = $delete_status;
            $del_EOMConvergence->save();
            return response()->json([
                'status' => 200,
                'message' => 'EOM Convergence deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No EOM Convergence Found',
            ]);
        }

    }
}


