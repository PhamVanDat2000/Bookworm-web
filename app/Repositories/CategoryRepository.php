<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends BaseRepository
{
	protected $query;
	public function __construct()
	{
		$this->query = Category::query();
	}
	public function filterByCategory($id)
	{
		$books = $this->query->select('category.id', 'category.category_name', 'book.id as book_id', 'book.book_title')
			->leftjoin('book', 'category.id', '=', 'book.category_id')
			->where('category.id', '=', "{$id}")
			->orderByRaw('book.book_title asc');
		return $books;
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
