<?php

use Illuminate\Support\Facades\Route;

Route::prefix('albums')->controller(\App\Http\Controllers\Web\AlbumController::class)->group(function(){
    Route::get('/', 'index')->name('albums.index');
    Route::post('/', 'store')->name('albums.store');
    Route::get('/{album}', 'show')->name('albums.show');
    Route::put('/{album}', 'update')->name('albums.update');
    Route::delete('/{album}', 'delete')->name('albums.delete');
});

