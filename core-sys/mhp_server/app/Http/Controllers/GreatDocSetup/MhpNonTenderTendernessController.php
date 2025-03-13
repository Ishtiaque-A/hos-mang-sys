<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNonTenderTenderness;
use Illuminate\Support\Facades\Validator;
class MhpNonTenderTendernessController extends Controller
{
    //
    public function index()
    {
        $nontendertenderness = MhpNonTenderTenderness::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'nontendertenderness'=>$nontendertenderness]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'nontendertenderness_name' => 'required|max:100',
       
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
           
            $nontendertenderness = new MhpNonTenderTenderness();
            $nontendertenderness->nontendertenderness_name = $request->nontendertenderness_name;

         $nontendertenderness->save();

            return response()->json(['status'=>200,'message'=>'Non Tender Tenderness Added Successfully']);
        }
    }


    public function edit($id)
    {
        $nontendertenderness=MhpNonTenderTenderness::find($id);
        return response()->json(['status'=>200,'nontendertenderness'=>$nontendertenderness]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'nontendertenderness_name' => 'required|max:100',
         

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
           
            $update_nontendertenderness=MhpNonTenderTenderness::find($id);
            $update_nontendertenderness->nontendertenderness_name=$request->nontendertenderness_name;
            $update_nontendertenderness->update();

            return response()->json(['status'=>200,'message'=>'Non Tender Tenderness Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_nontendertenderness = MhpNonTenderTenderness::find($id);
        if ($del_nontendertenderness)
        {
            if ($del_nontendertenderness['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_nontendertenderness->delete_status = $delete_status;
            $del_nontendertenderness->save();
            return response()->json([
                'status' => 200,
                'message' => 'Non Tender Tenderness deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Non Tender Tenderness Found',
            ]);
        }

    }
}



