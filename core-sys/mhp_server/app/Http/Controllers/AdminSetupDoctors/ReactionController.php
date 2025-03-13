<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpReaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReactionController extends Controller
{
    //

    public function index()
    {
        $reaction = MhpReaction::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'reaction' => $reaction,
        ]);
    }

    public function store(Request $request)
    {
//        dd('asdfsdf');
        $validator = Validator::make($request->all(), [
            'reaction_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $reaction = new MhpReaction();
            $reaction->reaction_name = $request->input('reaction_name');
            $reaction->save();

            return response()->json([
                'status' => 200,
                'message' => 'Reaction Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $reaction = MhpReaction::find($id);
        if ($reaction) {
            return response()->json([
                'status' => 200,
                'reaction' => $reaction,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Reaction Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'reaction_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $reaction = MhpReaction::find($id);
            if ($reaction) {
                $reaction->reaction_name = $request->input('reaction_name');
                $reaction->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Reaction Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Reaction Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $reaction = MhpReaction::find($id);
        if ($reaction)
        {
            if ($reaction['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $reaction->delete_status = $delete_status;
            $reaction->save();
            return response()->json([
                'status' => 200,
                'message' => 'Reaction deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Reaction Found',
            ]);
        }

    }

    public function reaction_dropdown()
    {
        $reaction = MhpReaction::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'reaction' => $reaction,
        ]);
    }

}
