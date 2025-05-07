<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JangkaWaktuSewa;
use Illuminate\Http\Request;

class JangkaWaktuSewaController extends Controller
{
    public function index()
    {
        // Mengambil data yang belum dihapus (isDeleted = 0)
        return JangkaWaktuSewa::where('isDeleted', 0)->get();
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'idJenisJangkaWaktu' => 'required|integer',
                'jangkaWaktu' => 'required|string',
                'keterangan' => 'nullable|string',
                'isDefault' => 'nullable|boolean',
            ]);
    
            $data['createAt'] = now();
            $data['updateAt'] = now();
            $data['isDeleted'] = 0;
    
            $jangka = JangkaWaktuSewa::create($data);
            return response()->json($jangka, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menyimpan data.', 'detail' => $e->getMessage()], 500);
        }
    }
    

    public function show($id)
    {
        // Menampilkan data berdasarkan ID dan memeriksa isDeleted
        return JangkaWaktuSewa::where('idJangkaWaktuSewa', $id)
            ->where('isDeleted', 0) // Menyaring data yang tidak dihapus
            ->firstOrFail(); // Jika tidak ditemukan, akan mengembalikan 404
    }

    public function update(Request $request, $id)
    {
        // Menemukan data berdasarkan ID
        $jangka = JangkaWaktuSewa::where('idJangkaWaktuSewa', $id)->firstOrFail();

        // Validasi data yang diterima
        $data = $request->validate([
            'idJenisJangkaWaktu' => 'sometimes|required|integer',
            'jangkaWaktu' => 'sometimes|required|string',
            'keterangan' => 'nullable|string',
            'isDefault' => 'nullable|boolean', // validasi nullable untuk isDefault
        ]);

        // Pastikan kita tidak mengubah 'isDeleted'
        if (isset($data['isDeleted'])) {
            unset($data['isDeleted']); // Jangan biarkan isDeleted berubah
        }

        // Menambahkan waktu update
        $data['updateAt'] = now();

        // Update data
        $jangka->update($data);

        // Mengembalikan data yang telah diperbarui
        return response()->json($jangka, 200); // Response OK
    }

    public function destroy($id)
    {
        // Menemukan data berdasarkan ID
        $jangka = JangkaWaktuSewa::where('idJangkaWaktuSewa', $id)->firstOrFail();

        // Soft delete: set isDeleted = 1 dan update waktu
        $jangka->update([
            'isDeleted' => 1,
            'updateAt' => now(),
        ]);

        // Mengembalikan response dengan status 204 (No Content) setelah berhasil dihapus
        return response()->noContent(); 
    }
}
