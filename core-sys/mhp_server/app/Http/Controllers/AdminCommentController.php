<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Admin;
use App\Models\AdminComment;
use Illuminate\Http\Request;

class AdminCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return response()->json($request->all(), 400);
        $validate = $request->validate([
            'user_id' => 'required',
            'user_name' => 'required',
            'comment' => 'required',
        ]);
        $validate['reminder'] = $request->reminder;
        // return $validate;
        $data = AdminComment::create($validate);
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AdminComment  $adminComment
     * @return \Illuminate\Http\Response
     */
    public function show(AdminComment $adminComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AdminComment  $adminComment
     * @return \Illuminate\Http\Response
     */
    public function edit(AdminComment $adminComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AdminComment  $adminComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AdminComment $adminComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AdminComment  $adminComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(AdminComment $adminComment)
    {
        //
    }
}
