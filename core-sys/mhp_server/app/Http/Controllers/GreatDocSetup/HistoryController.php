<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HistoryController extends Controller
{
    //

    public function index()
    {
        $history = MhpHistory::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'history' => $history,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'history_code' => 'required|max:100',
            'history_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $history = new MhpHistory();
            $history->history_code = $request->history_code;
            $history->history_name = $request->history_name;
            $history->save();

            return response()->json([
                'status' => 200,
                'message' => 'History Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $history = MhpHistory::find($id);

        if ($history)
        {
            return response()->json([
                'status' => 200,
                'history' => $history,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No History Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'history_code' => 'required|max:100',
            'history_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $history = MhpHistory::find($id);
            $history->history_code = $request->history_code;
            $history->history_name = $request->history_name;
            $history->update();

            return response()->json([
                'status' => 200,
                'message' => 'History Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $history = MhpHistory::find($id);
        if ($history)
        {
            if ($history['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $history->delete_status = $delete_status;
            $history->save();

            return response()->json([
                'status' => 200,
                'message' => 'History deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No History Found',
            ]);
        }
    }

}
