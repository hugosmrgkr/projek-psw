<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PeruntukanSewa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'peruntukanSewa';

    protected $primaryKey = 'idPeruntukanSewa';

    protected $fillable = [
        'jenisKegiatan',
        'peruntukanSewa',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];
}