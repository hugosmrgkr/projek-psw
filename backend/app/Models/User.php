<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, SoftDeletes;

    protected $table = 'user'; // Tabel kamu
    protected $primaryKey = 'userId'; // Primary key kamu

    protected $fillable = [
        'username',
        'password',
        'email',
        'keterangan',
    ];

    protected $hidden = [
        'password', // Jangan bocorkan password di response
    ];

    protected $dates = ['deleted_at'];
}
