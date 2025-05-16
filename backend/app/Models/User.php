<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use HasFactory, SoftDeletes; // Menambahkan trait SoftDeletes

    protected $table = 'user'; // Nama tabel (bisa disesuaikan jika diperlukan)
    protected $primaryKey = 'userId'; // Primary key

    protected $fillable = [
        'username',
        'password',
        'email',
        'keterangan',
        'isDeleted',
    ];

    protected $dates = ['deleted_at']; // Pastikan deleted_at dianggap sebagai tanggal
}
