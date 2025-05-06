<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        // Cari user berdasarkan username dan pastikan tidak terhapus
        $user = User::where('username', $request->username)
                    ->where('isDeleted', false)
                    ->first();

        // Cek jika user ditemukan dan password cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Username atau Password salah'
            ], 401);
        }

        // Hapus token lama jika ada (opsional jika menggunakan token manual)
        $user->token = bin2hex(random_bytes(40));
        $user->save();

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $user->token,
            'username' => $user->username
        ]);
    }
}
