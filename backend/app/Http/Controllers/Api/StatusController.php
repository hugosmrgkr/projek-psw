<?php

namespace App\Http\Controllers\Api;

use App\Models\Status;
use App\Http\Controllers\Controller;
use App\Http\Resources\StatusResource;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    // Tampilkan semua data status yang belum dihapus (isDeleted = false)
    public function index()
    {
        $data = Status::with('jenisStatus')
            ->where('isDeleted', false)
            ->get();

        return StatusResource::collection($data);
    }

    // Simpan data status baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'idJenisStatus' => 'required|exists:jenisStatus,idJenisStatus',
            'namaStatus' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $status = Status::create($validated);

        // Load relasi sebelum mengembalikan response
        $status->load('jenisStatus');

        return new StatusResource($status);
    }

    // Tampilkan data status berdasarkan id
    public function show($id)
    {
        $status = Status::with('jenisStatus')
            ->where('isDeleted', false)
            ->findOrFail($id);

        return new StatusResource($status);
    }

    // Update data status
    public function update(Request $request, $id)
    {
        $status = Status::where('isDeleted', false)->findOrFail($id);

        $validated = $request->validate([
            'idJenisStatus' => 'required|exists:jenisStatus,idJenisStatus',
            'namaStatus' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $status->update($validated);

        $status->load('jenisStatus');

        return new StatusResource($status);
    }

    // Hapus data status (soft delete dan set isDeleted = true)
    public function destroy($id)
    {
        $status = Status::where('isDeleted', false)->findOrFail($id);

        // Tandai isDeleted jadi true lalu soft delete
        $status->update(['isDeleted' => true]);
        $status->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
