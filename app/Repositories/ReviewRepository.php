<?php

namespace App\Repositories;

use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Carbon\Carbon;
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
				'final_price_table.final_price'
			)
			->having(DB::raw('Avg(review.rating_start)'), '>=', "{$request->input('rating_start')}")
			->orderByRaw('final_price_table.book_title asc');
		return $_books;


		// $_getFinalPrice = $this->_bookRepository->getFinalPrice();
		// $_books = DB::table(
		// 	function ($query) use ($request) {
		// 		$query
		// 			->select('review.book_id', 'review.id')
		// 			->groupBy('review.book_id', 'review.id')
		// 			->from('review')
		// 			->having(DB::raw('Avg(review.rating_start)'), '>=', "{$request->input('rating_start')}");
		// 	},
		// 	't1'
		// )
		// 	->rightJoinSub($_getFinalPrice, 'final_price_table', function ($join) {
		// 		$join->on('t1.book_id', '=', 'final_price_table.book_id');
		// 	})
		// 	->orderByRaw('final_price_table.book_title asc');
		// return $_books;
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
