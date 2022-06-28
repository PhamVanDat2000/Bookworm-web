<?php

namespace App\Repositories;

use App\Http\Requests\BookRequest;
use App\Models\Book;
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
			->join('discount', 'book.id', '=', 'discount.book_id')
			->select('book.id', 'book.book_title', 'book.book_price', 'discount.discount_price')
			->orderByRaw('book.book_price-discount.discount_price DESC');
		return $_books;
	}

	public function getTopBooksRecommended()
	{
		$_book = Book::query()
			->join('review', 'review.book_id', 'book.id')
			->select(
				'book.id',
				'book.book_title',
				DB::raw('AVG(review.rating_start) as avg_rating'),
				DB::raw('case
                                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                                else book.book_price
                            end as final_price')
			)
			->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price')
			->join('discount', 'book.id', 'discount.book_id')
			->orderByRaw('avg_rating desc, final_price asc');
		return $_book;
	}

	public function getTopBooksPopular()
	{
		$_book = Book::query()
			->join('review', 'review.book_id', 'book.id')
			->select(
				'book.id',
				'book.book_title',
				DB::raw('count(review.review_title) as total_review'),
				DB::raw('case
                                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                                else book.book_price
                            end as final_price')
			)
			->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price')
			->join('discount', 'book.id', 'discount.book_id')
			->orderByRaw('total_review desc, final_price asc');
		return $_book;
	}

	//SHOP
	public function sortByOnSale()
	{
		$_books = Book::select(
			'book.id',
			'book.book_title',
			'discount.discount_price',
			'book.book_price',
		)
			->join('discount', function ($join) {
				$join->on('discount.book_id', '=', 'book.id')
					->whereRaw('now() >= discount.discount_start_date')
					->whereRaw('(now() <= discount.discount_end_date or discount.discount_end_date is null)');
			})
			->orderByRaw('book.book_price-discount.discount_price DESC, discount.discount_price ASC');
		return $_books;
	}

	public function sortByPopularity()
	{
		$_getFinalPrice = $this->getFinalPrice();
		return Review::query()->selectRaw('final_price_table.id, count(review.id) as total_review')
			->rightjoinsub($_getFinalPrice, 'final_price_table', function ($join) {
				$join->on('review.book_id', '=', 'final_price_table.id');
			})
			->groupByRaw('final_price_table.id, final_price_table.final_price')
			->orderByRaw('total_review desc, final_price_table.final_price asc');
	}

	public function sortByPrice($order)
	{
		$_getFinalPrice = $this->getFinalPrice();
		return $_getFinalPrice->orderByRaw("final_price {$order}");
	}

	public function getBookById(BookRequest $request)
	{
		$_book = Book::query()->select('book.*', 'author.author_name', 'discount.discount_price')
			->leftjoin('author', 'author.id', '=', 'book.author_id')
			->leftjoin('discount', 'discount.book_id', '=', 'book.id')
			->where('book.id', '=', "{$request->input('id')}");
		return $_book;
	}

	public function getFinalPrice()
	{
		$_book = Book::select(
			'book.id',
			'book.book_title',
			DB::raw('case
                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                else book.book_price
                end as final_price')
		)
			->leftjoin('discount', 'book.id', 'discount.book_id');
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
