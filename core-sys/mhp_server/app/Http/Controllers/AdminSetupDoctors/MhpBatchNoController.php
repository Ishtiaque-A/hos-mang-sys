<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\MhpBatchNo;
use Illuminate\Support\Facades\Validator;

class MhpBatchNoController extends Controller
{
    public function index()
    {
        $batchNo = MhpBatchNo::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "batchNo" => $batchNo]);
    }

    public function store(Request $request)
    {
       // return  $request->all();
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $batchNo = new MhpBatchNo();
            $batchNo->name = $request->name;
            $batchNo->save();
            return response()->json([
                "status" => 200,
                "message" => "Batch No added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $batchNo = MhpBatchNo::find($id);

        return response()->json(["status"=>200,"batchNo"=>$batchNo]);
    }
    public function update(Request $request, $id) {
            //  return  $request->all();
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $batchNo =MhpBatchNo::find($id);
            $batchNo->name = $request->name;
            $batchNo->save();
            return response()->json([
                "status" => 200,
                "message" => "Batch No updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $batchNo = MhpBatchNo::find($id);
        $batchNo-> delete_status = 1;
        $batchNo->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Batch No deleted successfully"
        ]);
    }
}
