<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisObjekRetribusi extends Model
{
    protected $table = 'jenisObjekRetribusi';
    protected $primaryKey = 'idJenisObjekRetribusi';
    public $timestamps = false;
    protected $fillable = [
        'jenisObjekRetribusi', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];
}
