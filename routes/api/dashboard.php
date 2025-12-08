<?php

use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->controller(\App\Http\Controllers\Api\DashboardController::class)->middleware('auth:sanctum')->group(function(){
    Route::get('/stats', 'stats');
    Route::get('/artists', 'artists');
    Route::get('/top-artist', 'topArtist');
    Route::get('/search-artist', 'search');
    Route::get('/all-artists', 'allArtists');
});

