<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JangkaWaktuSewa;
use Illuminate\Http\Request;

class JangkaWaktuSewaController extends Controller
{
    public function index()
    {
        return JangkaWaktuSewa::where('isDeleted', 0)->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idJenisJangkaWaktu' => 'required|integer',
            'jangkaWaktu' => 'required|string',
            'keterangan' => 'nullable|string',
            'isDefault' => 'boolean',
        ]);

        $data['createAt'] = now();
        $data['updateAt'] = now();
        $data['isDeleted'] = 0;

        return JangkaWaktuSewa::create($data);
    }

    public function show($id)
    {
        return JangkaWaktuSewa::where('idJangkaWaktuSewa', $id)
                ->where('isDeleted', 0)
                ->firstOrFail();
    }

    public function update(Request $request, $id)
    {
        $jangka = JangkaWaktuSewa::where('idJangkaWaktuSewa', $id)->firstOrFail();

        $data = $request->validate([
            'idJenisJangkaWaktu' => 'sometimes|required|integer',
            'jangkaWaktu' => 'sometimes|required|string',
            'keterangan' => 'nullable|string',
            'isDefault' => 'boolean',
        ]);

        $data['updateAt'] = now();
        $jangka->update($data);

        return $jangka;
    }

    public function destroy($id)
    {
        $jangka = JangkaWaktuSewa::where('idJangkaWaktuSewa', $id)->firstOrFail();
        $jangka->update([
            'isDeleted' => 1,
            'updateAt' => now(),
        ]);

        return response()->json(['message' => 'Data soft deleted']);
    }
}
