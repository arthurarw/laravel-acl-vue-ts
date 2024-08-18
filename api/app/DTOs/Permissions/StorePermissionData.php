<?php

namespace App\DTOs\Permissions;

readonly class StorePermissionData
{
    public function __construct(public string $name, public string $route_name, public ?string $description = '')
    {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            route_name: $data['route_name'],
            description: $data['description'] ?? null,
        );
    }

}
