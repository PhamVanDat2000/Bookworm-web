<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{
	private BookRepository $_bookRepository;
	public function __construct(BookRepository $bookRepository)
	{
		$this->_bookRepository = $bookRepository;
	}

	public function getTopBooksDiscount(BookRequest $request)
	{
		return response($this->_bookRepository->getTopBooksDiscount()->limit($request->input('total'))->get());
	}
	public function getTopBooksRecommended(BookRequest $request)
	{
		return response($this->_bookRepository->getTopBooksRecommended()->limit($request->input('total'))->get());
	}
	public function getTopBooksPopular(BookRequest $request)
	{
		return response($this->_bookRepository->getTopBooksPopular()->limit($request->input('total'))->get());
	}
}
