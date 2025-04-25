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
        DB::table('users')->insert([
            'username' => 'admin', // Username untuk admin
            'email' => 'admin@gmail.com', // Email admin
            'password' => Hash::make('admin123'), // Password yang sudah di-hash
            'keterangan' => 'Admin', // Keterangan
            'isDeleted' => 0, // Status isDeleted
            'created_at' => now(), // Waktu dibuat
            'updated_at' => now(),
        ]);
    }
}
