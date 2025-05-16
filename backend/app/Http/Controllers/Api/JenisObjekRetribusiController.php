<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisObjekRetribusi;
use App\Http\Resources\JenisObjekRetribusiResource;
use Illuminate\Http\Request;

class JenisObjekRetribusiController extends Controller
{
    public function index()
    {
        $data = JenisObjekRetribusi::whereNull('deleted_at')->get();
        return JenisObjekRetribusiResource::collection($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenisObjekRetribusi' => 'required|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $data = JenisObjekRetribusi::create($validated);
        return new JenisObjekRetribusiResource($data);
    }

    public function show($id)
    {
        $data = JenisObjekRetribusi::findOrFail($id);
        return new JenisObjekRetribusiResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = JenisObjekRetribusi::findOrFail($id);
        $data->update($request->only('jenisObjekRetribusi', 'keterangan'));
        return new JenisObjekRetribusiResource($data);
    }

    public function destroy($id)
    {
        $data = JenisObjekRetribusi::findOrFail($id);
        $data->delete(); // Soft delete
        return response()->json(['message' => 'Data berhasil dihapus (soft delete)']);
    }
}
