<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ObjekRetribusi;
use Illuminate\Http\Request;
use App\Http\Resources\ObjekRetribusiResource;

class ObjekRetribusiController extends Controller
{
    public function index()
    {
        $data = ObjekRetribusi::where('isDeleted', false)->with(['lokasi', 'jenis'])->get();
        return ObjekRetribusiResource::collection($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'idLokasiObjekRetribusi' => 'required|exists:lokasiObjekRetribusi,idLokasiObjekRetribusi',
            'idJenisObjekRetribusi' => 'required|exists:jenisObjekRetribusi,idJenisObjekRetribusi',
            'kodeObjekRetribusi' => 'required|string|max:100',
            'noBangunan' => 'required|string|max:100',
            'jumlahLantai' => 'required|integer|min:1',
            'objekRetribusi' => 'required|string|max:255',
            'panjangTanah' => 'required|numeric',
            'lebarTanah' => 'required|numeric',
            'luasTanah' => 'required|numeric',
            'panjangBangunan' => 'required|numeric',
            'lebarBangunan' => 'required|numeric',
            'luasBangunan' => 'required|numeric',
            'alamat' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'keterangan' => 'nullable|string',
            'gambarDenahTanah' => 'nullable|string',
        ]);

        $objek = ObjekRetribusi::create($validated);
        return new ObjekRetribusiResource($objek->load(['lokasi', 'jenis']));
    }

    public function show($id)
    {
        $objek = ObjekRetribusi::with(['lokasi', 'jenis'])->where('isDeleted', false)->findOrFail($id);
        return new ObjekRetribusiResource($objek);
    }

    public function update(Request $request, $id)
    {
        $objek = ObjekRetribusi::findOrFail($id);

        $validated = $request->validate([
            'idLokasiObjekRetribusi' => 'sometimes|exists:lokasiObjekRetribusi,idLokasiObjekRetribusi',
            'idJenisObjekRetribusi' => 'sometimes|exists:jenisObjekRetribusi,idJenisObjekRetribusi',
            'kodeObjekRetribusi' => 'sometimes|string|max:100',
            'noBangunan' => 'sometimes|string|max:100',
            'jumlahLantai' => 'sometimes|integer|min:1',
            'objekRetribusi' => 'sometimes|string|max:255',
            'panjangTanah' => 'sometimes|numeric',
            'lebarTanah' => 'sometimes|numeric',
            'luasTanah' => 'sometimes|numeric',
            'panjangBangunan' => 'sometimes|numeric',
            'lebarBangunan' => 'sometimes|numeric',
            'luasBangunan' => 'sometimes|numeric',
            'alamat' => 'sometimes|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'keterangan' => 'nullable|string',
            'gambarDenahTanah' => 'nullable|string',
        ]);

        $objek->update($validated);
        return new ObjekRetribusiResource($objek->load(['lokasi', 'jenis']));
    }

    public function destroy($id)
    {
        $objek = ObjekRetribusi::findOrFail($id);
        $objek->delete(); // Soft delete, bukan hapus permanen

        return response()->json(['message' => 'Objek retribusi berhasil dihapus (soft delete).']);
    }
}
