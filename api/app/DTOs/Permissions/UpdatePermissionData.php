<?php

namespace App\DTOs\Permissions;

readonly class UpdatePermissionData
{
    public function __construct(public ?string $name, public ?string $description = null)
    {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'] ?? null,
            description: $data['description'] ?? null,
        );
    }

}
