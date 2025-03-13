<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Models\User;
use Sandy\ApiResponse\Facades\ApiResponse;

class AppAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        $token = $request->headers->get('token');

        if ($token) {
            $check = User::where('remember_token', $token)->first();
            if (is_null($check)) {
                return response()->json([
                    'message' => 'Token is not valid',
                ], 400);
            }
            return $next($request);
        } else {
            return ApiResponse::error("Token is required");
        }
    }
}
