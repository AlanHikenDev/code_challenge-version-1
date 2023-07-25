<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SupplierProductsController;
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
/*Autenticacion*/
Route::post('/login', 'App\Http\Controllers\Login@login');
Route::post('/login_admin', 'App\Http\Controllers\Login@login_admin');
Route::get('/logout', 'App\Http\Controllers\Login@logout');
Route::post('/users/register', 'App\Http\Controllers\Login@register');

Route::middleware(['auth:sanctum'])->group(function () {
  
    Route::get('/auth/user', 'App\Http\Controllers\Login@auth_user'); 
    Route::resource('clients', ClientController::class);
    Route::resource('order', OrderController::class);
    Route::resource('order_detail', OrderDetailController::class);
    Route::resource('product', ProductController::class);
    Route::resource('suplier', SupplierController::class);
    Route::resource('supplierProduct', SupplierProductsController::class);
});

//Route::get('/user', [AuthController::class, 'me'])->middleware('auth:sanctum');
//Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
  //  return $request->user();
//});
