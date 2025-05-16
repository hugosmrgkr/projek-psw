<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ObjekRetribusiResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idObjekRetribusi' => $this->idObjekRetribusi,
            'kodeObjekRetribusi' => $this->kodeObjekRetribusi,
            'noBangunan' => $this->noBangunan,
            'jumlahLantai' => $this->jumlahLantai,
            'objekRetribusi' => $this->objekRetribusi,
            'panjangTanah' => $this->panjangTanah,
            'lebarTanah' => $this->lebarTanah,
            'luasTanah' => $this->luasTanah,
            'panjangBangunan' => $this->panjangBangunan,
            'lebarBangunan' => $this->lebarBangunan,
            'luasBangunan' => $this->luasBangunan,
            'alamat' => $this->alamat,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'keterangan' => $this->keterangan,
            'gambarDenahTanah' => $this->gambarDenahTanah,
            'lokasi' => $this->lokasi?->lokasiObjekRetribusi,
            'jenis' => $this->jenis?->jenisObjekRetribusi,
            'deleted_at' => $this->deleted_at,
        ];
    }
}

