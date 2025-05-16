<?php

namespace App\Http\Controllers\Api;

use App\Models\PeruntukanSewa;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PeruntukanSewaController extends Controller
{
    public function index()
    {
        $peruntukanSewa = PeruntukanSewa::where('isDeleted', false)->get();
        return response()->json(['data' => $peruntukanSewa], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenisKegiatan' => 'required|string|max:100',
            'peruntukanSewa' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $peruntukanSewa = PeruntukanSewa::create($request->all());
        return response()->json(['message' => 'Data berhasil ditambahkan!', 'data' => $peruntukanSewa], 201);
    }

    public function show($id)
    {
        $peruntukanSewa = PeruntukanSewa::find($id);

        if (!$peruntukanSewa) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json(['data' => $peruntukanSewa], 200);
    }

    public function update(Request $request, $id)
    {
        $peruntukanSewa = PeruntukanSewa::find($id);

        if (!$peruntukanSewa) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'jenisKegiatan' => 'required|string|max:100',
            'peruntukanSewa' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $peruntukanSewa->update($request->all());
        return response()->json(['message' => 'Data berhasil diperbarui!', 'data' => $peruntukanSewa], 200);
    }

    public function destroy($id)
    {
        $peruntukanSewa = PeruntukanSewa::find($id);

        if (!$peruntukanSewa) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $peruntukanSewa->update(['isDeleted' => true]);
        $peruntukanSewa->delete();
        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }
}
