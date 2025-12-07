<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArtistRequest extends FormRequest
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
        return [
            'code' => ['required', 'string', 'max:50', 'unique:artists,code'],
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ];
    }
    public function messages(): array
    {
        return [
            'code.required' => 'The Code field is required.',
            'code.unique' => 'The Code has already been taken.',
            'name.required' => 'The Artist name field is required.',
        ];
    }
    public function attributes(): array
    {
        return [
            'code' => 'Code',
            'name' => 'Artist Name',
        ];
    }
}
