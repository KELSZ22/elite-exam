<?php

use Illuminate\Support\Facades\Route;

require_once __DIR__.'/web/auth.php';

Route::middleware('auth')->group(function () {
    require_once __DIR__.'/web/dashboard.php';
    require_once __DIR__.'/web/artist.php';
    require_once __DIR__.'/web/album.php';
});
