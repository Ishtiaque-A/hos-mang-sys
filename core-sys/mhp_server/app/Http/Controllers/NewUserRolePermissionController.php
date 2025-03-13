<?php

namespace App\Http\Controllers;

use App\Models\NewUserRolePermission;
use Illuminate\Http\Request;

class NewUserRolePermissionController extends Controller
{
  public function index($id)
  {
    $permission = NewUserRolePermission::where('user_id', $id)->get();

    return response()->json([
      'permission' => $permission
    ], 201);
  }

  public function store(Request $request)
  {
    // $validate = $request->validate([
    //     "permission_array"=>"required|array",
    //     "permission_array.*.user_id"=>"required",
    //     "permission_array.*.role_id"=>"required",
    //     "permission_array.*.name"=>"required",
    //     "permission_array.*.value"=>"required",
    //     "permission_array.*.validity_date"=>"string",
    // ]);



    foreach ($request['permission_array'] as $item) {
      if (empty($item['value'])) {
        $check = NewUserRolePermission::where(['user_id' => $item['user_id'], 'name' => $item['name']])->first();
        if ($check) {
          $check->delete();
        }
      } else {
        $foundData = NewUserRolePermission::where(['user_id' => $item['user_id'], 'name' => $item['name']])->first();
        if ($foundData) {
          $foundData->name = $item['name'];
          $foundData->value = $item['value'];
          $foundData->save();
        } else {
          $userRole = new NewUserRolePermission();
          $userRole->user_id = $item['user_id'];
          $userRole->role_id = $item['role_id'];
          $userRole->name = $item['name'];
          $userRole->value = $item['value'];
          $userRole->validity_date = $item['validity_date'];
          $userRole->save();
        }
      }
    }


    return response()->json([
      'message' => 'Permission Added Successfully',
    ], 201);
  }
}
