<?php

use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->controller(\App\Http\Controllers\Web\DashboardController::class)->group(function(){
    Route::get('/', 'index')->name('dashboard.index');
});

// Also make dashboard the home page
Route::get('/', [\App\Http\Controllers\Web\DashboardController::class, 'index'])->name('home');

