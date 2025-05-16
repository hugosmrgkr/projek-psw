<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WajibRetribusiResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idWajibRetribusi' => $this->idWajibRetribusi,
            'NIK' => $this->NIK,
            'namaWajibRetribusi' => $this->namaWajibRetribusi,
            'pekerjaan' => $this->pekerjaan,
            'alamat' => $this->alamat,
            'nomorPonsel' => $this->nomorPonsel,
            'nomorWhatsapp' => $this->nomorWhatsapp,
            'email' => $this->email,
            'idJenisRetribusi' => $this->idJenisRetribusi,
            'fileFoto' => $this->fileFoto,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
