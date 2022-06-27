<?php

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
Route::get('/top-books-discount', [HomeController::class, 'getTopBooksDiscount'])->name('topBookDiscount');
Route::get('/top-books-recommended', [HomeController::class, 'getTopBooksRecommended']);
Route::get('/get-books-popularity', [HomeController::class, 'getTopBooksPopular']);
Route::get('/get-final-price', [HomeController::class, 'getFinalPrice']);

// shop
Route::get('/sort-by-on-sale', [ShopController::class, 'sortByOnSale']);
Route::get('/sort-by-on-popularity', [ShopController::class, 'sortByPopularity']);
Route::get('/sort-by-on-price', [ShopController::class, 'sortByPrice']);

Route::get('/filter-by-category/{id}', [ShopController::class, 'filterByCategory']);
Route::get('/filter-by-author/{id}', [ShopController::class, 'filterByAuthor']);
Route::get('/filter-by-star', [ShopController::class, 'filterByStar']);

// product
Route::get('/sort-review-by-date', [ProductController::class, 'sortReviewByDate']);
Route::get('/get-book-by-id', [ShopController::class, 'getBookById']);

Route::post('/make-order', [ProductController::class, 'makeOrder']);



