<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ObjekRetribusiController extends Controller
{
    public function index()
    {
        // Mengambil semua objek retribusi yang belum dihapus (isDeleted = 0)
        return ObjekRetribusi::where('is_deleted', 0)->get();
    }

    public function store(Request $request)
    {
        // Validasi data yang diterima dari frontend
        try {
            $data = $request->validate([
                // Menghapus validasi untuk id_lokasi_objek_retribusi, id_jenis_objek_retribusi, kode_objek_retribusi, dan objek_retribusi
                'no_bangunan' => 'nullable|string',
                'jumlah_lantai' => 'nullable|integer',
                'panjang_tanah' => 'nullable|numeric',
                'lebar_tanah' => 'nullable|numeric',
                'luas_tanah' => 'nullable|numeric',
                'panjang_bangunan' => 'nullable|numeric',
                'lebar_bangunan' => 'nullable|numeric',
                'luas_bangunan' => 'nullable|numeric',
                'alamat' => 'required|string',
                'latitude' => 'nullable|string',
                'longitude' => 'nullable|string',
                'keterangan' => 'nullable|string',
                'gambar_denah_tanah' => 'nullable|string',
            ]);

            // Menambahkan kolom yang tidak ada di input form
            $data['created_at'] = now();
            $data['updated_at'] = now();
            $data['is_deleted'] = 0;

            // Membuat data baru di tabel ObjekRetribusi
            return ObjekRetribusi::create($data);
        } catch (ValidationException $e) {
            // Menangani error validasi jika ada field yang tidak valid
            return response()->json([
                'message' => 'Data yang dikirim tidak valid.',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function show($id)
    {
        // Menampilkan data objek retribusi berdasarkan ID
        $objek = ObjekRetribusi::where('id_objek_retribusi', $id)
            ->where('is_deleted', 0)
            ->firstOrFail();

        return response()->json($objek);
    }

    public function update(Request $request, $id)
    {
        // Validasi data yang diterima dari frontend
        try {
            $data = $request->validate([
                // Menghapus validasi untuk id_lokasi_objek_retribusi, id_jenis_objek_retribusi, kode_objek_retribusi, dan objek_retribusi
                'no_bangunan' => 'nullable|string',
                'jumlah_lantai' => 'nullable|integer',
                'panjang_tanah' => 'nullable|numeric',
                'lebar_tanah' => 'nullable|numeric',
                'luas_tanah' => 'nullable|numeric',
                'panjang_bangunan' => 'nullable|numeric',
                'lebar_bangunan' => 'nullable|numeric',
                'luas_bangunan' => 'nullable|numeric',
                'alamat' => 'required|string',
                'latitude' => 'nullable|string',
                'longitude' => 'nullable|string',
                'keterangan' => 'nullable|string',
                'gambar_denah_tanah' => 'nullable|string',
            ]);

            // Update timestamp
            $data['updated_at'] = now();

            // Mencari objek retribusi berdasarkan ID dan memperbarui datanya
            $objek = ObjekRetribusi::where('id_objek_retribusi', $id)->firstOrFail();
            $objek->update($data);

            return response()->json($objek);
        } catch (ValidationException $e) {
            // Menangani error validasi jika ada field yang tidak valid
            return response()->json([
                'message' => 'Data yang dikirim tidak valid.',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function destroy($id)
    {
        // Mencari objek retribusi berdasarkan ID dan mengubah status is_deleted menjadi 1
        $objek = ObjekRetribusi::where('id_objek_retribusi', $id)->firstOrFail();
        $objek->update([
            'is_deleted' => 1,
            'updated_at' => now(),
        ]);

        return response()->noContent();
    }
}
