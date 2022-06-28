<?php

namespace App\Repositories;

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

	public function filterByStar($filterStar)
	{
		$books = $this->query->select('book.id', 'book.book_title')
			->rightjoin('book', 'book.id', '=', 'review.book_id')
			->groupBy('book.id', 'book.book_title')
			->having(DB::raw('Avg(review.rating_start)'), '>=', "{$filterStar}")
			->orderByRaw('book.book_title asc');
		return $books;
	}

	public function sortReview($id, $order)
	{
		$books = $this->query->selectRaw('review.*')
			->where('review.book_id', '=', "{$id}")
			->orderByRaw("review.review_date {$order}");
		return $books;
	}

	public function createReview($req)
	{
		$_review = Review::create(['review_date' => Carbon::now(), ...$req->all()]);
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
