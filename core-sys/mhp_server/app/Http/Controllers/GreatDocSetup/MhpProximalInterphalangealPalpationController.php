<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpProximalInterphalangealPalpation;
use Illuminate\Support\Facades\Validator;

class MhpProximalInterphalangealPalpationController extends Controller
{
    //
    public function index()
    {
        $proximalInterphalangealPalpation = MhpProximalInterphalangealPalpation::where('delete_status', 0)->orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'proximalInterphalangealPalpation' => $proximalInterphalangealPalpation]
        );
    }



    public function store(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|max:100',

            ],
            // ['status_id.required' => 'Status field is required!'] 
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $proximalInterphalangealPalpation = new MhpProximalInterphalangealPalpation();
            $proximalInterphalangealPalpation->name = $request->name;

            $proximalInterphalangealPalpation->save();

            return response()->json(['status' => 200, 'message' => 'Proximal Interphalangeal Joint Palpation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $proximalInterphalangealPalpation = MhpProximalInterphalangealPalpation::find($id);
        return response()->json(['status' => 200, 'proximalInterphalangealPalpation' => $proximalInterphalangealPalpation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|max:100',


            ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $update_proximalInterphalangealPalpation = MhpProximalInterphalangealPalpation::find($id);
            $update_proximalInterphalangealPalpation->name = $request->name;
            $update_proximalInterphalangealPalpation->update();

            return response()->json(['status' => 200, 'message' => 'Proximal Interphalangeal Joint Palpation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_proximalInterphalangealPalpation = MhpProximalInterphalangealPalpation::find($id);
        $del_proximalInterphalangealPalpation->delete_status = 1;
        $del_proximalInterphalangealPalpation->save();
        return response()->json([
            'status' => 200,
            'message' => 'Proximal Interphalangeal Joint Palpation deleted successfully',
        ]);
    }
}

