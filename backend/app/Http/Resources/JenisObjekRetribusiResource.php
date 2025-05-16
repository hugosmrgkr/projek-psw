<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JenisObjekRetribusiResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idJenisObjekRetribusi' => $this->idJenisObjekRetribusi,
            'jenisObjekRetribusi' => $this->jenisObjekRetribusi,
            'keterangan' => $this->keterangan,
            'created_at' => $this->created_at,
        ];
    }
}
