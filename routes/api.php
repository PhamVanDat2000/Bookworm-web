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
Route::get('/top10books  ', [\App\Http\Controllers\BookController::class, 'top10BookDiscount']);
Route::get('/top8booksrecommended  ', [\App\Http\Controllers\BookController::class, 'get8BookRecommended']);
Route::get('/get8BookPopular  ', [\App\Http\Controllers\BookController::class, 'get8BookPopular']);
Route::get('/getDiscountPrice  ', [\App\Http\Controllers\BookController::class, 'getDiscountPrice']);
