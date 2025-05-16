<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LokasiObjekRetribusi;
use App\Http\Resources\LokasiObjekRetribusiResource;
use Illuminate\Http\Request;

class LokasiObjekRetribusiController extends Controller
{
    public function index()
    {
        return LokasiObjekRetribusiResource::collection(
            LokasiObjekRetribusi::where('isDeleted', false)->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'lokasiObjekRetribusi' => 'required|string',
            'keterangan' => 'nullable|string',
        ]);

        $data = LokasiObjekRetribusi::create($request->all());

        return new LokasiObjekRetribusiResource($data);
    }

    public function show($id)
    {
        $data = LokasiObjekRetribusi::findOrFail($id);
        return new LokasiObjekRetribusiResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LokasiObjekRetribusi::findOrFail($id);
        $data->update($request->all());

        return new LokasiObjekRetribusiResource($data);
    }

    public function destroy($id)
    {
        $data = LokasiObjekRetribusi::findOrFail($id);
        $data->isDeleted = true;
        $data->save();
        $data->delete(); // soft delete

        return response()->json(['message' => 'Data berhasil dihapus.']);
    }

    public function restore($id)
    {
        $data = LokasiObjekRetribusi::withTrashed()->findOrFail($id);
        $data->isDeleted = false;
        $data->restore();

        return new LokasiObjekRetribusiResource($data);
    }
}
