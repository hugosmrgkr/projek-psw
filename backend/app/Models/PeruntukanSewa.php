<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeruntukanSewa extends Model
{
    protected $table = 'peruntukanSewa';
    protected $primaryKey = 'idPeruntukanSewa';
    public $timestamps = false;
    protected $fillable = [
        'namaPeruntukan', 'keterangan', 'createAt', 'updateAt', 'isDeleted'
    ];
}
