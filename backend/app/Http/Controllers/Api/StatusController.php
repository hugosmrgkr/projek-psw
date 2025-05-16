<?php

namespace App\Http\Controllers\Api;

use App\Models\Status;
use App\Http\Controllers\Controller;
use App\Http\Resources\StatusResource;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function index()
    {
        $data = Status::with('jenisStatus')->where('isDeleted', false)->get();
        return StatusResource::collection($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idJenisStatus' => 'required|exists:jenisStatus,idJenisStatus',
            'namaStatus' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $status = Status::create($request->all());

        return new StatusResource($status->load('jenisStatus'));
    }

    public function show($id)
    {
        $status = Status::with('jenisStatus')->findOrFail($id);
        return new StatusResource($status);
    }

    public function update(Request $request, $id)
    {
        $status = Status::findOrFail($id);

        $request->validate([
            'idJenisStatus' => 'required|exists:jenisStatus,idJenisStatus',
            'namaStatus' => 'required|string|max:100',
            'keterangan' => 'nullable|string',
        ]);

        $status->update($request->all());

        return new StatusResource($status->load('jenisStatus'));
    }

    public function destroy($id)
    {
        $status = Status::findOrFail($id);
        $status->update(['isDeleted' => true]);
        $status->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
