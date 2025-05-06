<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\Api\AuthController;


// Rute untuk resource Jenis Permohonan
Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::post('login', [AuthController::class, 'login']);

// Jika ada resource lain, tambahkan di sini
// Contoh:
// use App\Http\Controllers\Api\AnotherController;
// Route::apiResource('another-resource', AnotherController::class);
