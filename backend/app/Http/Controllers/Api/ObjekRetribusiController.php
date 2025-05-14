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
        $data = $request->validate([
            'no_bangunan' => 'nullable|string',
            'jumlah_lantai' => 'nullable|integer',
            'panjang_tanah' => 'nullable|numeric',
            'lebar_tanah' => 'nullable|numeric',
            'luas_tanah' => 'nullable|numeric',
            'panjang_bangunan' => 'nullable|numeric',
            'lebar_bangunan' => 'nullable|numeric',
            'luas_bangunan' => 'nullable|numeric',
            'alamat' => 'required|string', // Alamat wajib diisi
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'gambar_denah_tanah' => 'nullable|string',
        ]);

        // Menambahkan kolom yang tidak ada di input form
        // $data['created_at'] = now();
        // $data['updated_at'] = now();
        $data['is_deleted'] = 0;

        try {
            // Membuat data baru di tabel ObjekRetribusi
            $objek = ObjekRetribusi::create($data);

            // Mengembalikan response sukses dengan data yang baru saja dibuat
            return response()->json([
                'message' => 'Objek Retribusi berhasil dibuat.',
                'data' => $objek
            ], 201); // Status code 201 Created
        } catch (\Exception $e) {
            // Menangani error jika terjadi kesalahan saat proses penyimpanan
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data.',
                'error' => $e->getMessage()
            ], 500); // Status code 500 Internal Server Error
        }
    }


    public function show($id)
    {
        try {
            $objek = ObjekRetribusi::where('id_objek_retribusi', $id)
                ->where('is_deleted', 0)
                ->firstOrFail();

            return response()->json($objek);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Objek Retribusi tidak ditemukan.',
                'error' => 'Data dengan ID ' . $id . ' tidak ditemukan.'
            ], 404);
        }
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
            $objek = ObjekRetribusi::where('id_objek_retribusi', $id)
                ->where('is_deleted', 0)
                ->firstOrFail();
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
        try {
            $objek = ObjekRetribusi::where('id_objek_retribusi', $id)
                ->where('is_deleted', 0)
                ->firstOrFail();

            $objek->is_deleted = 1;
            $objek->save();

            return response()->json(['message' => 'Objek retribusi berhasil dihapus (soft delete)']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Objek Retribusi tidak ditemukan.',
                'error' => 'Data dengan ID ' . $id . ' tidak ditemukan.'
            ], 404);
        }
    }



}
