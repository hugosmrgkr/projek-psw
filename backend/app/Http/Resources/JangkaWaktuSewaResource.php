<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JangkaWaktuSewaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idJangkaWaktuSewa' => $this->idJangkaWaktuSewa,
            'idJenisJangkaWaktu' => $this->idJenisJangkaWaktu,
            'jangkaWaktuSewa' => $this->jangkaWaktuSewa,
            'keterangan' => $this->keterangan,
            'isDefault' => $this->isDefault,
            'isDeleted' => $this->isDeleted,
            'created_at' => $this->created_at,
        ];
    }
}
