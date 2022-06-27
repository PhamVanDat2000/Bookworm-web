<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private BookRepository $_bookRepository;
    private ReviewRepository $_reviewRepository;
    public function __construct(BookRepository $bookRepository, ReviewRepository $reviewRepository )
    {
        $this->_bookRepository = $bookRepository;
        $this->_reviewRepository = $reviewRepository;
    }

    public function getBookById(Request $request){
        return response($this->_bookRepository->getBookById($request->input('id'))->get());
    }
    public function sortReviewByDate(Request $request){
        return response($this->_reviewRepository->sortReview($request->input('id'), $request->input('order'))->paginate($request->input('number')));
    }
	public function makeOrder(Request $request){
		return ["Result"=>"data has been saved"];
		// return $request->post();
//		return response($this->)
		// return response($request->all());
		// return Request::post();
		// dd(Request::post());
	}

}
