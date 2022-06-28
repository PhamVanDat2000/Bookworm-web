<?php

namespace App\Repositories;

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
		$books = $this->query
			->join('discount', 'book.id', '=', 'discount.book_id')
			->select('book.id', 'book.book_title', 'book.book_price', 'discount.discount_price')
			->orderByRaw('book.book_price-discount.discount_price DESC');
		return $books;
	}

	public function getTopBooksRecommended()
	{
		return Book::query()
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
	}

	public function getTopBooksPopular()
	{
		return Book::query()
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
	}

	//SHOP
	public function sortByOnSale()
	{
		$books = Book::select(
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
		return $books;
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

	public function getBookById($id)
	{
		return Book::query()->select('book.*', 'author.author_name', 'discount.discount_price')
			->leftjoin('author', 'author.id', '=', 'book.author_id')
			->leftjoin('discount', 'discount.book_id', '=', 'book.id')
			->where('book.id', '=', "{$id}");
	}

	public function getFinalPrice()
	{
		return Book::select(
			'book.id',
			'book.book_title',
			DB::raw('case
                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                else book.book_price
                end as final_price')
		)
			->leftjoin('discount', 'book.id', 'discount.book_id');
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
