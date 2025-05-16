<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StatusResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idStatus' => $this->idStatus,
            'idJenisStatus' => $this->idJenisStatus,
            'namaStatus' => $this->namaStatus,
            'keterangan' => $this->keterangan,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'jenisStatus' => $this->whenLoaded('jenisStatus'),
        ];
    }
}
