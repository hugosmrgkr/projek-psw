<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Status extends Model
{
    use SoftDeletes;

    protected $table = 'status';
    protected $primaryKey = 'idStatus';

    protected $fillable = [
        'idJenisStatus',
        'namaStatus',
        'keterangan',
        'isDeleted',
    ];

    public function jenisStatus()
    {
        return $this->belongsTo(JenisStatus::class, 'idJenisStatus', 'idJenisStatus');
    }
}
