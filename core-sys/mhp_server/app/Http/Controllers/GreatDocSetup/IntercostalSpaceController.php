<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpIntercostalSpace;
use App\Models\MhpSelectionCriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IntercostalSpaceController extends Controller
{
    public function index()
    {
        $intercostal_space = MhpIntercostalSpace::with('selection_criteria')->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'intercostal_space' => $intercostal_space,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'selection_criteria' => 'required',
            'intercostal_space_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $intercostal_space = new MhpIntercostalSpace();
            $intercostal_space->selection_criteria = $request->selection_criteria;
            $intercostal_space->intercostal_space_name = $request->intercostal_space_name;
            $intercostal_space->save();

            return response()->json([
                'status' => 200,
                'message' => 'Intercostal Space Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $intercostal_space = MhpIntercostalSpace::find($id);
        if ($intercostal_space) {
            return response()->json([
                'status' => 200,
                'intercostal_space' => $intercostal_space,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Intercostal Space Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'selection_criteria' => 'required',
            'intercostal_space_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $intercostal_space = MhpIntercostalSpace::find($id);
            $intercostal_space->selection_criteria = $request->selection_criteria;
            $intercostal_space->intercostal_space_name = $request->intercostal_space_name;
            $intercostal_space->update();

            return response()->json([
                'status' => 200,
                'message' => 'Intercostal Space Updated Successfully',
            ]);

        }

    }

    public function destroy($id)
    {
        $intercostal_space = MhpIntercostalSpace::find($id);
        if ($intercostal_space)
        {
            if ($intercostal_space['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $intercostal_space->delete_status = $delete_status;
            $intercostal_space->save();
            return response()->json([
                'status' => 200,
                'message' => 'Intercostal Space deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Intercostal Space Found',
            ]);
        }
    }

    public function selection_criteria_dropdown()
    {
        $selection_criteria = MhpSelectionCriteria::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'selection_criteria' => $selection_criteria,
        ]);
    }
}
