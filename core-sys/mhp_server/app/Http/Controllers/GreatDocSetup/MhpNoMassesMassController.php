<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNoMassesMass;
use Illuminate\Support\Facades\Validator;

class MhpNoMassesMassController extends Controller
{
    //
    public function index()
    {
        $nomassesmass = MhpNoMassesMass::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'nomassesmass'=>$nomassesmass]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'nomassesmass_name' => 'required|max:100',
       
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
           
            $nomassesmass = new MhpNoMassesMass();
            $nomassesmass->nomassesmass_name = $request->nomassesmass_name;

         $nomassesmass->save();

            return response()->json(['status'=>200,'message'=>'No Masses Mass Added Successfully']);
        }
    }


    public function edit($id)
    {
        $nomassesmass=MhpNoMassesMass::find($id);
        return response()->json(['status'=>200,'nomassesmass'=>$nomassesmass]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'nomassesmass_name' => 'required|max:100',
         

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
           
            $update_nomassesmass=MhpNoMassesMass::find($id);
            $update_nomassesmass->nomassesmass_name=$request->nomassesmass_name;
            $update_nomassesmass->update();

            return response()->json(['status'=>200,'message'=>'No Masses Mass Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_nomassesmass = MhpNoMassesMass::find($id);
        if ($del_nomassesmass)
        {
            if ($del_nomassesmass['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_nomassesmass->delete_status = $delete_status;
            $del_nomassesmass->save();
            return response()->json([
                'status' => 200,
                'message' => 'No Masses Mass deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No No Masses Mass Found',
            ]);
        }

    }
}
