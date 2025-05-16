<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JenisStatusResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->idJenisStatus,
            'jenisStatus' => $this->jenisStatus,
            'keterangan' => $this->keterangan,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
