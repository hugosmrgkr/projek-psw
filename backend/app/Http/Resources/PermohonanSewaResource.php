<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermohonanSewaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'idPermohonanSewa' => $this->idPermohonanSewa,
            'idJenisPermohonan' => $this->idJenisPermohonan,
            'nomorSuratPermohonan' => $this->nomorSuratPermohonan,
            'tanggalPengajuan' => $this->tanggalPengajuan,
            'namaPemohon' => $this->namaPemohon,
            'alamatPemohon' => $this->alamatPemohon,
            'idTarifObjekRetribusi' => $this->idTarifObjekRetribusi,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
