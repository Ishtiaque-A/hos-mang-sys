<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpExamination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use File;

class ExaminationController extends Controller
{


    public function index()
    {
        $examination = MhpExamination::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'examination' => $examination,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'examination_code' => 'required|max:100',
            'examination_name' => 'required|max:100',
            'description' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $examination = new MhpExamination();
            $examination->examination_code = $request->examination_code;
            $examination->examination_name = $request->examination_name;
            $examination->description = $request->description;
            $examination->examination_status = $request->examination_status;
            // $examination->image_icon= $request->image;

               if($request->hasFile('img')){
                $file=$request->file('img');
                $extension=$file->getClientOriginalExtension();
                $filename=time().'.'.$extension;
                $file->move('images/image-icons/',$filename);
              // $examination->image_icon= 'images/image-icons/'.$filename;
              $examination->image_icon= 'images/image-icons/'.$filename;

            }
            $examination->save();

            return response()->json([
                'status' => 200,
                'message' => 'Examination Added Successfully',
            ]);

         

        }

    }

    public function edit($id)
    {
        $examination = MhpExamination::find($id);

        if ($examination)
        {
            return response()->json([
                'status' => 200,
                'examination' => $examination,
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
//        return $request->all();die();
        $validator = Validator::make($request->all(),[
            'examination_code' => 'required|max:100',
            'examination_name' => 'required|max:100',
            'description' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $examination = MhpExamination::find($id);
            $examination->examination_code = $request->examination_code;
            $examination->examination_name = $request->examination_name;
            $examination->description = $request->description;
            $examination->examination_status = $request->examination_status;
            $examination->update();

            return response()->json([
                'status' => 200,
                'message' => 'Examination Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
    
        $examination = MhpExamination::find($id);
        if ($examination)
        {
            if ($examination['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $examination->delete_status = $delete_status;

          
            $examination->save();
            return response()->json([
                'status' => 200,
                'message' => 'Examination deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Examination Found',
            ]);
        }
    }
}
