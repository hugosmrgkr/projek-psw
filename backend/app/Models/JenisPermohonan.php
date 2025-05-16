<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPermohonan extends Model
{
    protected $table = 'jenisPermohonan';
    protected $primaryKey = 'idJenisPermohonan';

    protected $fillable = [
        'parentId',
        'jenisPermohonan',
        'keterangan',
        'isDeleted'
    ];
}
