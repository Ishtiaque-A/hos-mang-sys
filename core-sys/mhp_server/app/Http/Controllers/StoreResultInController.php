<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DoctorInboxStoreResultIn;
use Illuminate\Support\Facades\Validator;
class StoreResultInController extends Controller
{
    public function index()
    {
        $storeResultIn = DoctorInboxStoreResultIn::orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'storeResultIn'=>$storeResultIn]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'store_result_in' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $storeResultIn = new DoctorInboxStoreResultIn();
            $storeResultIn->store_result_in = $request->store_result_in;
            $storeResultIn->save();

            return response()->json(['status'=>200,'message'=>'storeResultIn Added Successfully']);
        }
    }


    public function edit($id)
    {
        $storeResultIn=DoctorInboxStoreResultIn::find($id);
        return response()->json(['status'=>200,'storeResultIn'=>$storeResultIn]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'store_result_in' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_storeResultIn=DoctorInboxStoreResultIn::find($id);
            $update_storeResultIn->store_result_in=$request->store_result_in;

            $update_storeResultIn->update();

            return response()->json(['status'=>200,'message'=>'storeResultIn  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_storeResultIn = DoctorInboxStoreResultIn::find($id);

        if ($del_storeResultIn)
        {
         
            $del_storeResultIn->delete();
            return response()->json([
                'status' => 200,
                'message' => 'storeResultIn  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No storeResultIn  Found',
            ]);
        }


    }
}
