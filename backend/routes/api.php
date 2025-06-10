<?php

use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::get('/products/latest', [ProductController::class, 'getLatestProducts']);
Route::get('/products/all', [ProductController::class, 'allProducts']);
Route::get('/users/{userId}/products', [ProductController::class, 'userProducts']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
  Route::apiResource('products', ProductController::class)->except(['index', 'show']);
  Route::post('/users/{id}', [UserController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/favourites', [FavouriteController::class, 'index']);
  Route::post('/favourites', [FavouriteController::class, 'store']);
  Route::delete('/favourites/{product}', [FavouriteController::class, 'destroy']);
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->get('logout', [UserController::class, 'logout']);
Route::get('/users/{id}', [UserController::class, 'show']);

