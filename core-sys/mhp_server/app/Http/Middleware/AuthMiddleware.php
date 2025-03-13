<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class AuthMiddleware
{
    function makeApiCall($method, $url, $headers = [], $body = null)
    {
        $client = new Client();
        try {
            $response = $client->request($method, $url, [
                'headers' => $headers,
                'body' => json_encode($body),
            ]);
            return ['status' => true, 'response' => json_decode($response->getBody(), true)];
        } catch (GuzzleException $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }


    public function handle(Request $request, Closure $next)
    {
        // $serviceUrl = env('SAAS_BASE_URL') . env('SAAS_AUTH_CHECK');
        // $serviceUrl = "https://gdsaasbackend.macrohealthplus.org/api/v1/auth/auth-check";
        // $response = $this->makeApiCall('get', $serviceUrl, $request->header(), $request->all());
        $response = Http::withHeaders([
            'Authorization' => $request->header('Authorization'),
            'Content-Type' => 'application/json', // Set the appropriate content type for your request body
        ])->get(env('SAAS_URL') . '/auth/auth-check');

        if ($response['status'] === 'success') {
            $db = $response['data']['user']['organization']['db_name'];
            Config::set('database.connections.mysql.database', $db);
            app('db')->purge();

            return $next($request);
        }

        return response(json_encode(['status' => false, 'message' => 'Authentication Failed'], 401), 401);
    }
}
