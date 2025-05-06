<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_ extends Model
{
    protected $table = 'user_';
    protected $primaryKey = 'userId';
    public $timestamps = false;

    protected $fillable = [
        'idUserRole', 'idPersonal', 'username', 'password_', 'token', 'email', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];

    // Method ini untuk memberi tahu Laravel tentang kolom password yang digunakan untuk autentikasi
    public function getAuthPassword()
    {
        return $this->password_; // Menggunakan kolom password_ untuk login
    }
}
