<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use App\Services\UserService;
use Illuminate\Http\Request;

class PermissionUserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }

    public function syncUserPermissions(string $user, Request $request)
    {
        return $this->userService->syncPermissions($user, $request->permissions);
    }

    public function userPermissions(string $user)
    {
        return PermissionResource::collection($this->userService->userPermissions($user));
    }
}
