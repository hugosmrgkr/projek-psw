<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\Api\JangkaWaktuSewaController;
use App\Http\Controllers\Api\JenisJangkaWaktuController;
use App\Http\Controllers\Api\JenisObjekRetribusiController;
use App\Http\Controllers\Api\JenisStatusController;
use App\Http\Controllers\Api\LokasiObjekRetribusiController;
use App\Http\Controllers\Api\ObjekRetribusiController;


Route::post('login', [AuthController::class, 'login']);

Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::apiResource('jangka-waktu-sewa', JangkaWaktuSewaController::class);
Route::apiResource('jenis-jangka-waktu', JenisJangkaWaktuController::class);
Route::apiResource('jenis-objek-retribusi', JenisObjekRetribusiController::class);
Route::apiResource('jenis-status', JenisStatusController::class);
Route::apiResource('lokasi-objek-retribusi', LokasiObjekRetribusiController::class);
Route::apiResource('objek-retribusi', ObjekRetribusiController::class);
Route::apiResource('objek-retribusi', ObjekRetribusiController::class);
