<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\ReviewRequest;
use App\Repositories\BookRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
	private BookRepository $_bookRepository;
	private ReviewRepository $_reviewRepository;
	private OrderRepository $_orderRepository;
	public function __construct(BookRepository $bookRepository, ReviewRepository $reviewRepository, OrderRepository $orderRepository)
	{
		$this->_bookRepository = $bookRepository;
		$this->_reviewRepository = $reviewRepository;
		$this->_orderRepository = $orderRepository;
	}

	public function getBookById(Request $request)
	{
		return response($this->_bookRepository->getBookById($request->input('id'))->get());
	}
	public function sortReviewByDate(ReviewRequest $request)
	{
		return response($this->_reviewRepository->sortReviewByDate($request)->paginate($request->input('per_page')));
	}

	public function makeOrder(OrderRequest $request)
	{
		$result = $this->_orderRepository->makeOrder($request);
		if ($result) {
			return ["Result" => [...($request->all()),'order_date'=>$result->order_date]];
		} else {
			return ["Result" => "operation failed"];
		}
	}

	public function createReview(ReviewRequest $request)
	{
		$result = $this->_reviewRepository->createReview($request);
		if ($result) {
			return ["Result" => $result];
		} else {
			return ["Result" => "operation failed"];
		}
	}
}
