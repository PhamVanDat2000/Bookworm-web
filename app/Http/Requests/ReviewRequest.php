<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReviewRequest extends FormRequest
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
		$rules = ['book_id' => 'required|numeric|exists:book,id|'];
		if (request()->routeIs('filterByStar')) {
			$rules = ['rating_start' => 'required|numeric|between:1,5'];
		} elseif (request()->routeIs('sortReview')) {
			$rules = [
				...$rules,
				'order' => [
					'required',
					Rule::in(['desc', 'asc'])
				]
			];
		} elseif (request()->routeIs('createReview')) {
			$rules = [
				...$rules,
				'review_title' => 'required|string|max:120',
				'review_details' => 'required|string',
				'rating_start' => 'required|numeric|between:1,5',
			];
		}
		return $rules;
	}
}
