<?php

namespace App\Http\Controllers\Appointments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMediaTypeOnline;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Auth;

class MediaTypeOnlineController extends Controller
{
    
    //mobile api media type online

   public function mediaTypeOnline(){
    $mediaTypeOnline=MhpMediaTypeOnline::all();
    return response()->json(['status'=>200,'mediaTypeOnline'=> $mediaTypeOnline]);

   }


}
