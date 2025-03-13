<?php

namespace App\Http\Controllers;

use App\Models\SocialMedialAccount;
use Illuminate\Http\Request;

class SocialMedialAccountController extends Controller
{

    public function index($id, $branchId = null)
    {
        $query = SocialMedialAccount::where('user_id', $id);

        if ($branchId !== null && $branchId !== 'null') {
            // Check if $branchId is not null and not the string 'null'
            $query->where('saas_branch_id', $branchId);
        }

        $socialMediaAccounts = $query->get();
        return response()->json(['data' => $socialMediaAccounts], 200);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'url' => 'required',
            'user_id' => 'required',
            'user_type' => 'required',
        ]);

        $data = new SocialMedialAccount();
        $data->name = $validate['name'];
        $data->url = $validate['url'];
        $data->user_id = $validate['user_id'];
        $data->user_type = $validate['user_type'];
        $data->save();

        return response()->json(['message' => "Data save sucessfully"], 201);
    }

    public function update(Request $request, $id)
    {
        $data = SocialMedialAccount::where('id', $id)->first();
        $data->url = $request->url;
        $data->update();
        return response()->json(['data' => $data], 201);
    }

    public function delete($id)
    {
        $data = SocialMedialAccount::where('id', $id)->first();
        $data->delete();
        return response()->json(['message' => 'Data deleted sucessfully'], 201);
    }
}
