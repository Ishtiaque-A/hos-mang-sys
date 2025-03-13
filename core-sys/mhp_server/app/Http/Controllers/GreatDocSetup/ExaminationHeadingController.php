<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpExaminationHeading;
use Illuminate\Support\Facades\Validator;

class ExaminationHeadingController extends Controller
{
      //

    public function index()
    {
        $examinationHeading = MhpExaminationHeading::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'examinationHeading' => $examinationHeading,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'examinationHeading_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $examinationHeading_name = new MhpExaminationHeading();
            $examinationHeading_name->examinationHeading_name = $request->examinationHeading_name;
            $examinationHeading_name->save();

            return response()->json([
                'status' => 200,
                'message' => 'Examination Heading Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $examinationHeading= MhpExaminationHeading::find($id);
        if ($examinationHeading) {
            return response()->json([
                'status' => 200,
                'examinationHeading' => $examinationHeading,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Examination Heading Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'examinationHeading_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $examinationHeading_name = MhpExaminationHeading::find($id);
            $examinationHeading_name->examinationHeading_name = $request->examinationHeading_name;
            $examinationHeading_name->update();

            return response()->json([
                'status' => 200,
                'message' => 'Examination Heading Updated Successfully',
            ]);

        }

    }

    public function destroy($id)
    {
        $examinationHeading_name = MhpExaminationHeading::find($id);
        if ($examinationHeading_name)
        {
            if ($examinationHeading_name['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $examinationHeading_name->delete_status = $delete_status;
            $examinationHeading_name->save();
            return response()->json([
                'status' => 200,
                'message' => 'Examination Heading deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Examination Heading Found',
            ]);
        }
    }

   

}
