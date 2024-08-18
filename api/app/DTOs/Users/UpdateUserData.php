<?php

namespace App\DTOs\Users;

readonly class UpdateUserData
{
    public function __construct(public string $name, public string $email, public ?string $password = null)
    {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            password: $data['password'] ?? null
        );
    }

}
