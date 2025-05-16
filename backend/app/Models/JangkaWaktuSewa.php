<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JangkaWaktuSewa extends Model
{
    use SoftDeletes;

    protected $table = 'jangkaWaktuSewa';
    protected $primaryKey = 'idJangkaWaktuSewa';

    protected $fillable = [
        'idJenisJangkaWaktu',
        'jangkaWaktuSewa',
        'keterangan',
        'isDefault',
        'isDeleted'
    ];

    public function jenisJangkaWaktu()
    {
        return $this->belongsTo(JenisJangkaWaktu::class, 'idJenisJangkaWaktu', 'idJenisJangkaWaktu');
    }
}
