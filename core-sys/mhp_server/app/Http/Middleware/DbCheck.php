<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class DbCheck
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
        $dbname = $request->headers->get('databaseName');
        // return response()->json(['message' => $dbname], 400);
        if (is_null($dbname)) {
            return response()->json(['message' => 'Something is missing'], 400);
        }
        Config::set('database.connections.mysql.database', $dbname);
        app('db')->purge();

        return $next($request);
    }
}
