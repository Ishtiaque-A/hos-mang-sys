<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class LogActivity
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Log activity for authenticated users
        if (Auth::check()) {
            $user = Auth::user();
            $logName = 'user_activity'; // Set your desired log name

            // Log the activity
            activity()
                ->causedBy($user)
                ->log("Viewed: {$request->url()}")
                ->useLog($logName);
        }

        return $response;
    }
}
