<?php

namespace App\Helpers;

class Utils
{
    public static function removeEmptyKeys(array $data): array
    {
        if (empty($data)) {
            return [];
        }

        return array_filter($data, fn($value) => !empty($value));
    }

}
