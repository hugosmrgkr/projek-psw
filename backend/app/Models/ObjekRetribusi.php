<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ObjekRetribusi extends Model
{

    use SoftDeletes;

    protected $table = 'objekRetribusi';
    protected $primaryKey = 'idObjekRetribusi';

    protected $fillable = [
        'idLokasiObjekRetribusi',
        'idJenisObjekRetribusi',
        'kodeObjekRetribusi',
        'noBangunan',
        'jumlahLantai',
        'objekRetribusi',
        'panjangTanah',
        'lebarTanah',
        'luasTanah',
        'panjangBangunan',
        'lebarBangunan',
        'luasBangunan',
        'alamat',
        'latitude',
        'longitude',
        'keterangan',
        'gambarDenahTanah',
        'isDeleted',
    ];

    protected $casts = [
        'isDeleted' => 'boolean',
    ];

    public function lokasi()
    {
        return $this->belongsTo(LokasiObjekRetribusi::class, 'idLokasiObjekRetribusi');
    }

    public function jenis()
    {
        return $this->belongsTo(JenisObjekRetribusi::class, 'idJenisObjekRetribusi');
    }
}
