<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WajibRetribusi;
use App\Http\Resources\WajibRetribusiResource;
use Illuminate\Http\Request;

class WajibRetribusiController extends Controller
{
    public function index()
    {
        return WajibRetribusiResource::collection(WajibRetribusi::where('isDeleted', false)->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'NIK' => 'required|string|max:16',
            'namaWajibRetribusi' => 'required|string|max:255',
            'pekerjaan' => 'required|string|max:100',
            'alamat' => 'required|string',
            'nomorPonsel' => 'nullable|string|max:20',
            'nomorWhatsapp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'idJenisRetribusi' => 'nullable|integer',
            'fileFoto' => 'nullable|string',
        ]);

        $data = WajibRetribusi::create($validated);
        return new WajibRetribusiResource($data);
    }

    public function show($id)
    {
        $data = WajibRetribusi::findOrFail($id);
        return new WajibRetribusiResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = WajibRetribusi::findOrFail($id);
        $validated = $request->validate([
            'NIK' => 'required|string|max:16',
            'namaWajibRetribusi' => 'required|string|max:255',
            'pekerjaan' => 'required|string|max:100',
            'alamat' => 'required|string',
            'nomorPonsel' => 'nullable|string|max:20',
            'nomorWhatsapp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'idJenisRetribusi' => 'nullable|integer',
            'fileFoto' => 'nullable|string',
        ]);

        $data->update($validated);
        return new WajibRetribusiResource($data);
    }

    public function destroy($id)
    {
        $data = WajibRetribusi::findOrFail($id);
        $data->isDeleted = true;
        $data->save();

        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }
}
