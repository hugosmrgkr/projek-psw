<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermohonanSewa extends Model
{
    use HasFactory;

    protected $table = 'permohonanSewa';
    protected $primaryKey = 'idPermohonanSewa';

    protected $fillable = [
        'idJenisPermohonan',
        'nomorSuratPermohonan',
        'tanggalPengajuan',
        'namaPemohon',
        'alamatPemohon',
        'idTarifObjekRetribusi',
        'isDeleted',
    ];

    public function jenisPermohonan()
    {
        return $this->belongsTo(JenisPermohonan::class, 'idJenisPermohonan');
    }

    public function tarifObjekRetribusi()
    {
        return $this->belongsTo(TarifObjekRetribusi::class, 'idTarifObjekRetribusi');
    }
}
