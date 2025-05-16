<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarifObjekRetribusi extends Model
{
    use HasFactory;

    protected $table = 'tarifObjekRetribusi';
    protected $primaryKey = 'idTarifObjekRetribusi';

    protected $fillable = [
        'idObjekRetribusi',
        'idJenisJangkaWaktu',
        'tanggalDinilai',
        'namaPenilai',
        'nominalTarif',
        'fileTarif',
        'keterangan',
        'fileHasilPenilaian',
        'isDefault',
        'isDeleted'
    ];

    public function objekRetribusi()
    {
        return $this->belongsTo(ObjekRetribusi::class, 'idObjekRetribusi');
    }

    public function jenisJangkaWaktu()
    {
        return $this->belongsTo(JenisJangkaWaktu::class, 'idJenisJangkaWaktu');
    }
}
