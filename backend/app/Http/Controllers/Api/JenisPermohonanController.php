<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JenisPermohonan;
use App\Http\Resources\JenisPermohonanResource;

class JenisPermohonanController extends Controller
{
    // Ambil semua jenis permohonan yang tidak dihapus
    public function index()
    {
        $jenisPermohonan = JenisPermohonan::where('isDeleted', false)->get();
        return JenisPermohonanResource::collection($jenisPermohonan);
    }

  
    public function store(Request $request)
    {
        $request->validate([
            'jenisPermohonan' => 'required|in:Permohonan Baru,Perpanjangan,Pembaharuan',
            'parentId' => 'nullable|integer',
            'keterangan' => 'nullable|string'
        ]);

        $jenisPermohonan = JenisPermohonan::create($request->all());
        return new JenisPermohonanResource($jenisPermohonan);
    }

    // Menampilkan detail jenis permohonan berdasarkan ID
    public function show($id)
    {
        $jenisPermohonan = JenisPermohonan::findOrFail($id);
        return new JenisPermohonanResource($jenisPermohonan);
    }

    // Mengupdate jenis permohonan
    public function update(Request $request, $id)
    {
        $jenisPermohonan = JenisPermohonan::findOrFail($id);
        $jenisPermohonan->update($request->all());
        return new JenisPermohonanResource($jenisPermohonan);
    }

    // Menghapus jenis permohonan (soft delete)
    public function destroy($id)
    {
        $jenisPermohonan = JenisPermohonan::findOrFail($id);
        $jenisPermohonan->update(['isDeleted' => true]);
        return response()->json(['message' => 'Data berhasil dihapus.']);
    }

}
