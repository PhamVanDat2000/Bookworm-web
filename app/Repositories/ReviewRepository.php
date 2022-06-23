<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Review;
use Illuminate\Support\Facades\DB;

class ReviewRepository extends BaseRepository
{
    protected $query;
    public function __construct()
    {
        $this->query = Review::query();
    }
    public function filterByStar($filterStar){
        $books = $this->query->select('book.id', 'book.book_title')
            ->rightjoin('book', 'book.id', '=', 'review.book_id')
            ->groupBy('book.id', 'book.book_title')
            ->having(DB::raw('Avg(review.rating_start)'), '>=', "{$filterStar}")
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
