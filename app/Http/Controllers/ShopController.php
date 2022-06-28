<?php

namespace App\Http\Controllers;

use App\Repositories\AuthorRepository;
use App\Repositories\BookRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ShopController extends Controller
{
	private BookRepository $_bookRepository;
	private CategoryRepository $_categoryRepository;
	private AuthorRepository $_authorRepository;
	private ReviewRepository $_reviewRepository;

	public function __construct(BookRepository $bookRepository, CategoryRepository $categoryRepository, AuthorRepository $authorRepository, ReviewRepository $reviewRepository)
	{
		$this->_bookRepository = $bookRepository;
		$this->_categoryRepository = $categoryRepository;
		$this->_authorRepository = $authorRepository;
		$this->_reviewRepository = $reviewRepository;
	}
	public function sortByOnSale(Request $request)
	{
		return response($this->_bookRepository->sortByOnSale()->paginate($request->input('number')));
	}
	public function sortByPopularity(Request $request)
	{
		return response($this->_bookRepository->sortByPopularity()->paginate($request->input('number')));
	}
	public function sortByPrice(Request $request)
	{
		return response($this->_bookRepository->sortByPrice($request->input('order'))->paginate($request->input('number')));
	}
	public function filterByCategory(Request $request, $id)
	{
		return response($this->_categoryRepository->filterByCategory($id)->paginate($request->input('number')));
	}
	public function filterByAuthor(Request $request, $id)
	{
		return response($this->_authorRepository->filterByAuthor($id)->paginate($request->input('number')));
	}
	public function filterByStar(Request $request)
	{
		return response($this->_reviewRepository->filterByStar($request->input('filterStar'))->paginate($request->input('number')));
	}
	public function getBookById(Request $request)
	{
		return response($this->_bookRepository->getBookById($request->input('id'))->get());
	}
}
