<?php

use Illuminate\Support\Facades\Route;

Route::prefix('albums')->controller(\App\Http\Controllers\Api\AlbumController::class)->group(function(){
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/{album}', 'show');
    Route::put('/{album}', 'update');
    Route::delete('/{album}', 'delete');
});