<?php

namespace App\Http\Requests\Permissions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $permissionId = $this->route('permission');
        return [
            'name' => ['nullable', 'string', 'max:255', Rule::unique('permissions')->ignore($permissionId)],
            'route_name' => ['nullable', 'string', 'max:255', Rule::unique('permissions')->ignore($permissionId)],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }
}
