<?php

namespace App\Http\Middleware;

use App\Services\UserService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    public function __construct(protected UserService $userService)
    {
    }

    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $routeName = Route::currentRouteName();
        $user = $request->user();

        if (!$this->userService->hasPermission($user, $routeName)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
