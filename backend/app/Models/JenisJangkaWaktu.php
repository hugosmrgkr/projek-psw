<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisJangkaWaktu extends Model
{
    use SoftDeletes;

    protected $table = 'jenisJangkaWaktu';

    protected $primaryKey = 'idJenisJangkaWaktu';

    protected $fillable = [
        'jenisJangkaWaktu',
        'keterangan',
        'isDeleted',
    ];
}
