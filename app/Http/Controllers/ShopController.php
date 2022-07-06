<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorRequest;
use App\Http\Requests\BookRequest;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\ReviewRequest;
use App\Http\Requests\ShopRequest;
use App\Repositories\AuthorRepository;
use App\Repositories\BookRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ReviewRepository;

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
    public function sortBook(ShopRequest $request){
        if($request->input('filter')==='sale'){
            return response($this->_bookRepository->sortByOnSale()->paginate($request->input('per_page')));
        }
        elseif ($request->input('filter')==='popular'){
            return response($this->_bookRepository->sortByPopularity()->paginate($request->input('per_page')));
        }
        elseif ($request->input('filter')==='price'){
            return response($this->_bookRepository->sortByPrice($request->input('order'))->paginate($request->input('per_page')));
        }
    }
    public function getCategoryList(){
        return response($this->_categoryRepository->getCategoryList()->get());
    }
    public function getAuthorList(){
        return response($this->_authorRepository->getAuthorList()->get());

    }
	public function filterByCategory(CategoryRequest $request)
	{
       return response($this->_categoryRepository->filterByCategory($request)->paginate($request->per_page));
	}
	public function filterByAuthor(AuthorRequest $request)
	{
		return response($this->_authorRepository->filterByAuthor($request)->paginate($request->per_page));
	}
	public function filterByStar(ReviewRequest $request)
	{
		return response($this->_reviewRepository->filterByStar($request)->paginate($request->per_page));
	}
	public function getBookById(BookRequest $request)
	{
		return response($this->_bookRepository->getBookById($request)->get());
	}
}
