<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpUrineAnalysis;
use Illuminate\Support\Facades\Validator;

class MhpUrineAnalysisController extends Controller
{
    //
    public function index()
    {
        $urineanalysis = MhpUrineAnalysis::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'urineanalysis'=>$urineanalysis]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'urineanalysis_name' => 'required|max:100',
       
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
           
            $urineanalysis = new MhpUrineAnalysis();
            $urineanalysis->urineanalysis_name = $request->urineanalysis_name;

         $urineanalysis->save();

            return response()->json(['status'=>200,'message'=>'Urine Analysis Added Successfully']);
        }
    }


    public function edit($id)
    {
        $urineanalysis=MhpUrineAnalysis::find($id);
        return response()->json(['status'=>200,'urineanalysis'=>$urineanalysis]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'urineanalysis_name' => 'required|max:100',
         

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
           
            $update_urineanalysis=MhpUrineAnalysis::find($id);
            $update_urineanalysis->urineanalysis_name=$request->urineanalysis_name;
            $update_urineanalysis->update();

            return response()->json(['status'=>200,'message'=>'Urine Analysis Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_urineanalysis = MhpUrineAnalysis::find($id);
        if ($del_urineanalysis)
        {
            if ($del_urineanalysis['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_urineanalysis->delete_status = $delete_status;
            $del_urineanalysis->save();
            return response()->json([
                'status' => 200,
                'message' => 'Urine Analysis deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Urine Analysis Found',
            ]);
        }

    }
}

