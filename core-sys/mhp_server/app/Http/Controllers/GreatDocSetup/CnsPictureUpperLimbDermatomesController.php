<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\CnsPictureUpperLimbDermatomes;
use Illuminate\Support\Facades\Validator;

class CnsPictureUpperLimbDermatomesController extends Controller
{
       //

    public function index()
    {
        $PULimbDermatomes = CnsPictureUpperLimbDermatomes::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PULimbDermatomes'=>$PULimbDermatomes]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PULimbDermatomes_name' => 'required|max:100',
            'image'=>'required',
        ],
            // ['status_id.required' => 'Status field is required!'] 
         );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/PULimbDermatomes/', $name);
        }
            $PULimbDermatomes = new CnsPictureUpperLimbDermatomes();
            $PULimbDermatomes->PULimbDermatomes_name = $request->PULimbDermatomes_name;
            if($files!=null){
            $PULimbDermatomes->image=$name;
            }
            $PULimbDermatomes->save();

            return response()->json(['status'=>200,'message'=>'Picture upper limb dermatomes  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PULimbDermatomes=CnsPictureUpperLimbDermatomes::find($id);
        return response()->json(['status'=>200,'PULimbDermatomes'=>$PULimbDermatomes]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PULimbDermatomes_name' => 'required|max:100',
        ]
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/PULimbDermatomes/', $name);
        }
            $update_PULimbDermatomes=CnsPictureUpperLimbDermatomes::find($id);
            $update_PULimbDermatomes->PULimbDermatomes_name=$request->PULimbDermatomes_name;
            if($files!=null){
             $update_PULimbDermatomes->image=$name;

            }
            $update_PULimbDermatomes->update();

            return response()->json(['status'=>200,'message'=>'Picture upper limb dermatomes Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PULimbDermatomes = CnsPictureUpperLimbDermatomes::find($id);
        if ($del_PULimbDermatomes)
        {
            if ($del_PULimbDermatomes['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PULimbDermatomes->delete_status = $delete_status;
            $del_PULimbDermatomes->save();
            return response()->json([
                'status' => 200,
                'message' => 'Picture upper limb dermatomes deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Picture upper limb dermatomes  Found',
            ]);
        }


    }
    
}
