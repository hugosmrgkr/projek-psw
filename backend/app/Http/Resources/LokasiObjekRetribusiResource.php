<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LokasiObjekRetribusiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'idLokasiObjekRetribusi' => $this->idLokasiObjekRetribusi,
            'lokasiObjekRetribusi' => $this->lokasiObjekRetribusi,
            'keterangan' => $this->keterangan,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
