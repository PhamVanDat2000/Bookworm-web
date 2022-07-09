<?php

namespace App\Repositories;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use PHPUnit\TextUI\XmlConfiguration\Group;

class BookRepository extends BaseRepository
{
	protected $query;
	public function __construct()
	{
		$this->query = Book::query();
	}
	//HOME
	public function getTopBooksDiscount()
	{
		$_books = $this->query
			->select('book.id as book_id', 'book.book_title', 'book.book_cover_photo', 'author.author_name', 'book.book_price', 'discount.discount_price')
			->join('discount', 'book.id', '=', 'discount.book_id')
			->leftjoin('author', 'author.id', '=', 'book.author_id')
			->orderByRaw('book.book_price-discount.discount_price DESC');
		return $_books;
	}

	public function getTopBooksRecommended()
	{
		$_book = Book::query()
			->select(
				'book.id as book_id',
				'book.book_title',
				'book.book_price',
				'book.book_cover_photo',
				'discount.discount_price',
				'author.author_name',
				DB::raw('AVG(review.rating_start) as avg_rating'),
				DB::raw('case
							when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
							else book.book_price
						end as final_price')
			)
			->join('review', 'review.book_id', 'book.id')
			->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price', 'author.author_name')
			->join('discount', 'book.id', 'discount.book_id')
			->leftjoin('author', 'author.id', '=', 'book.author_id')
			->orderByRaw('avg_rating desc, final_price asc');
		return $_book;
	}

	public function getTopBooksPopular()
	{
		$_book = Book::query()
			->join('review', 'review.book_id', 'book.id')
			->select(
				'book.id as book_id',
				'book.book_title',
				'book.book_price',
				'book.book_cover_photo',
				'discount.discount_price',
				'author.author_name',
				DB::raw('count(review.review_title) as total_review'),
				DB::raw('case
                                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                                else book.book_price
                            end as final_price')
			)
			->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price', 'author.author_name')
			->join('discount', 'book.id', 'discount.book_id')
			->leftjoin('author', 'author.id', '=', 'book.author_id')
			->orderByRaw('total_review desc, final_price asc');
		return $_book;
	}

	//SHOP
	public function sortByOnSale()
	{
		$_getFinalPrice = $this->getFinalPrice();
		$_books = $_getFinalPrice
			->join('discount', 'discount.discount_price', '=', 'final_price_table.final_price')
			->orderByRaw('final_price_table.book_price-final_price_table.discount_price DESC, final_price_table.discount_price ASC');
		return $_books;
	}

	public function sortByPopularity()
	{
		$_getFinalPrice = $this->getFinalPrice();
		$_topReview = DB::table(function ($query) {
			$query->selectRaw('book.id, count(review.id) as total_review')
				->rightJoin('book', 'book.id', '=', 'review.book_id')
				->from('review')
				->groupBy('book.id');
		}, 'review_top_table');

		$_books =  $_getFinalPrice->selectRaw('final_price_table.*')
			->leftJoinSub($_topReview, 'review_top_table', function ($join) {
				$join->on('review_top_table.id', '=', 'final_price_table.book_id');
			})
			->orderByRaw('review_top_table.total_review desc, final_price_table.final_price asc');
		return $_books;
	}

	public function sortByPrice($order = 'asc')
	{
		$_getFinalPrice = $this->getFinalPrice();
		return $_getFinalPrice->orderByRaw("final_price {$order}");
	}

	public function getBookById(BookRequest $request)
	{
		$_getFinalPrice = $this->getFinalPrice();
		$_book = $_getFinalPrice
			->select('final_price_table.*', 'category.category_name')
			->where('book_id', $request->id)
			->join('category', 'final_price_table.category_id', 'category.id');
		return $_book;
	}
	public function getFinalPrice()
	{
		$_book = DB::table(function ($query) {
			$query->select(
				'book.id as book_id',
				'book.book_title',
				'book.book_price',
				'book.book_cover_photo',
				'book.book_summary',
				'book.category_id',
				'book.author_id',
				'discount.discount_price',
				'author.author_name',
				DB::raw('case
                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                else book.book_price
                end as final_price')
			)

				->from('book')
				->leftjoin('discount', 'book.id', 'discount.book_id')
				->leftjoin('author', 'author.id', '=', 'book.author_id');
		}, 'final_price_table');
		return $_book;
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
