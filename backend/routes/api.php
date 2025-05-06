<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JangkaWaktuSewaController;


Route::post('login', [AuthController::class, 'login']);

Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::apiResource('jangka-waktu-sewa', JangkaWaktuSewaController::class);

// Jika ada resource lain, tambahkan di sini
// Contoh:
// use App\Http\Controllers\Api\AnotherController;
// Route::apiResource('another-resource', AnotherController::class);
