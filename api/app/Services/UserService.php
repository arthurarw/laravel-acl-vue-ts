<?php

namespace App\Services;


use App\DTOs\Users\StoreUserData;
use App\DTOs\Users\UpdateUserData;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserService
{
    public function __construct(protected User $user)
    {
    }

    public function getAll(int $page = 1, int $perPage = 15, string $filter = null): LengthAwarePaginator
    {
        return $this->user->query()->with(['permissions'])->where(function ($query) use ($filter) {
            if (!empty($filter)) {
                $query->where('name', 'LIKE', "%{$filter}%");
            }
        })->paginate($perPage, ['*'], 'page', $page);
    }

    public function store(StoreUserData $data): User
    {
        return $this->user->query()->create((array)$data);
    }

    /**
     * @param string $id
     * @return object
     */
    public function show(string $id): object
    {
        $user = $this->user->query()->where('id', $id)->first();
        if (empty($user)) {
            throw new NotFoundHttpException('User not found');
        }

        return $user;
    }

    /**
     * @param string $id
     * @param UpdateUserData $data
     * @return JsonResponse
     * @throws Exception
     */
    public function update(string $id, UpdateUserData $data): JsonResponse
    {
        try {
            $user = $this->show($id);

            $data = (array)$data;
            if (empty($data['password'])) {
                unset($data['password']);
            }

            $user->update($data);

            return response()->json(['message' => 'User updated successfully']);
        } catch (Exception $e) {
            throw new Exception($e->getMessage() ?? 'Error updating user', $e->getCode() ?? 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        $user = $this->show($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function syncPermissions(string $id, array $data): JsonResponse
    {
        $user = $this->show($id);
        $user->permissions()->sync($data);

        return response()->json(['message' => 'Permissions synchronized successfully']);
    }

    public function userPermissions(string $id)
    {
        return $this->show($id)->permissions()->get();
    }

    public function hasPermission(User $user, string $permission): bool
    {
        if ($user->is_super_admin) {
            return true;
        }

        return $user->permissions()->where('route_name', $permission)->exists();
    }
}
