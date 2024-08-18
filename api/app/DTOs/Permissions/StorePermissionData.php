<?php

namespace App\DTOs\Permissions;

readonly class StorePermissionData
{
    public function __construct(public string $name, public string $routeName, public ?string $description = '')
    {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            routeName: $data['route_name'],
            description: $data['description'] ?? null,
        );
    }

}
