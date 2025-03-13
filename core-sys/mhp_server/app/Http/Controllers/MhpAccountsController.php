<?php

namespace App\Http\Controllers;

use App\Models\MhpAccounts;
use App\Models\MhpAccountsType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MhpAccountsController extends Controller
{
    //all acounts
    public function index()
    {
        $data = MhpAccounts::orderBy('id','desc')->get();

        return response()->json([
            'status' => 200,
            'accounts' => $data,
            "message" => "Accounts"
        ]);
    }

    
    public function create(Request $request)        
    {
        $data = new MhpAccounts();
        $data->name = $request->name;
        $data->save();

        return response()->json([
            'status' => 200,
            'data' => $data,
            "message" => "Accounts data added successfully"
        ]);

    }

    
    public function edit($id)
    {
        $data = MhpAccounts::find($id);
        return response()->json([
            'status' => 200,
            'account' => $data,
        ]);
    }

   
    public function update(Request $request,$id)
    {
        $data =  MhpAccounts::find($id);
        $data->name = $request->name;
        $data->update();

        return response()->json([
            'status' => 200,
            'data' => $data,
            "message" => "Accounts data updated successfully"
        ]);
    }

    
    public function destroy($id)
    {
        $data = MhpAccounts::find($id);
        $data->delete();

        return response()->json([
            'status' => 200,    
            "message" => "Accounts data deleted successfully",
        ]);
    }
    // all accounts
    //all acounts type
    public function index_accounts_type()
    {
        $data = MhpAccountsType::with('account')->orderBy('id','desc')->get();

        return response()->json([
            'status' => 200,
            'accounts' => $data,
            "message" => "Accounts"
        ]);
    }
    public function accounts_type_by_id($id)
    {
        $data = MhpAccountsType::where('accounts_id', $id)->orderBy('id','desc')->get();

        return response()->json([
            'status' => 200,
            'accounts' => $data,
            "message" => "Accounts"
        ]);
    }

    
    public function create_accounts_type(Request $request)        
    {
        $data = new MhpAccountsType();
        $data->name = $request->name;
        $data->accounts_id = $request->accounts_id;
        $data->save();

        return response()->json([
            'status' => 200,
            'data' => $data,
            "message" => "Accounts data added successfully"
        ]);

    }

    
    public function edit_accounts_type($id)
    {
        $data = MhpAccountsType::find($id);
        return response()->json([
            'status' => 200,
            'account' => $data,
        ]);
    }

   
    public function update_accounts_type(Request $request,$id)
    {
        $data =  MhpAccountsType::find($id);
        $data->name = $request->name;
        $data->accounts_id = $request->accounts_id;
        $data->update();

        return response()->json([
            'status' => 200,
            'data' => $data,
            "message" => "Accounts data updated successfully"
        ]);
    }

    
    public function destroy_accounts_type($id)
    {
        $data = MhpAccountsType::find($id);
        $data->delete();

        return response()->json([
            'status' => 200,    
            "message" => "Accounts data deleted successfully",
        ]);
    }
    // all accounts type
}
