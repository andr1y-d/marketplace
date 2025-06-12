<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
      'title' => 'required|string|max:50',
      'category' => 'required|string|max:50',
      'ownerId' => 'integer|exists:users,id',
      'description' => 'required|string|max:1500',
      'photos.*' => 'string',
      'location' => 'string',
      'price' => 'required|numeric|min:0',
    ];
  }
}