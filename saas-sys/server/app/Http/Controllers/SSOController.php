<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetTokenRequest;
use App\Http\Requests\RedirectTokenRequest;
use App\Models\LoginSession;
use App\Models\User;
use App\Traits\FileProcessingTrait;
use Illuminate\Support\Facades\Auth;

class SSOController extends BaseController {
    //
    use FileProcessingTrait;

    protected function random_alphanumeric($length = 32) {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345689';
        $my_string = '';
        for ($i = 0; $i < $length; $i++) {
            $pos = random_int(0, strlen($chars) - 1);
            $my_string .= substr($chars, $pos, 1);
        }

        return $my_string;
    }

    public function generateToken(RedirectTokenRequest $request) {
        try {
            $data = $request->validated();
            $data['user_id'] = Auth::id();
            $data['created_by'] = Auth::id();
            $data['from_url'] = $request->getHost() ?? '';
            $data['ip'] = request()->ip();
            $data['token'] = $this->random_alphanumeric();
            LoginSession::where('user_id', Auth::id())->delete();
            LoginSession::create($data);

            return $this->successResponse(['token' => $data['token']]);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function validateToken(GetTokenRequest $request) {
        try {
            $data = $request->validated();
            $session = LoginSession::where('token', $data['token'])->where('ip', request()->ip())->first();
            //return  $session;

            $user = User::where('id', $session->user_id)->first();
            $roles = $user->roles->pluck('slug')->all();
            $plainTextToken = $user->createToken('hydra-api-token', $roles)->plainTextToken;
            $user['token'] = $plainTextToken;

            return $this->successResponse(['user' => $user]);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
