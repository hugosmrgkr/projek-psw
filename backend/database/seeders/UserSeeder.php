<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('user')->insert([
            'username'   => 'admin',
            'password'   => Hash::make('admin123'), // selalu hash password!
            'token'      => Str::random(60),
            'email'      => 'admin@gmail.com',
            'keterangan' => 'Administrator',
            'created_at' => now(),
            'updated_at' => now(),
            'isDeleted'  => false,
        ]);
    }
}
