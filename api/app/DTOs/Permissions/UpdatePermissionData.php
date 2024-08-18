<?php

namespace App\DTOs\Permissions;

readonly class UpdatePermissionData
{
    public function __construct(public ?string $name, public ?string $route_name, public ?string $description = null)
    {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'] ?? null,
            route_name: $data['route_name'] ?? null,
            description: $data['description'] ?? null,
        );
    }

}
