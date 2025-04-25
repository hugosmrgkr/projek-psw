<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'username', 'password', 'email', 'keterangan', 'isDeleted', 'createdAt', 'updatedAt'
    ];


    protected $hidden = [
        'password', 'token',
    ];

    public $timestamps = true;
}
