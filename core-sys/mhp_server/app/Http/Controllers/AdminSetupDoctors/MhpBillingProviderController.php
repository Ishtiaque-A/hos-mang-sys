<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpBillingProvider;
use Illuminate\Support\Facades\Validator;

class MhpBillingProviderController extends Controller
{
    public function index()
    {
        $billingProvider = MhpBillingProvider::where('delete_status', 0)->orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "billingProvider" => $billingProvider]);
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
            $billingProvider = new MhpBillingProvider();
            $billingProvider->name = $request->name;
            $billingProvider->save();
            return response()->json([
                "status" => 200,
                "message" => "Billing Provider added successfully"
            ]);
        }
    }

    public function edit($id)
    {
        $billingProvider = MhpBillingProvider::find($id);

        return response()->json(["status"=>200,"billingProvider"=>$billingProvider]);
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), ["name" => 'required|max:100']);
        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "message" => $validator->messages()
            ]);
        } else {
            $billingProvider =MhpBillingProvider::find($id);
            $billingProvider->name = $request->name;
            $billingProvider->save();
            return response()->json([
                "status" => 200,
                "message" => "Billing Provider updated successfully"
            ]);
        }
    }

    public function destroy ($id){
        $billingProvider = MhpBillingProvider::find($id);
        $billingProvider-> delete_status = 1;
        $billingProvider->update();
        return response()->json([
            "status"=> 200,
            "message"=> "Billing Provider deleted successfully"
        ]);
    }
}
