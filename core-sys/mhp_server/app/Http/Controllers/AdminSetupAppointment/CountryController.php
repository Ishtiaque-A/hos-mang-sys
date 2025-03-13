<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CountryController extends Controller
{
    //
    public function index()
    {
        $country = MhpCountry::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'country' => $country,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'country_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $country = new MhpCountry();
            $country->country_name = $request->country_name;
            $country->save();

            return response()->json([
                'status' => 200,
                'message' => 'Country Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $country = MhpCountry::find($id);

        if ($country)
        {
            return response()->json([
                'status' => 200,
                'country' => $country,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'country_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $country = MhpCountry::find($id);
            $country->country_name = $request->country_name;
            $country->update();

            return response()->json([
                'status' => 200,
                'message' => 'Country Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $country = MhpCountry::find($id);
        if ($country)
        {
            if ($country['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $country->delete_status = $delete_status;
            $country->save();
            return response()->json([
                'status' => 200,
                'message' => 'Country deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Country Found',
            ]);
        }
    }
}
