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
			->select('book.id', 'book.book_title', 'book.book_cover_photo', 'author.author_name', 'book.book_price', 'discount.discount_price')
			->join('discount', 'book.id', '=', 'discount.book_id')
			->leftjoin('author', 'author.id', '=', 'book.author_id')
			->orderByRaw('book.book_price-discount.discount_price DESC');
		return $_books;
	}

	public function getTopBooksRecommended()
	{
		$_book = Book::query()
			->select(
				'book.id',
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
				'book.id',
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
		$_books = Book::select(
			'book.id',
            'book.book_title',
			'discount.discount_price',
			'book.book_price',
            'book.book_cover_photo',
            'author.author_name',
		)
			->join('discount', function ($join) {
				$join->on('discount.book_id', '=', 'book.id')
					->where('discount.discount_start_date', '<=', today())
					->where(function ($query) {
						$query->where('discount.discount_end_date', '>=', today())
							->orwhereNull('discount.discount_end_date');
					});
			})
            ->leftjoin('author', 'author.id', '=', 'book.author_id')
            ->orderByRaw('book.book_price-discount.discount_price DESC, discount.discount_price ASC');
		return $_books;
	}

	public function sortByPopularity()
	{
		$_getFinalPrice = $this->getFinalPrice();
		return Review::query()->selectRaw('final_price_table.*, count(review.id) as total_review')
			->rightjoinsub($_getFinalPrice, 'final_price_table', function ($join) {
				$join->on('review.book_id', '=', 'final_price_table.id');
			})
			->groupByRaw('final_price_table.id,final_price_table.book_title,final_price_table.book_price,final_price_table.discount_price, final_price_table.final_price,final_price_table.book_cover_photo, final_price_table.author_name')
			->orderByRaw('total_review desc, final_price_table.final_price asc');
	}

	public function sortByPrice($order = 'asc')
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
			'book.id as book_id',
            'book.book_title',
            'book.book_price',
            'book.book_cover_photo',
            'book.category_id',
            'book.author_id',
            'discount.discount_price',
            'author.author_name',
			DB::raw('case
                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                else book.book_price
                end as final_price')
		)
			->leftjoin('discount', 'book.id', 'discount.book_id')
            ->leftjoin('author', 'author.id', '=', 'book.author_id')
        ;
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
