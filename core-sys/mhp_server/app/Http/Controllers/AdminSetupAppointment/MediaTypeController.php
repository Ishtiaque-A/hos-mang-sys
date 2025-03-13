<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\MhpMediaType;

class MediaTypeController extends Controller
{
      public function index()
    {
        $media_type = MhpMediaType::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'media_type' => $media_type,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'media_type_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $media_type = new MhpMediaType();
            $media_type->media_type_name = $request->input('media_type_name');
            $media_type->save();

            return response()->json([
                'status' => 200,
                'message' => 'Media Type Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $media_type = MhpMediaType::find($id);
        if ($media_type) {
            return response()->json([
                'status' => 200,
                'media_type' => $media_type,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Media Type Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'media_type_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $media_type = MhpMediaType::find($id);
            if ($media_type) {
                $media_type->media_type_name = $request->input('media_type_name');
                $media_type->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Media Type Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Media Type Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $media_type = MhpMediaType::find($id);
        if ($media_type)
        {
            if ($media_type['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $media_type->delete_status = $delete_status;
            $media_type->save();
            return response()->json([
                'status' => 200,
                'message' => 'Media Type deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Media Type Found',
            ]);
        }
    }

}
