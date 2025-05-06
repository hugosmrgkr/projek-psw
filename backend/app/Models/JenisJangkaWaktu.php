<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisJangkaWaktu extends Model
{
    protected $table = 'jenisJangkaWaktu';
    protected $primaryKey = 'idJenisJangkaWaktu';
    public $timestamps = false;
    protected $fillable = [
        'jenisJangkaWaktu', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];
}
