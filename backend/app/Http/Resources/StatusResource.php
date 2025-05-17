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
            'keterangan' => $this->keterangan ?? null,
            'isDeleted' => (bool) $this->isDeleted,
            'createdAt' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updatedAt' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,

            // Tampilkan relasi jenisStatus jika sudah diload
            'jenisStatus' => $this->whenLoaded('jenisStatus', function () {
                return [
                    'idJenisStatus' => $this->jenisStatus->idJenisStatus ?? null,
                    'namaJenisStatus' => $this->jenisStatus->namaJenisStatus ?? null,
                    // Tambahkan field lain yang relevan sesuai model jenisStatus
                ];
            }),
        ];
    }
}
