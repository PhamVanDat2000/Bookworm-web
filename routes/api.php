<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});

// home
Route::prefix('home')->group(function () {
	Route::get('top-books-discount', [HomeController::class, 'getTopBooksDiscount'])
		->name('getTopBooksDiscount');
	Route::get('top-books-recommended', [HomeController::class, 'getTopBooksRecommended'])
		->name('getTopBooksRecommended');
	Route::get('get-books-popularity', [HomeController::class, 'getTopBooksPopular'])
		->name('getTopBooksPopular');
});

// shop
Route::prefix('shop')->group(function () {
	Route::get('sort-book', [ShopController::class, 'sortBook'])
		->name('sortBooK');
	Route::get('filter-by-category', [ShopController::class, 'filterByCategory'])
		->name('filterByCategory');
	Route::get('filter-by-author', [ShopController::class, 'filterByAuthor'])
		->name('filterByAuthor');
	Route::get('filter-by-star', [ShopController::class, 'filterByStar'])
		->name('filterByStar');
	Route::get('category-list', [ShopController::class, 'getCategoryList'])
		->name('getCategoryList');
	Route::get('author-list', [ShopController::class, 'getAuthorList'])
		->name('getAuthorList');
});

// product
Route::prefix('product')->group(function () {
	Route::get('sort-review-by-date', [ProductController::class, 'sortReview'])
		->name('sortReviewByDate');
	Route::get('get-star-count', [ProductController::class, 'getStar'])
		->name('sortReviewByDate');
	Route::get('get-book-by-id', [ShopController::class, 'getBookById'])
		->name('getBookById');
	Route::post('make-order', [ProductController::class, 'makeOrder'])
		->name('makeOrder');
	Route::post('create-review', [ProductController::class, 'createReview'])
		->name('createReview');
	Route::get('get-book-by-id', [ProductController::class, 'getBookById'])
		->name('getBookById');
});

// Sign In
Route::prefix('auth')->group(function () {
	Route::post('register', [AuthController::class, 'registerUser'])
		->name('registerUser');
	Route::post('sign-in', [AuthController::class, 'loginUser'])
		->name('loginUser');
});
