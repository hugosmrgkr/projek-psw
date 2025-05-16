<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermohonanSewaResource;
use App\Models\PermohonanSewa;
use Illuminate\Http\Request;

class PermohonanSewaController extends Controller
{
    // public function index()
    // {
    //     return PermohonanSewaResource::collection(PermohonanSewa::where('isDeleted', false)->get());
    // }
    public function index()
    {
        $permohonan = PermohonanSewa::where('isDeleted', false)
                        ->with('jenisPermohonan')  // <-- ini penting
                        ->get();

        return PermohonanSewaResource::collection($permohonan);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'idJenisPermohonan' => 'required|exists:jenisPermohonan,idJenisPermohonan',
            'nomorSuratPermohonan' => 'required|string|max:100',
            'tanggalPengajuan' => 'required|date',
            'namaPemohon' => 'required|string|max:255',
            'alamatPemohon' => 'required|string',
            'idTarifObjekRetribusi' => 'required|exists:tarifObjekRetribusi,idTarifObjekRetribusi',
        ]);

        $permohonan = PermohonanSewa::create($validated);
        return new PermohonanSewaResource($permohonan);
    }

    // public function show($id)
    // {
    //     $data = PermohonanSewa::findOrFail($id);
    //     return new PermohonanSewaResource($data);
    // }
    public function show($id)
    {
        $permohonan = PermohonanSewa::with('jenisPermohonan')->findOrFail($id);
        return new PermohonanSewaResource($permohonan);
    }

    public function update(Request $request, $id)
    {
        $permohonan = PermohonanSewa::findOrFail($id);

        $validated = $request->validate([
            'idJenisPermohonan' => 'required|exists:jenisPermohonan,idJenisPermohonan',
            'nomorSuratPermohonan' => 'required|string|max:100',
            'tanggalPengajuan' => 'required|date',
            'namaPemohon' => 'required|string|max:255',
            'alamatPemohon' => 'required|string',
            'idTarifObjekRetribusi' => 'required|exists:tarifObjekRetribusi,idTarifObjekRetribusi',
        ]);

        $permohonan->update($validated);
        return new PermohonanSewaResource($permohonan);
    }

    public function destroy($id)
    {
        $permohonan = PermohonanSewa::findOrFail($id);
        $permohonan->update(['isDeleted' => true]);
        return response()->json(['message' => 'Deleted (soft delete)']);
    }
}
