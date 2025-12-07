<?php

use Illuminate\Support\Facades\Route;

Route::prefix('artists')->controller(\App\Http\Controllers\Api\ArtistController::class)->group(function(){
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/{artist}', 'show');
    Route::put('/{artist}', 'update');
    Route::delete('/{artist}', 'delete');
});