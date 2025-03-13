<?php

namespace App\Traits;

use Dflydev\DotAccessData\Data;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

trait ApiCallTrait
{
    public function makeApiCall($method, $url, $headers = [], $body = null)
    {
        $client = new Client;
        try {
            $response = $client->request($method, $url, [
                'headers' => $headers,
                'body' => json_encode($body),
            ]);

            return [
                'status' => true,
                'response' => json_decode($response->getBody(), true)
            ];
        } catch (GuzzleException $e) {
            return ['status' => false, 'response' => $e->getMessage(), 'url' => $url];
        }
    }

    public function sendPostRequest($url, $body)
    {
        $client = new Client;
        $method = 'POST';
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded', // Set the content type to form data
        ];

        try {
            $response = $client->request($method, $url, [
                'headers' => $headers,
                'form_params' => $body, // Use 'form_params' for sending form data
            ]);

            return true;
        } catch (GuzzleException $e) {
            return false;
        }
    }

    public function userEntryTrait($data)
    {
        $data['token'] = env('SERVICE_TOKEN');
        $url = env('SERVICE_URL') . 'api/register';

        return $this->sendPostRequest($url, $data);
    }

    public function userUpdateTrait($data, $id)
    {
        $data['token'] = env('SERVICE_TOKEN');
        $url = env('SERVICE_URL') . 'api/user/' . $id;

        return $this->sendPostRequest($url, $data);
    }
}
