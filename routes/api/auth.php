<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->controller(\App\Http\Controllers\Api\AuthController::class)->group(function(){
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
    Route::get('/user', 'user')->middleware('auth:sanctum');
});

