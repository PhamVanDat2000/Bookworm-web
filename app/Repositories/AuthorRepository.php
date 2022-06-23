<?php

namespace App\Repositories;

use App\Models\Author;

class AuthorRepository extends BaseRepository
{
    protected $query;
    public function __construct()
    {
        $this->query = Author::query();
    }
    public function filterByAuthor($id){
		$books = $this->query->select('author.id', 'author.author_name', 'book.id as book_id')
		->leftjoin('book', 'author.id', '=', 'book.author_id')
		->where('author.id', '=', "{$id}")
		;
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
    public function getAll(){
//        return Book::all();
    }
}
