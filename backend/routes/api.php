<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ===== Tambahkan route public sederhana
Route::get('/greeting', function () {
    return response()->json([
        'message' => 'Halo Laravel API 👋'
    ]);
});
