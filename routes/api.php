<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

require_once __DIR__.'/api/auth.php';
require_once __DIR__.'/api/dashboard.php';
require_once __DIR__.'/api/artist.php';
require_once __DIR__.'/api/albums.php';