<?php

use Illuminate\Support\Facades\Route;

Route::prefix('artists')->controller(\App\Http\Controllers\Api\ArtistController::class)->group(function(){
    Route::get('/', 'index')->name('artists.index');
    Route::post('/', 'store')->name('artists.store');
    Route::get('/{artist}', 'show')->name('artists.show');
    Route::put('/{artist}', 'update')->name('artists.update');
    Route::delete('/{artist}', 'delete')->name('artists.delete');
});