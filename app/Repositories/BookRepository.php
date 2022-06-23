<?php

namespace App\Repositories;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Support\Facades\DB;

class BookRepository extends BaseRepository
{
    protected $query;
    public function __construct()
    {
        $this->query = Book::query();
    }
    public function getTopBooksDiscount($request){
        $books = $this->query
            ->join('discount', 'book.id', '=', 'discount.book_id')
            ->select('book.*', 'discount.discount_price')
            ->orderByRaw('book.book_price-discount.discount_price DESC')
            ->limit($request)
            ->get();
        return $books;
    }



    public function getTopBooksRecommended($request){
        return Book::query()
            ->join('review', 'review.book_id', 'book.id')
            ->select('book.id', 'book.book_title', DB::raw('AVG(review.rating_start) as avg_rating'),
                DB::raw('case
                                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                                else book.book_price
                            end as final_price'))
            ->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price')
            ->join('discount', 'book.id', 'discount.book_id')
            ->orderByRaw('avg_rating desc, final_price asc')
            ->limit($request)
            ->get();
    }

    public function getTopBooksPopular($request){
        return Book::query()
            ->join('review', 'review.book_id', 'book.id')
            ->select('book.id', 'book.book_title', DB::raw('count(review.review_title) as total_review'),
                DB::raw('case
                                when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                                else book.book_price
                            end as final_price'))
            ->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price')
            ->join('discount', 'book.id', 'discount.book_id')
            ->orderByRaw('total_review desc, final_price asc')
            ->limit($request)
            ->get();
    }




    public function getFinalPrice(){
            return Book::select('book.id','book.book_title', DB::raw('
                case
                    when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                    else book.book_price
                end as final_price'))
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
    public function getAll(){
//        return Book::all();
    }
}
