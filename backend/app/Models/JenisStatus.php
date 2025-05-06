<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisStatus extends Model
{
    protected $table = 'jenisStatus';
    protected $primaryKey = 'idJenisStatus';
    public $timestamps = false;
    protected $fillable = [
        'jenisStatus', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];
}