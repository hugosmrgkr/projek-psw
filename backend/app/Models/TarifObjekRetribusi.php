<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarifObjekRetribusi extends Model
{
    protected $table = 'tarifObjekRetribusi';
    protected $primaryKey = 'idTarifObjekRetribusi';
    public $timestamps = false;
    protected $fillable = [
        'idObjekRetribusi', 'idJenisJangkaWaktu', 'tanggalDinilai', 'namaPenilai', 'nominalTarif',
        'floorHasilPenilaian', 'keterangan', 'isDefault', 'createAt', 'updateAt', 'isDeleted'
    ];
}
