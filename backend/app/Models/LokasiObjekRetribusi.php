<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LokasiObjekRetribusi extends Model
{
    use SoftDeletes;

    protected $table = 'lokasiObjekRetribusi';
    protected $primaryKey = 'idLokasiObjekRetribusi';

    protected $fillable = [
        'lokasiObjekRetribusi',
        'keterangan',
        'isDeleted'
    ];
}
