<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LokasiObjekRetribusi extends Model
{
    protected $table = 'lokasiObjekRetribusi';
    protected $primaryKey = 'idLokasiObjekRetribusi';
    public $timestamps = false;
    protected $fillable = [
        'lokasiObjekRetribusi', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];
}
