<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JangkaWaktuSewa;
use Illuminate\Http\Request;
use App\Http\Resources\JangkaWaktuSewaResource;

class JangkaWaktuSewaController extends Controller
{
    public function index()
    {
        // Mengambil data Jangka Waktu Sewa yang tidak dihapus
        return JangkaWaktuSewaResource::collection(
            JangkaWaktuSewa::where('isDeleted', false)->get()
        );
    }

    public function store(Request $request)
    {
        // Validasi input
        $data = $request->validate([
            'idJenisJangkaWaktu' => 'required|exists:jenisJangkaWaktu,idJenisJangkaWaktu',  // Pastikan nama tabel sudah sesuai
            'jangkaWaktuSewa' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
            'isDefault' => 'nullable|boolean',  // Pastikan ini diterima sebagai boolean
        ]);

        // Menyimpan data ke dalam database
        $sewa = JangkaWaktuSewa::create($data);

        // Mengembalikan resource
        return new JangkaWaktuSewaResource($sewa);
    }

    public function show($id)
    {
        // Menampilkan data berdasarkan ID
        $sewa = JangkaWaktuSewa::findOrFail($id);
        return new JangkaWaktuSewaResource($sewa);
    }

    public function update(Request $request, $id)
    {
        // Mengambil data berdasarkan ID
        $sewa = JangkaWaktuSewa::findOrFail($id);

        // Validasi input update
        $data = $request->validate([
            'idJenisJangkaWaktu' => 'required|exists:jenisJangkaWaktu,idJenisJangkaWaktu',  // Pastikan nama tabel sudah sesuai
            'jangkaWaktuSewa' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
            'isDefault' => 'nullable|boolean',  // Pastikan ini diterima sebagai boolean
        ]);

        // Melakukan update data
        $sewa->update($data);

        // Mengembalikan resource
        return new JangkaWaktuSewaResource($sewa);
    }

    public function destroy($id)
    {
        // Menentukan data yang ingin dihapus
        $sewa = JangkaWaktuSewa::findOrFail($id);

        // Melakukan soft delete dengan mengubah status 'isDeleted' menjadi true
        $sewa->isDeleted = true;
        $sewa->save();
        $sewa->delete(); // Soft delete

        // Mengembalikan response JSON
        return response()->json(['message' => 'Berhasil dihapus (soft delete).']);
    }
}
