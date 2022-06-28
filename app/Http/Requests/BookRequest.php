<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, mixed>
	 */
	public function rules()
	{
		if (Request()->routeIs('getBookById')) {
			$rules = ['id' => 'required|numeric|exists:book,id'];
		} else {
			$rules = ['total' => 'required|numeric'];
		}
		return $rules;
	}
}
