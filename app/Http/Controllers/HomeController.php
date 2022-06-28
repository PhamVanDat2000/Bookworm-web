<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{
	private BookRepository $_bookRepository;
	public function __construct(BookRepository $bookRepository)
	{
		$this->_bookRepository = $bookRepository;
	}

	public function getTopBooksDiscount(Request $request)
	{
		return response($this->_bookRepository->getTopBooksDiscount()->limit($request->input('total'))->get());
	}
	public function getTopBooksRecommended(Request $request)
	{
		return response($this->_bookRepository->getTopBooksRecommended()->limit($request->input('total'))->get());
	}
	public function getTopBooksPopular(Request $request)
	{
		return response($this->_bookRepository->getTopBooksPopular()->limit($request->input('total'))->get());
	}
	public function getFinalPrice()
	{
		return response($this->_bookRepository->getFinalPrice()->get());
	}
}
