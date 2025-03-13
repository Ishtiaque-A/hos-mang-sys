<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpUsualProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsualProviderController extends Controller
{
    //
    public function index()
    {
        $usual_provider = MhpUsualProvider::where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'usual_provider' => $usual_provider,
        ]);
    }

    public function store(Request $request)
    {
        //        dd('asdfsdf');
        $validator = Validator::make($request->all(), [
            'usual_provider_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $usual_provider = new MhpUsualProvider();
            $usual_provider->usual_provider_name = $request->input('usual_provider_name');
            $usual_provider->address = $request->input('address');
            $usual_provider->mobile = $request->input('mobile');
            $usual_provider->phone = $request->input('phone');
            $usual_provider->email = $request->input('email');
            $usual_provider->save();

            return response()->json([
                'status' => 200,
                'message' => 'Usual Provider Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $usual_provider = MhpUsualProvider::find($id);
        if ($usual_provider) {
            return response()->json([
                'status' => 200,
                'usual_provider' => $usual_provider,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No City Id Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        //        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'usual_provider_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $usual_provider = MhpUsualProvider::find($id);
            if ($usual_provider) {
                $usual_provider->usual_provider_name = $request->input('usual_provider_name');
                $usual_provider->address = $request->input('address');
                $usual_provider->mobile = $request->input('mobile');
                $usual_provider->phone = $request->input('phone');
                $usual_provider->email = $request->input('email');
                $usual_provider->save();
                $usual_provider->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Usual Provider Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Usual Provider Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $usual_provider = MhpUsualProvider::find($id);
        $usual_provider->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Usual Provider Deleted Successfully',
        ]);
    }

    public function usual_provider_dropdown()
    {
        $usual_provider = MhpUsualProvider::where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'usual_provider' => $usual_provider,
        ]);
    }
}
