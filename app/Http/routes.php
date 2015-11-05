<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {return view('/welcome');});
Route::post('/', 'UserController@createAccount');
Route::get('/createaccount', function () {return view('createaccount');});
Route::post('/home', 'UserController@login');
Route::get('/home', 'UserController@checkLoggedIn');
Route::get('/perlintest', function() {return view('perlintest');});
Route::get('/save', 'UserController@saveState');
Route::get('/logout', 'UserController@logout');
Route::get('/transport', 'UserController@transport');
