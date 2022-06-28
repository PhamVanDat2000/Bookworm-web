<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
		return [
			'user_id' => 'required|numeric|exists:user,id',
			'order_amount' => 'required|numeric|between:0.00,99999999.99',
			'products.*.book_id' => 'required|numeric|exists:book,id',
			'products.*.quantity' => 'required|numeric|between:1,8',
			'products.*.price' => 'required|numeric|between:0.00,99999.99',
		];
	}
}
