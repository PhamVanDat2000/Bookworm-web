<?php

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

// Route::get('/top10books  ', [\App\Http\Controllers\HomeController::class, 'top10BookDiscount']);
//Route::prefix('books')->group(function (){
//
//
//});
Route::get('/top-books-discount', [\App\Http\Controllers\HomeController::class, 'getTopBooksDiscount'])->name('topBookDiscount');
Route::get('/top-books-recommended', [\App\Http\Controllers\HomeController::class, 'getTopBooksRecommended']);
Route::get('/get-books-popularity', [\App\Http\Controllers\HomeController::class, 'getTopBooksPopular']);
Route::get('/get-final-price', [\App\Http\Controllers\HomeController::class, 'getFinalPrice']);


Route::get('/sort-by-on-sale', [\App\Http\Controllers\ShopController::class, 'sortByOnSale']);
Route::get('/sort-by-on-popularity', [\App\Http\Controllers\ShopController::class, 'sortByPopularity']);
Route::get('/sort-by-on-price', [\App\Http\Controllers\ShopController::class, 'sortByPrice']);

Route::get('/filter-by-category/{id}', [\App\Http\Controllers\ShopController::class, 'filterByCategory']);
Route::get('/filter-by-author/{id}', [\App\Http\Controllers\ShopController::class, 'filterByAuthor']);
Route::get('/filter-by-star', [\App\Http\Controllers\ShopController::class, 'filterByStar']);


Route::get('/get-book-by-id', [\App\Http\Controllers\ShopController::class, 'getBookById']);




