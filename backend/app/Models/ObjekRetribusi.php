<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ObjekRetribusi extends Model
{
    use HasFactory;

    protected $table = 'objek_retribusi';
    protected $primaryKey = 'id_objek_retribusi';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true; // created_at & updated_at otomatis terisi

    protected $fillable = [
        'id_lokasi_objek_retribusi',
        'id_jenis_objek_retribusi',
        'kode_objek_retribusi',
        'no_bangunan',
        'jumlah_lantai',
        'objek_retribusi',
        'panjang_tanah',
        'lebar_tanah',
        'luas_tanah',
        'panjang_bangunan',
        'lebar_bangunan',
        'luas_bangunan',
        'alamat',
        'latitude',
        'longitude',
        'keterangan',
        'gambar_denah_tanah',
        'is_deleted'
    ];

    // Global Scope untuk filter data yang belum dihapus
    protected static function booted()
    {
        static::addGlobalScope('non_deleted', function (Builder $query) {
            $query->where('is_deleted', 0);
        });
    }

    // Relasi ke lokasi
    public function lokasi()
    {
        return $this->belongsTo(LokasiObjekRetribusi::class, 'id_lokasi_objek_retribusi');
    }

    // Relasi ke jenis
    public function jenis()
    {
        return $this->belongsTo(JenisObjekRetribusi::class, 'id_jenis_objek_retribusi');
    }
}
