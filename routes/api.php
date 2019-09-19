<?php

use Illuminate\Http\Request;

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

Route::prefix('contacts')
    ->group(function () {

        Route::get('', 'ContactController@index');
        Route::get('{contact}', 'ContactController@show');
        Route::post('', 'ContactController@store');
        Route::put('{contact}', 'ContactController@update');
        Route::delete('{contact}', 'ContactController@destroy');

    });
