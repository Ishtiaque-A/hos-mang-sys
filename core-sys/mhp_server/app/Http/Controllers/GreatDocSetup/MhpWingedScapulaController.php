<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWingedScapula;
use Illuminate\Support\Facades\Validator;

class MhpWingedScapulaController extends Controller
{
    //
    public function index()
    {
        $WingedScapula = MhpWingedScapula::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'WingedScapula'=>$WingedScapula]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'WingedScapula_name' => 'required|max:100',
       
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
           
            $WingedScapula = new MhpWingedScapula();
            $WingedScapula->WingedScapula_name = $request->WingedScapula_name;

         $WingedScapula->save();

            return response()->json(['status'=>200,'message'=>'Winged Scapula Added Successfully']);
        }
    }


    public function edit($id)
    {
        $WingedScapula=MhpWingedScapula::find($id);
        return response()->json(['status'=>200,'WingedScapula'=>$WingedScapula]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'WingedScapula_name' => 'required|max:100',
         

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
           
            $update_WingedScapula=MhpWingedScapula::find($id);
            $update_WingedScapula->WingedScapula_name=$request->WingedScapula_name;
            $update_WingedScapula->update();

            return response()->json(['status'=>200,'message'=>'Winged Scapula Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_WingedScapula = MhpWingedScapula::find($id);
        if ($del_WingedScapula)
        {
            if ($del_WingedScapula['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_WingedScapula->delete_status = $delete_status;
            $del_WingedScapula->save();
            return response()->json([
                'status' => 200,
                'message' => 'Winged Scapula deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Winged Scapula Found',
            ]);
        }

    }
}

