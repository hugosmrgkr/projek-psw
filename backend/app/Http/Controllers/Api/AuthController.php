<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User_;
use App\Http\Controllers\Controller; // <-- tambah ini

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
        $user = User_::where('username', $request->username)
                    ->where('isDeleted', false)
                    ->first();

        // Cek jika user ditemukan dan password cocok
        if (!$user || !Hash::check($request->password, $user->password_)) {
            return response()->json([
                'message' => 'Username atau Password salah'
            ], 401);
        }

        // Buat token baru
        $user->token = bin2hex(random_bytes(40));
        $user->save();

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $user->token,
            'username' => $user->username
        ]);
    }
}
