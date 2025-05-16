<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Jika user tidak ditemukan atau password tidak cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        // Tambahkan ini jika kamu ingin memastikan akun belum dihapus
        if ($user->isDeleted) {
            return response()->json(['message' => 'Akun ini sudah dihapus'], 403);
        }

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => bin2hex(random_bytes(32)) // Token dummy (bisa diganti JWT/Sanctum)
        ]);
    }
}
