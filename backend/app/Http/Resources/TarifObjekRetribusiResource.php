<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TarifObjekRetribusiResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idTarifObjekRetribusi' => $this->idTarifObjekRetribusi,
            'idObjekRetribusi' => $this->idObjekRetribusi,
            'idJenisJangkaWaktu' => $this->idJenisJangkaWaktu,
            'tanggalDinilai' => $this->tanggalDinilai,
            'namaPenilai' => $this->namaPenilai,
            'nominalTarif' => $this->nominalTarif,
            'fileTarif' => $this->fileTarif,
            'keterangan' => $this->keterangan,
            'fileHasilPenilaian' => $this->fileHasilPenilaian,
            'isDefault' => $this->isDefault,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
