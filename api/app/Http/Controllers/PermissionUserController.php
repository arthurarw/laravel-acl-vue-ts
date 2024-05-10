<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class PermissionUserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }

    public function syncUserPermissions(string $user, Request $request)
    {
        return $this->userService->syncPermissions($user, $request->all());
    }
}
