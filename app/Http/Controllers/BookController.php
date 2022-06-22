<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class BookController extends Controller
{
    private BookRepository $_bookRepository;
    public function __construct(BookRepository $bookRepository)
    {
        $this->_bookRepository = $bookRepository;
    }

    public function top10BookDiscount(){
        return response($this->_bookRepository->get10BookDiscount());
    }
    public function get8BookRecommended(){
        return response($this->_bookRepository->get8BookRecommended());
    }
    public function get8BookPopular(){
        return response($this->_bookRepository->get8BookPopular());
    }
    public function getDiscountPrice(){
        return response($this->_bookRepository->getDiscountPrice());
    }






	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		//
//		$books = DB::table('book')
//			->join('discount', 'book.id', '=', 'discount.book_id')
//			->select('book.*', 'discount.discount_price')
//			->orderByRaw('book.book_price-discount.discount_price DESC')
//			->limit(10)
//			->get();
//		return $books;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}
