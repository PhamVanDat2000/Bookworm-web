<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
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

		if (Request()->routeIs('loginUser')) {
			$rules = [
				'email' => 'required|email',
				'password' => 'required|string',
			];
		}
		if (Request()->routeIs('registerUser')) {
			$rules = [
				'email' => 'required|email|unique:user',
				'first_name' => 'required|string',
				'last_name' => 'required|string',
			];
		}
		return $rules;
	}
}
