<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\PermissionUserController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => response()->json(['message' => 'OK!!']));
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

Route::middleware(['auth:sanctum', 'canAccess'])->group(function () {
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/users/{user}/permissions', [PermissionUserController::class, 'userPermissions'])
        ->name('users.permissions');
    Route::post('/users/{user}/permissions/sync', [PermissionUserController::class, 'syncUserPermissions'])
        ->name('users.permissions.sync');


    Route::apiResource('/permissions', PermissionController::class);

    Route::get('/me', [AuthController::class, 'me'])->name('auth.me');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

