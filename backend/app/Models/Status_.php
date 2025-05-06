<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status_ extends Model
{
    protected $table = 'status_';
    protected $primaryKey = 'idStatus';
    public $timestamps = false;
    protected $fillable = [
        'idJenisStatus', 'namaStatus', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];
}
