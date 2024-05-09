<?php

namespace App\Http\Controllers\Api;

use App\DTOs\Users\StorePermissionData;
use App\DTOs\Users\UpdatePermissionData;
use App\Helpers\Pagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = Pagination::getResultsPerPage(15);
        $page = Pagination::getPage();

        $users = $this->userService->getAll(
            page: $page,
            perPage: $perPage,
            filter: $request->get('filter', '')
        );
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $users = StorePermissionData::fromRequest($data);
        return new UserResource($this->userService->store($users));
    }

    /**
     * Display the specified resource.
     * @throws Exception
     */
    public function show(string $user)
    {
        return new UserResource($this->userService->show($user));
    }

    /**
     * Update the specified resource in storage.
     * @throws Exception
     */
    public function update(UpdateUserRequest $request, string $user)
    {
        $data = $request->validated();
        return $this->userService->update($user, UpdatePermissionData::fromRequest($data));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $user)
    {
        return $this->userService->destroy($user);
    }
}
