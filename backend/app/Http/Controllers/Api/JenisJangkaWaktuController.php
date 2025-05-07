<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisJangkaWaktu;
use Illuminate\Http\Request;

class JenisJangkaWaktuController extends Controller
{
    public function index()
    {
        return JenisJangkaWaktu::where('isDeleted', 0)->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'jenisJangkaWaktu' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $data['createAt'] = now();
        $data['updateAt'] = now();
        $data['isDeleted'] = 0;

        $created = JenisJangkaWaktu::create($data);

        return response()->json($created, 201);
    }

    public function show($id)
    {
        $item = JenisJangkaWaktu::where('idJenisJangkaWaktu', $id)
            ->where('isDeleted', 0)
            ->firstOrFail();

        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = JenisJangkaWaktu::where('idJenisJangkaWaktu', $id)->firstOrFail();

        $data = $request->validate([
            'jenisJangkaWaktu' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $data['updateAt'] = now();

        $item->update($data);

        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = JenisJangkaWaktu::where('idJenisJangkaWaktu', $id)->firstOrFail();
    
        // Menghapus data secara permanen
        $item->delete();
    
        return response()->json(['message' => 'Data berhasil dihapus'], 204);
    }
    
}
