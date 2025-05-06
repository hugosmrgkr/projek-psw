<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjekRetribusi extends Model
{
    protected $table = 'objekRetribusi';
    protected $primaryKey = 'idObjekRetribusi';
    public $timestamps = false;
    protected $fillable = [
        'idLokasiObjekRetribusi', 'idJenisObjekRetribusi', 'kodeObjekRetribusi', 'noBangunan', 'jumlahLantai',
        'objekRetribusi', 'panjangTanah', 'lebarTanah', 'luasTanah', 'panjangBangunan', 'lebarBangunan', 'luasBangunan',
        'alamat', 'latitude', 'longitude', 'keterangan', 'gambarDenahTanah', 'createAt', 'updateAt', 'isDeleted'
    ];
}
