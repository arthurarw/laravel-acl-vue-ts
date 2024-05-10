<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(protected User $user)
    {
    }

    public function login(array $data): JsonResponse
    {
        $user = User::query()->where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user->tokens()->delete();
        $token = $user->createToken($data['device_name'])->plainTextToken;
        return response()->json(['token' => $token]);
    }

    public function me()
    {
        $user = Auth::user();
        $user->load('permissions');
        return $user;
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
