<?php

namespace App\Http\Controllers;

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
	public function sortReviewByDate(Request $request)
	{
		return response($this->_reviewRepository->sortReview($request->input('id'), $request->input('order'))->paginate($request->input('number')));
	}

	public function makeOrder(Request $request)
	{
		$result = $this->_orderRepository->makeOrder($request);
		if ($result) {
			return ["Result" => $result];
		} else {
			return ["Result" => "operation failed"];
		}
	}

	public function createReview(Request $request)
	{

		$result = $this->_reviewRepository->createReview($request);
		if ($result) {
			return ["Result" => $result];
		} else {
			return ["Result" => "operation failed"];
		}
	}
}
