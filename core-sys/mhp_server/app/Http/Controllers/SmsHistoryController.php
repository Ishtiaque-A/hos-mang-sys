<?php

namespace App\Http\Controllers;

use App\Models\SmsHistory;
use Illuminate\Http\Request;

class SmsHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $per_page = $request->per_page ?? 10;
        $page = $request->page ?? 1;
        $search = $request->search ?? null;
        $branch = $request->branch ?? null;
        $data = SmsHistory::when($branch, function ($query) use ($branch) {
            return $query->where('saas_branch_id', $branch);
        })
            ->when($search, function ($query) use ($search) {
                return $query->where('sms_to', 'like', '%' . $search . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate($per_page, ['*'], 'page', $page);
        return response()->json($data);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SmsHistory  $smsHistory
     * @return \Illuminate\Http\Response
     */
    public function show(SmsHistory $smsHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SmsHistory  $smsHistory
     * @return \Illuminate\Http\Response
     */
    public function edit(SmsHistory $smsHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SmsHistory  $smsHistory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SmsHistory $smsHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SmsHistory  $smsHistory
     * @return \Illuminate\Http\Response
     */
    public function destroy(SmsHistory $smsHistory)
    {
        //
    }
}
