<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserRoleController extends BaseController {
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\User  $user
     * @return \App\Models\User  $user
     */
    public function index(User $user) {
        return $user->load('roles');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \App\Models\User  $user
     */
    public function store(Request $request, User $user) {
        $data = $request->validate([
            'role_id' => 'required|integer',
        ]);
        $role = Role::find($data['role_id']);
        if (! $user->roles()->find($data['role_id'])) {
            $user->roles()->attach($role);
        }

        return $user->load('roles');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Role  $role
     * @return \App\Models\User  $user
     */
    public function destroy(User $user, Role $role) {
        $user->roles()->detach($role);

        return $user->load('roles');
    }
}
