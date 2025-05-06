<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JenisPermohonanController;

// Rute untuk resource Jenis Permohonan
Route::apiResource('jenis-permohonan', JenisPermohonanController::class);

// Jika ada resource lain, tambahkan di sini
// Contoh:
// use App\Http\Controllers\Api\AnotherController;
// Route::apiResource('another-resource', AnotherController::class);