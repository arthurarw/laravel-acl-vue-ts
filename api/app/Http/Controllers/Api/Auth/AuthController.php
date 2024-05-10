<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService)
    {
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        return $this->authService->login($data);
    }

    public function me()
    {
        return new UserResource($this->authService->me());
    }

    public function logout()
    {
        return $this->authService->logout();
    }
}
