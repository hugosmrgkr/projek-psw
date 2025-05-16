<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\JenisJangkaWaktuResource;
use App\Models\JenisJangkaWaktu;
use Illuminate\Http\Request;

class JenisJangkaWaktuController extends Controller
{
    public function index()
    {
        $data = JenisJangkaWaktu::where('isDeleted', false)->get();
        return JenisJangkaWaktuResource::collection($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenisJangkaWaktu' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $data = JenisJangkaWaktu::create([
            'jenisJangkaWaktu' => $request->jenisJangkaWaktu,
            'keterangan' => $request->keterangan,
        ]);

        return new JenisJangkaWaktuResource($data);
    }

    public function show($id)
    {
        $data = JenisJangkaWaktu::findOrFail($id);
        return new JenisJangkaWaktuResource($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'jenisJangkaWaktu' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $data = JenisJangkaWaktu::findOrFail($id);
        $data->update([
            'jenisJangkaWaktu' => $request->jenisJangkaWaktu,
            'keterangan' => $request->keterangan,
        ]);

        return new JenisJangkaWaktuResource($data);
    }

    public function destroy($id)
    {
        $data = JenisJangkaWaktu::findOrFail($id);
        $data->update(['isDeleted' => true]);
        $data->delete(); // soft delete

        return response()->json(['message' => 'Data berhasil dihapus.']);
    }
}
