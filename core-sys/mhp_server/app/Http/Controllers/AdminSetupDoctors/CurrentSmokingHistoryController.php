<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCurrentSmokingHistory;
use Illuminate\Support\Facades\Validator;

class CurrentSmokingHistoryController extends Controller
{
    //

    public function index()
    {
        $current_smoking_histories = MhpCurrentSmokingHistory::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'current_smoking_histories' => $current_smoking_histories,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'current_smoking_histories_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpCurrentSmokingHistory();
            $data->current_smoking_histories_name = $request->current_smoking_histories_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Current Smoking History Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $current_smoking_histories = MhpCurrentSmokingHistory::find($id);

        if ($current_smoking_histories)
        {
            return response()->json([
                'status' => 200,
                'current_smoking_histories' => $current_smoking_histories,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Current Smoking History Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpCurrentSmokingHistory::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'current_smoking_histories_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->current_smoking_histories_name = $request->current_smoking_histories_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Current Smoking History Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Current Smoking History Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $current_smoking_histories = MhpCurrentSmokingHistory::find($id);
        if ($current_smoking_histories)
        {
            if ($current_smoking_histories['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $current_smoking_histories->delete_status = $delete_status;
            $current_smoking_histories->save();
            return response()->json([
                'status' => 200,
                'message' => 'Current Smoking History deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Current Smoking History Found',
            ]);
        }
    }

}
