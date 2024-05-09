<?php

namespace App\Services;

use App\DTOs\Permissions\StorePermissionData;
use App\DTOs\Permissions\UpdatePermissionData;
use App\Models\Permission;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PermissionService
{
    public function __construct(protected Permission $permission)
    {
    }

    public function getAll(int $page = 1, int $perPage = 15, string $filter = ''): LengthAwarePaginator
    {
        return $this->permission->query()->where(function ($query) use ($filter) {
            if (!empty($filter)) {
                $query->where('name', 'LIKE', "%{$filter}%");
            }
        })->paginate($perPage, ['*'], 'page', $page);
    }

    public function store(StorePermissionData $data): Permission
    {
        return $this->permission->query()->create((array)$data);
    }

    /**
     * @param string $id
     * @return object
     */
    public function show(string $id): object
    {
        $user = $this->permission->query()->where('id', $id)->first();
        if (empty($user)) {
            throw new NotFoundHttpException('Permission not found');
        }

        return $user;
    }

    /**
     * @param string $id
     * @param UpdatePermissionData $data
     * @return JsonResponse
     * @throws Exception
     */
    public function update(string $id, UpdatePermissionData $data): JsonResponse
    {
        try {
            $permission = $this->show($id);
            $data = (array)$data;

            if (empty($data['name'])) {
                unset($data['name']);
            }

            if (empty($data['description'])) {
                unset($data['description']);
            }

            $permission->update($data);
            return response()->json(['message' => 'Permission updated successfully']);
        } catch (Exception $e) {
            throw new Exception($e->getMessage() ?? 'Error updating permission', $e->getCode() ?? 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        $permission = $this->show($id);
        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully']);
    }
}
