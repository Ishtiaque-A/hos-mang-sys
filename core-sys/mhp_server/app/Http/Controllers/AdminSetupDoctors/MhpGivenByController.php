<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGivenBy ;
// use Illuminate\Support\Facades\Validator;
use Validator;

class MhpGivenByController  extends Controller
{
    public function index()
    {
        $givenBy  = MhpGivenBy ::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "givenBy" => $givenBy ]);
    }

    public function store(Request $request)
    {
    //    // return  $request->all();
    //     $validator = Validator::make($request->all(), [
    //         "name" => 'required|max:100'
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json([
    //             "status" => 400,
    //             "message" => $validator->messages()
    //         ]);
    //     } else {
    //         $givenBy  = new MhpGivenBy ();
    //         $givenBy ->name = $request->name;
    //         $givenBy ->save();
    //         return response()->json([
    //             "status" => 200,
    //             "message" => "Given By added successfully"
    //         ]);
    //     }
    $validator = Validator::make($request->all(),[
        'name' => 'required|max:100',
    ]);
       

    if ($validator->fails())
    {
        return response()->json([
            'status' => 400,
            'errors' => $validator->messages(),
        ]);

    }else{
        $givenBy = new MhpGivenBy();
        $givenBy->name = $request->name;
        $givenBy->save();

        return response()->json(['status'=>200,'message'=>'Given By Added Successfully']);
    }
    }

    public function edit($id)
    {
        $givenBy  = MhpGivenBy ::find($id);

        return response()->json(["status"=>200,"givenBy"=>$givenBy ]);
    }
    public function update (Request $request, $id) {
        // $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        // if ($validator->fails()) {
        //     return response()->json([
        //         "status" => 400,
        //         "message" => $validator->messages()
        //     ]);
        // } else {
        //     $givenBy  =MhpGivenBy ::find($id);
        //     $givenBy ->name = $request->name;
        //     $givenBy ->save();
        //     return response()->json([
        //         "status" => 200,
        //         "message" => "Given By  updated successfully"
        //     ]);
        // }
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $givenBy=MhpGivenBy::find($id);
            $givenBy->name=$request->name;

            $givenBy->update();

            return response()->json(['status'=>200,'message'=>'Given By Updated Successfully']);
        }
    }

    public function destroy ($id){
        $givenBy  = MhpGivenBy ::find($id);
        $givenBy -> delete_status = 1;
        $givenBy ->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Given By  deleted successfully"
        ]);
    }
}

