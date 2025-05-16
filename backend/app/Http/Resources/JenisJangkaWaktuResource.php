<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JenisJangkaWaktuResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idJenisJangkaWaktu' => $this->idJenisJangkaWaktu,
            'jenisJangkaWaktu' => $this->jenisJangkaWaktu,
            'keterangan' => $this->keterangan,
        ];
    }
}
