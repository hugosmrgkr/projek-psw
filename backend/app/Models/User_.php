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
}
