<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    private BookRepository $_bookRepository;
	private CategoryRepository $_categoryRepository;

    public function __construct(BookRepository $bookRepository, CategoryRepository $categoryRepository)
    {
        $this->_bookRepository = $bookRepository;
		$this->_categoryRepository = $categoryRepository;
    }
    public function sortByOnSale(Request $request){
        return response($this->_bookRepository->sortByOnSale()->paginate($request->input('number')));
    }
    public function sortByPopularity(Request $request){
        return response($this->_bookRepository->sortByPopularity()->paginate($request->input('number')));
    }
	public function sortByPrice(Request $request){
        return response($this->_bookRepository->sortByPrice($request->input('order'))->paginate($request->input('number')));
    }
	public function getByCategory(Request $request, $id){
		return response($this->_categoryRepository->getByCategory($id)->paginate($request->input('number')));
    }
	public function getBookById(Request $request){
		return response($this->_bookRepository->getBookById($request->input('id'))->get());
	}

}
