<?php

namespace App\Repositories;

use App\Http\Requests\ReviewRequest;
use App\Models\Book;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ReviewRepository extends BaseRepository
{
	protected $query;

	private BookRepository $_bookRepository;
	public function __construct(BookRepository $bookRepository)
	{
		$this->_bookRepository = $bookRepository;
		$this->query = Review::query();
	}

	public function filterByStar(ReviewRequest $request)
	{
		$_getFinalPrice = $this->_bookRepository->getFinalPrice();
		$_books = $this->query
			->rightJoinSub($_getFinalPrice, 'final_price_table', function ($join) {
				$join->on('review.id', '=', 'final_price_table.category_id');
			})
			->groupBy(
				'final_price_table.book_id',
				'final_price_table.book_title',
				'review.id',
				'final_price_table.book_price',
				'final_price_table.book_cover_photo',
				'final_price_table.category_id',
				'final_price_table.author_id',
				'final_price_table.discount_price',
				'final_price_table.author_name',
				'final_price_table.final_price',
				'final_price_table.book_summary'
			)
			->having(DB::raw('Avg(review.rating_start)'), '>=', "{$request->rating_start}")
			->orderByRaw('final_price_table.book_title asc');
		return $_books;
	}
	public function sortReviewByStar(ReviewRequest $request)
	{
		$_review = $this->query->selectRaw('review.*')
			->where('review.book_id', '=', "{$request->book_id}")
			->where('review.rating_start', '=', "{$request->rating_start}")
			->orderByRaw("review.review_date {$request->order}");
		return $_review;
	}
	public function sortReviewByDate(ReviewRequest $request)
	{
		$_review = $this->query->selectRaw('review.*')
			->where('review.book_id', '=', "{$request->book_id}")
			->orderByRaw("review.review_date {$request->order}");
		return $_review;
	}

	public function createReview(ReviewRequest $reqest)
	{
		$_review = Review::create(['review_date' => Carbon::now(), ...$reqest->all()]);
		return $_review;
	}

	public function getStar(ReviewRequest $request)
	{
		$_starCount = Book::query()
			->select('id')
			->where('id', '=', "{$request->book_id}")
			->withCount([
				'reviews as total_star_count',
				'reviews as one_star_count' => function (Builder $query) {
					$query->where('rating_start', 1);
				},
				'reviews as two_star_count' => function (Builder $query) {
					$query->where('rating_start', 2);
				},
				'reviews as three_star_count' => function (Builder $query) {
					$query->where('rating_start', 3);
				},
				'reviews as four_star_count' => function (Builder $query) {
					$query->where('rating_start', 5);
				},
				'reviews as five_star_count' => function (Builder $query) {
					$query->where('rating_start', 5);
				},
			]);
		return $_starCount;
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
