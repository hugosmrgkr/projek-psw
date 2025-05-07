<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cek apakah sudah ada user admin
        $existingUser = DB::table('user_')->where('email', 'admin@gmail.com')->first();

        if (!$existingUser) {
            // Menentukan userId unik
            $userId = 1;
            while (DB::table('user_')->where('userId', $userId)->exists()) {
                $userId++;
            }

            DB::table('user_')->insert([
                'userId' => $userId,
                'idUserRole' => 1,
                'idPersonal' => 1,
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password_' => Hash::make('admin123'),
                'token' => null,
                'keterangan' => 'Admin',
                'isDeleted' => 0,
                'createAt' => now(),
                'updateAt' => now(),
            ]);
        }
    }
}
