<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSigmoidoscopyGuaiacTest;
use Illuminate\Support\Facades\Validator;
class MhpSigmoidoscopyGuaiacTestController extends Controller
{
    //
    public function index()
    {
        $sigmoidoscopyguaiactest = MhpSigmoidoscopyGuaiacTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'sigmoidoscopyguaiactest'=>$sigmoidoscopyguaiactest]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'sigmoidoscopyguaiactest_name' => 'required|max:100',
       
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
           
            $sigmoidoscopyguaiactest = new MhpSigmoidoscopyGuaiacTest();
            $sigmoidoscopyguaiactest->sigmoidoscopyguaiactest_name = $request->sigmoidoscopyguaiactest_name;

         $sigmoidoscopyguaiactest->save();

            return response()->json(['status'=>200,'message'=>'Sigmoidoscopy-Guaiac Test (FOBT) Added Successfully']);
        }
    }


    public function edit($id)
    {
        $sigmoidoscopyguaiactest=MhpSigmoidoscopyGuaiacTest::find($id);
        return response()->json(['status'=>200,'sigmoidoscopyguaiactest'=>$sigmoidoscopyguaiactest]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'sigmoidoscopyguaiactest_name' => 'required|max:100',
         

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
           
            $update_sigmoidoscopyguaiactest=MhpSigmoidoscopyGuaiacTest::find($id);
            $update_sigmoidoscopyguaiactest->sigmoidoscopyguaiactest_name=$request->sigmoidoscopyguaiactest_name;
            $update_sigmoidoscopyguaiactest->update();

            return response()->json(['status'=>200,'message'=>'Sigmoidoscopy-Guaiac Test (FOBT) Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_sigmoidoscopyguaiactest = MhpSigmoidoscopyGuaiacTest::find($id);
        if ($del_sigmoidoscopyguaiactest)
        {
            if ($del_sigmoidoscopyguaiactest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_sigmoidoscopyguaiactest->delete_status = $delete_status;
            $del_sigmoidoscopyguaiactest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Sigmoidoscopy-Guaiac Test (FOBT) deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Sigmoidoscopy-Guaiac Test (FOBT) Found',
            ]);
        }

    }
}
