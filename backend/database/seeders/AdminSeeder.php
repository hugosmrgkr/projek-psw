<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Cek apakah sudah ada user dengan email admin
        $existingUser = DB::table('user_')->where('email', 'admin@gmail.com')->first();
    
        // Jika belum ada, lakukan insert
        if (!$existingUser) {
            // Tentukan userId dengan angka yang kamu inginkan, misalnya 1
            $userId = 1;
    
            // Pastikan userId unik
            while (DB::table('user_')->where('userId', $userId)->exists()) {
                $userId++;
            }
    
            DB::table('user_')->insert([
                'userId' => $userId,  // Gunakan userId yang sudah dicek keunikannya
                'idUserRole' => 1,  // ID user role untuk admin
                'idPersonal' => 1,  // ID personal sesuai dengan data yang ada
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password_' => Hash::make('admin123'), // Password di-hash dengan Bcrypt
                'token' => null,  // Bisa kosong jika tidak diperlukan
                'keterangan' => 'Admin',
                'isDeleted' => 0,  // Status tidak dihapus
                'createAt' => now(),
                'updateAt' => now(),
            ]);
        }
    }
    }
