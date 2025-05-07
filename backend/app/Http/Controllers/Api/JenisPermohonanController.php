<?php

namespace App\Http\Controllers\Api;

use App\Models\JenisPermohonan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JenisPermohonanController extends Controller
{
    public function index()
    {
        // Ambil semua data yang belum dihapus (isDeleted = false)
        return response()->json(
            JenisPermohonan::where('isDeleted', false)->get()
        );
    }

    public function store(Request $request)
    {
        // Log request untuk debugging
        \Log::debug($request->all());

        $validated = $request->validate([
            'nama_jenis_permohonan' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $validated['parentId'] = null;
        $validated['createAt'] = now();
        $validated['updateAt'] = now();
        $validated['isDeleted'] = false;

        $data = JenisPermohonan::create($validated);

        return response()->json($data, 201);
    }

    public function show($id)
    {
        $item = JenisPermohonan::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = JenisPermohonan::findOrFail($id);

        $validated = $request->validate([
            'nama_jenis_permohonan' => 'sometimes|required|string|max:255',
            'keterangan' => 'nullable|string',
            'parentId' => 'nullable|integer|exists:jenis_permohonan,idJenisPermohonan',
        ]);

        $validated['updateAt'] = now();

        $item->update($validated);

        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = JenisPermohonan::findOrFail($id);

        // Soft delete manual: set isDeleted = true
        $item->isDeleted = true;
        $item->updateAt = now();
        $item->save();

        return response()->json(null, 204);
    }
}
