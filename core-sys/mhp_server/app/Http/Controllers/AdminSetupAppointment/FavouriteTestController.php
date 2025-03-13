<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFavouriteTest;
use Validator;

class FavouriteTestController extends Controller
{
    public function index()
    {
        $fav_test = MhpFavouriteTest::orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'fav_test'=>$fav_test]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'favourite_test_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $fav_test = new MhpFavouriteTest();
            $fav_test->favourite_test_name = $request->favourite_test_name;
            $fav_test->save();

            return response()->json(['status'=>200,'message'=>'Favourite Test Added Successfully']);
        }
    }


    public function edit($id)
    {
        $fav_test=MhpFavouriteTest::find($id);
        return response()->json(['status'=>200,'fav_test'=>$fav_test]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'favourite_test_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_fav_test=MhpFavouriteTest::find($id);
            $update_fav_test->favourite_test_name=$request->favourite_test_name;

            $update_fav_test->update();

            return response()->json(['status'=>200,'message'=>'Favourite Test  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_fav_test = MhpFavouriteTest::find($id);
        $del_fav_test->delete();

            return response()->json([
                'status' => 200,
                'message' =>'Favourite Test Deleted Successfully',
            ]);
        }

}
