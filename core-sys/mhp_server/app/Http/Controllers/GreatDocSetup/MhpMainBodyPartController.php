<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMainBodyPart;
use Illuminate\Support\Facades\Validator;

class MhpMainBodyPartController extends Controller
{
      //

    public function index()
    {
        $MainBodyPart = MhpMainBodyPart::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'MainBodyPart' => $MainBodyPart,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'MainBodyPart_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $MainBodyPart_name = new MhpMainBodyPart();
            $MainBodyPart_name->MainBodyPart_name = $request->MainBodyPart_name;
            $MainBodyPart_name->save();

            return response()->json([
                'status' => 200,
                'message' => 'Main Body Part Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $MainBodyPart= MhpMainBodyPart::find($id);
        if ($MainBodyPart) {
            return response()->json([
                'status' => 200,
                'MainBodyPart' => $MainBodyPart,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Main Body Part Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'MainBodyPart_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $MainBodyPart_name = MhpMainBodyPart::find($id);
            $MainBodyPart_name->MainBodyPart_name = $request->MainBodyPart_name;
            $MainBodyPart_name->update();

            return response()->json([
                'status' => 200,
                'message' => 'Main Body Part Updated Successfully',
            ]);

        }

    }

    public function destroy($id)
    {
        $MainBodyPart_name = MhpMainBodyPart::find($id);
        if ($MainBodyPart_name)
        {
            if ($MainBodyPart_name['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $MainBodyPart_name->delete_status = $delete_status;
            $MainBodyPart_name->save();
            return response()->json([
                'status' => 200,
                'message' => 'Main Body Part deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Main Body Part Found',
            ]);
        }
    }

  

}
