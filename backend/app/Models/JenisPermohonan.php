<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPermohonan extends Model
{
    protected $table = 'jenis_permohonan';
    protected $primaryKey = 'idJenisPermohonan';
    public $timestamps = false; // karena kamu pakai `createAt` dan `updateAt`, bukan `created_at` dan `updated_at`

    protected $fillable = [
        'parentId',
        'nama_jenis_permohonan',
        'keterangan',
        'createAt',
        'updateAt',
        'isDeleted'
    ];
}
