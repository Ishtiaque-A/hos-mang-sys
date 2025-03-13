<?php

namespace App\Http\Controllers;

use App\Models\AppointmantComment;
use Illuminate\Http\Request;

class AppointmantCommentController extends Controller
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
        $exist = AppointmantComment::where(['id' => $request->id])->first();
        if ($exist) {
            $exist->comment = $request->comment;
            $exist->save();
            return response()->json([
                "status" => 200,
                "message" => "Comment Updated Successfully "
            ]);
        } else {
            $comment = new AppointmantComment();
            $comment->appointment_id = $request->appointment_id;
            $comment->appointment_request_id = $request->appointment_request_id;
            $comment->comment = $request->comment;
            $comment->save();
            return response()->json([
                "status" => 200,
                "message" => "Comment Added Successfully "
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AppointmantComment  $appointmantComment
     * @return \Illuminate\Http\Response
     */
    public function show(AppointmantComment $appointmantComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AppointmantComment  $appointmantComment
     * @return \Illuminate\Http\Response
     */
    public function edit(AppointmantComment $appointmantComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AppointmantComment  $appointmantComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AppointmantComment $appointmantComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AppointmantComment  $appointmantComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(AppointmantComment $appointmantComment)
    {
        //
    }
}
