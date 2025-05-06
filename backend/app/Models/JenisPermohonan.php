<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPermohonan extends Model
{
    protected $table = 'jenisPermohonan';
    protected $primaryKey = 'idJenisPermohonan';
    public $timestamps = false; // karena kamu pakai `createAt` dan `updateAt`, bukan `created_at` dan `updated_at`

    protected $fillable = [
        'parentId',
        'jenisPermohonan',
        'keterangan',
        'createAt',
        'updateAt',
        'isDeleted'
    ];
}
