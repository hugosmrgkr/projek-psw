<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LokasiObjekRetribusi;

class LokasiObjekRetribusiController extends Controller
{
    public function index()
    {
        return LokasiObjekRetribusi::where('isDeleted', 0)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'lokasiObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['createAt'] = now();
        $data['updateAt'] = now();

        return LokasiObjekRetribusi::create($data);
    }

    public function show($id)
    {
        return LokasiObjekRetribusi::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $lokasi = LokasiObjekRetribusi::findOrFail($id);

        $request->validate([
            'lokasiObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $lokasi->update([
            'lokasiObjekRetribusi' => $request->lokasiObjekRetribusi,
            'keterangan' => $request->keterangan,
            'updateAt' => now(),
        ]);

        return $lokasi;
    }

    public function destroy($id)
    {
        $lokasi = LokasiObjekRetribusi::findOrFail($id);
        $lokasi->update(['isDeleted' => 1]);

        return response()->json(['message' => 'Berhasil dihapus']);
    }
}
