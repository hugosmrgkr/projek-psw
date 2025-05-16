<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PeruntukanSewaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idPeruntukanSewa' => $this->idPeruntukanSewa,
            'jenisKegiatan' => $this->jenisKegiatan,
            'peruntukanSewa' => $this->peruntukanSewa,
            'keterangan' => $this->keterangan,
        ];
    }
}
