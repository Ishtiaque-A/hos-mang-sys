<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\MhpUserSelfRegistration;
use App\Models\User;

class UsersController extends Controller
{
    //

    public function user_selfsignup(Request $request)
    {
        // return $request->all();

        $validator = Validator::make($request->all(),[
            'preferred_name' => 'required',
            'mobile_number' => 'required',
            'email_address' => 'required|email',
            'occupation' => 'required',
         ]);
 
         if ($validator->fails())
         {
             return response()->json([
                 'error_msg' => $validator->messages(),
             ]);
         }else{
             $data = new MhpUserSelfRegistration();
             $data->preferred_name = $request->preferred_name;
             $data->mobile_number = $request->mobile_number;
             $data->email_address = $request->email_address;
             $data->occupation = $request->occupation;
             $data->save();
 
             return response()->json([
                 'status' => 200,
                 'message' => 'User Registraion Completed',
             ]);
 
         }


    }
    public function getUser($id) 
    {
        $user = User::find($id);
        return response()->json([
            'user' => $user
        ]);
    }


}
