<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisObjekRetribusi;
use Illuminate\Http\Request;

class JenisObjekRetribusiController extends Controller
{
    public function index()
    {
        $data = JenisObjekRetribusi::where('isDeleted', 0)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenisObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $data = JenisObjekRetribusi::create([
            'jenisObjekRetribusi' => $request->jenisObjekRetribusi,
            'keterangan' => $request->keterangan,
            'createAt' => now(),
            'updateAt' => now(),
            'isDeleted' => 0,
        ]);

        return response()->json($data, 201);
    }

    public function show($id)
    {
        $data = JenisObjekRetribusi::findOrFail($id);
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'jenisObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $data = JenisObjekRetribusi::findOrFail($id);
        $data->update([
            'jenisObjekRetribusi' => $request->jenisObjekRetribusi,
            'keterangan' => $request->keterangan,
            'updateAt' => now(),
        ]);

        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = JenisObjekRetribusi::findOrFail($id);
        $data->update([
            'isDeleted' => 1,
            'updateAt' => now(),
        ]);

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
