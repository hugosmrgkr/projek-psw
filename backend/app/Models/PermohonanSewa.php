<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermohonanSewa extends Model
{
    protected $table = 'permohonanSewa';
    protected $primaryKey = 'idPermohonanSewa';
    public $timestamps = false;
    protected $fillable = [
        'idJenisPermohonan', 'nomorSuratPermohonan', 'tanggalPengajuan', 'idWajibRetribusi', 'idObjekRetribusi',
        'idJenisJangkaWaktu', 'lamaSewa', 'idPeruntukanSewa', 'idStatus', 'createBy', 'createAt', 'updateAt', 'isDeleted'
    ];
}
