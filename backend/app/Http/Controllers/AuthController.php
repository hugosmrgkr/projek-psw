<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Akun hardcoded
        $validEmail = 'admintobalink@gmail.com';
        $hashedPassword = '$2y$10$1/XM8D4dqbRQ1KuoLbZMVOjy6.guiHeITxb1oBdU9nLEgi4t5WUGu'; // Hash untuk 'admin123'

        if ($request->email === $validEmail && Hash::check($request->password, $hashedPassword)) {
            return response()->json([
                'message' => 'Login berhasil',
                'token' => bin2hex(random_bytes(32)) // token dummy
            ]);
        }

        return response()->json(['message' => 'Email atau password salah'], 401);
    }
}
