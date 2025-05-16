<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JenisPermohonanResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->idJenisPermohonan,
            'jenisPermohonan' => $this->jenisPermohonan,
            'parentId' => $this->parentId,
            'keterangan' => $this->keterangan,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
