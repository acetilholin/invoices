<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {

    Route::post('logout', 'Auth\AuthController@logout');
    Route::post('refresh', 'Auth\AuthController@refresh');
    Route::post('login', 'Auth\AuthController@login');
    Route::post('register', 'Auth\AuthController@register');
    Route::post('token', 'Auth\AuthController@token');
    Route::post('reset', 'Auth\AuthController@reset');
    Route::get('me', 'Auth\AuthController@me');

    Route::resource('invoices', 'API\InvoiceController');

    Route::resource('users', 'API\UserController');

    Route::get('users/{id}/edit/{attr}/{data}','API\UserController@edit');
    Route::post('users/edit/password','API\UserController@newPassword');
    Route::post('users/photo','API\UserController@photo');

    Route::resource('customers', 'API\CustomerController');

    Route::resource('items', 'API\ItemController');

    Route::resource('recipients', 'API\RecipientController');

    Route::resource('posts', 'API\PostController');

    Route::resource('klavzule', 'API\KlavzuleController');
});




