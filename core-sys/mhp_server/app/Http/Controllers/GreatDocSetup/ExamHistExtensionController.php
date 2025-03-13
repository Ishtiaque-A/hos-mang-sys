<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpExamHistExtension;
use App\Models\MhpExamination;
use App\Models\MhpHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamHistExtensionController extends Controller
{
    //

    public function examhistext_dropdown()
    {
        $exam_name = MhpExamination::where('delete_status',0)->orderBy('id','desc')->get();
        $history_name = MhpHistory::where('delete_status',0)->orderBy('id','desc')->get();
        return response([
            'status' => 200,
            'exam_name' =>$exam_name,
            'history_name' =>$history_name,
        ]);
    }

    public function index()
    {
        $history_extension = MhpExamHistExtension::with('examination','history')->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'history_extension' => $history_extension,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'examination_name_id' => 'required',
            'history_name_id' => 'required',
            'extension_code' => 'required|max:100',
            'extension_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $history_extension = new MhpExamHistExtension();
            $history_extension->examination_name_id = $request->examination_name_id;
            $history_extension->history_name_id = $request->history_name_id;
            $history_extension->extension_code = $request->extension_code;
            $history_extension->extension_name = $request->extension_name;
            $history_extension->save();

            return response()->json([
                'status' => 200,
                'message' => 'History Extension Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $history_extension = MhpExamHistExtension::find($id);

        if ($history_extension)
        {
            return response()->json([
                'status' => 200,
                'history_extension' => $history_extension,
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
            'examination_name_id' => 'required',
            'history_name_id' => 'required',
            'extension_code' => 'required|max:100',
            'extension_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $history_extension = MhpExamHistExtension::find($id);
            $history_extension->examination_name_id = $request->examination_name_id;
            $history_extension->history_name_id = $request->history_name_id;
            $history_extension->extension_code = $request->extension_code;
            $history_extension->extension_name = $request->extension_name;
            $history_extension->update();

            return response()->json([
                'status' => 200,
                'message' => 'History Extension Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $history_extension = MhpExamHistExtension::find($id);
        if ($history_extension)
        {
            if ($history_extension['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $history_extension->delete_status = $delete_status;
            $history_extension->save();
            return response()->json([
                'status' => 200,
                'message' => 'History Extension deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No History Extension Found',
            ]);
        }
    }

}
