<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use App\Models\MhpUsualAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsualAccountController extends Controller
{
    //
    public function index()
    {
        $usual_account = MhpUsualAccount::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'usual_account' => $usual_account,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usual_account_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $usual_account = new MhpUsualAccount();
            $usual_account->usual_account_name = $request->input('usual_account_name');
            $usual_account->save();

            return response()->json([
                'status' => 200,
                'message' => 'Usual Account Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $usual_account = MhpUsualAccount::find($id);
        if ($usual_account) {
            return response()->json([
                'status' => 200,
                'usual_account' => $usual_account,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Usual Account Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
//        dd('asdfsdfsdfdsf');
        $validator = Validator::make($request->all(), [
            'usual_account_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $usual_account = MhpUsualAccount::find($id);
            if ($usual_account) {
                $usual_account->usual_account_name = $request->input('usual_account_name');
                $usual_account->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Usual Account Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Usual Account Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $states = MhpUsualAccount::find($id);
        if ($states)
        {
            if ($states['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $states->delete_status = $delete_status;
            $states->save();
            return response()->json([
                'status' => 200,
                'message' => 'Usual Account deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Usual Account Found',
            ]);
        }

    }

    public function usual_account_dropdown()
    {
        $usual_account = MhpUsualAccount::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'usual_account' => $usual_account,
        ]);
    }
}
