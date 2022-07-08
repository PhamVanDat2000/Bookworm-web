<?php

namespace App\Repositories;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryRepository extends BaseRepository
{
	protected $query;
	private BookRepository $_bookRepository;
	public function __construct(BookRepository $bookRepository)
	{
		$this->_bookRepository = $bookRepository;
		$this->query = Category::query();
	}
	public function filterByCategory(CategoryRequest $request)
	{
		$_getFinalPrice = $this->_bookRepository->getFinalPrice();
		$_books = $this->query
			->leftJoinSub($_getFinalPrice, 'final_price_table', function ($join) {
				$join->on('category.id', '=', 'final_price_table.category_id');
			})
			->where('category.id', '=', "{$request->id}")
			->orderByRaw('final_price_table.book_title asc');
		return $_books;
	}
	public function getCategoryList()
	{
		$_category = $this->query->select('category.id', 'category.category_name');
		return $_category;
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
