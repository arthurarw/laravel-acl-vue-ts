<?php

namespace App\Http\Controllers\Api;

use App\DTOs\Permissions\StorePermissionData;
use App\DTOs\Permissions\UpdatePermissionData;
use App\Helpers\Pagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Permissions\StorePermissionRequest;
use App\Http\Requests\Permissions\UpdatePermissionRequest;
use App\Http\Resources\PermissionResource;
use App\Services\PermissionService;
use Exception;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct(protected PermissionService $permissionService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = Pagination::getResultsPerPage(15);
        $page = Pagination::getPage();

        $permissions = $this->permissionService->getAll(
            page: $page,
            perPage: $perPage,
            filter: $request->get('filter', '')
        );
        return PermissionResource::collection($permissions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        $data = $request->validated();
        $permissions = StorePermissionData::fromRequest($data);
        return new PermissionResource($this->permissionService->store($permissions));
    }

    /**
     * Display the specified resource.
     * @throws Exception
     */
    public function show(string $permission)
    {
        return new PermissionResource($this->permissionService->show($permission));
    }

    /**
     * Update the specified resource in storage.
     * @throws Exception
     */
    public function update(UpdatePermissionRequest $request, string $permission)
    {
        $data = $request->validated();
        return $this->permissionService->update($permission, UpdatePermissionData::fromRequest($data));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $permission)
    {
        return $this->permissionService->destroy($permission);
    }
}
