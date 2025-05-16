<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Ubah data menjadi array yang bisa diubah ke JSON.
     */
    public function toArray(Request $request): array
    {
        return [
            'userId'     => $this->userId,
            'username'   => $this->username,
            'email'      => $this->email,
            'keterangan' => $this->keterangan,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
            'isDeleted'  => (bool) $this->isDeleted,
        ];
    }
}
