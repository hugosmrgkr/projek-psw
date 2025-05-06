<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WajibRetribusi extends Model
{
    protected $table = 'wajibRetribusi';
    protected $primaryKey = 'idWajibRetribusi';
    public $timestamps = false;
    protected $fillable = [
        'idJenisWajibRetribusi', 'NIK', 'namaWajibRetribusi', 'pekerjaan', 'alamat', 'nomorPonsel', 'nomorWhatsapp',
        'email', 'idJenisRetribusi', 'fileFoto', 'createAt', 'updateAt', 'isDeleted'
    ];
}
