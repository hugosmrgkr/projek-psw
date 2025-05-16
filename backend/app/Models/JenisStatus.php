<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisStatus extends Model
{
    use SoftDeletes;

    protected $table = 'jenisStatus';
    protected $primaryKey = 'idJenisStatus';
    protected $fillable = [
        'jenisStatus', 'keterangan', 'isDeleted'
    ];
}
