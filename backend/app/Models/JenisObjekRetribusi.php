<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisObjekRetribusi extends Model
{
    use SoftDeletes;

    protected $table = 'jenisObjekRetribusi';

    protected $primaryKey = 'idJenisObjekRetribusi';

    protected $fillable = [
        'jenisObjekRetribusi',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];
}
