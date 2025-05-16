<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\API\JenisJangkaWaktuController;
use App\Http\Controllers\Api\JangkaWaktuSewaController;
use App\Http\Controllers\Api\LokasiObjekRetribusiController;
use App\Http\Controllers\Api\JenisObjekRetribusiController;
use App\Http\Controllers\Api\ObjekRetribusiController;
use App\Http\Controllers\Api\JenisStatusController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\PeruntukanSewaController;
use App\Http\Controllers\Api\WajibRetribusiController;
use App\Http\Controllers\Api\TarifObjekRetribusiController;
use App\Http\Controllers\Api\PermohonanSewaController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('permohonan-sewa', PermohonanSewaController::class);
Route::apiResource('tarif-objek-retribusi', TarifObjekRetribusiController::class);
Route::apiResource('wajib-retribusi', WajibRetribusiController::class);
Route::apiResource('peruntukan-sewa', PeruntukanSewaController::class);
Route::apiResource('status', StatusController::class);
Route::apiResource('jenis-status', JenisStatusController::class);
Route::apiResource('objek-retribusi', ObjekRetribusiController::class);
Route::apiResource('jenis-objek-retribusi', JenisObjekRetribusiController::class);
Route::apiResource('lokasi-objek-retribusi', LokasiObjekRetribusiController::class);
Route::post('lokasi-objek-retribusi/{id}/restore', [LokasiObjekRetribusiController::class, 'restore']);
Route::apiResource('jangka-waktu-sewa', JangkaWaktuSewaController::class);
Route::apiResource('/jenis-jangka-waktu', JenisJangkaWaktuController::class);
Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::apiResource('users', UserController::class);
