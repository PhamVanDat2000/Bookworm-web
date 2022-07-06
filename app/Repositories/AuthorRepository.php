<?php

namespace App\Repositories;

use App\Http\Requests\AuthorRequest;
use App\Models\Author;

class AuthorRepository extends BaseRepository
{
	protected $query;
    private BookRepository $_bookRepository;
    public function __construct(BookRepository $bookRepository)
    {
        $this->_bookRepository = $bookRepository;
		$this->query = Author::query();
	}
	public function filterByAuthor(AuthorRequest $request)
	{
        $_getFinalPrice = $this->_bookRepository->getFinalPrice();
        $_books = $this->query
            ->leftJoinSub($_getFinalPrice, 'final_price_table',function($join){
                $join->on('author.id', '=', 'final_price_table.author_id');
            })
            ->where('author.id', '=', "{$request->input('id')}")
        ->orderByRaw('final_price_table.book_title asc');
        return $_books;

	}
    public function getAuthorList(){
        $_author = $this->query->select('author.id', 'author.author_name');
        return $_author;
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
		// TODO: Implement update() method.
	}
}
