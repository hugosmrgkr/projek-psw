<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JangkaWaktuSewa extends Model
{
    protected $table = 'jangkaWaktuSewa';
    protected $primaryKey = 'idJangkaWaktuSewa';
    public $timestamps = false;
    protected $fillable = [
        'idJenisJangkaWaktu', 'jangkaWaktu', 'keterangan', 'isDefault', 'createAt', 'updateAt', 'isDeleted'
    ];
}
