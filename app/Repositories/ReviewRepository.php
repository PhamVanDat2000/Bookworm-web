<?php

namespace App\Repositories;

use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReviewRepository extends BaseRepository
{
	protected $query;

	public function __construct()
	{
		$this->query = Review::query();
	}

	public function filterByStar(ReviewRequest $request)
	{
		$_books = $this->query->select('book.id', 'book.book_title')
			->rightjoin('book', 'book.id', '=', 'review.book_id')
			->groupBy('book.id', 'book.book_title')
			->having(DB::raw('Avg(review.rating_start)'), '>=', "{$request->input('rating_start')}")
			->orderByRaw('book.book_title asc');
		return $_books;
	}

	public function sortReviewByDate(ReviewRequest $request)
	{
		$_books = $this->query->selectRaw('review.*')
			->where('review.book_id', '=', "{$request->input('book_id')}")
			->orderByRaw("review.review_date {$request->input('order')}");
		return $_books;
	}

	public function createReview(ReviewRequest $reqest)
	{
		$_review = Review::create(['review_date' => Carbon::now(), ...$reqest->all()]);
		return $_review;
	}
	public function create($data)
	{
		// TODO: Implement create() method.
	}
	public function filter($condition)
	{
		// TODO: Implement filter() method.
	}
	public function getById($id)
	{
		// TODO: Implement getById() method.
	}
	public function update($data)
	{
		// TODO: Implement update() method.
	}
	public function getAll()
	{
		//        return Book::all();
	}
}
