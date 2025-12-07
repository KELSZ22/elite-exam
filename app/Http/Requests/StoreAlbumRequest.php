<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlbumRequest extends FormRequest
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
            'artist_id' => 'required|exists:artists,id',
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'sales' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'artist_id.required' => 'Please select an artist.',
            'artist_id.exists' => 'The selected artist is invalid.',
            'name.required' => 'Please enter an album title.',
            'year.required' => 'Please enter a release year.',
            'year.integer' => 'The year must be a valid number.',
            'year.min' => 'The year must be at least 1900.',
            'year.max' => 'The year cannot be in the future.',
        ];
    }
}
