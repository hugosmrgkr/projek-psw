<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JenisStatusResource;
use App\Models\JenisStatus;
use Illuminate\Http\Request;

class JenisStatusController extends Controller
{
    public function index()
    {
        $data = JenisStatus::where('isDeleted', false)->get();
        return JenisStatusResource::collection($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenisStatus' => 'required|in:Proses,Disetujui,Ditolak,Dibatalkan',
            'keterangan' => 'nullable|string',
        ]);

        $data = JenisStatus::create($validated);
        return new JenisStatusResource($data);
    }

    public function show($id)
    {
        $data = JenisStatus::findOrFail($id);
        return new JenisStatusResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = JenisStatus::findOrFail($id);

        $validated = $request->validate([
            'jenisStatus' => 'sometimes|in:Proses,Disetujui,Ditolak,Dibatalkan',
            'keterangan' => 'nullable|string',
        ]);

        $data->update($validated);
        return new JenisStatusResource($data);
    }

    public function destroy($id)
    {
        $data = JenisStatus::findOrFail($id);
        $data->update(['isDeleted' => true]);
        $data->delete();

        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }
}
