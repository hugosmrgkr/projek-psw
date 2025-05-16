<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TarifObjekRetribusi;
use Illuminate\Http\Request;
use App\Http\Resources\TarifObjekRetribusiResource;
use Illuminate\Support\Facades\Validator;

class TarifObjekRetribusiController extends Controller
{
    public function index()
    {
        return TarifObjekRetribusiResource::collection(
            TarifObjekRetribusi::where('isDeleted', false)->get()
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idObjekRetribusi' => 'required|exists:objekRetribusi,idObjekRetribusi',
            'idJenisJangkaWaktu' => 'required|exists:jenisJangkaWaktu,idJenisJangkaWaktu',
            'tanggalDinilai' => 'required|date',
            'namaPenilai' => 'required|string|max:100',
            'nominalTarif' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tarif = TarifObjekRetribusi::create($request->all());

        return new TarifObjekRetribusiResource($tarif);
    }

    public function show($id)
    {
        $tarif = TarifObjekRetribusi::findOrFail($id);
        return new TarifObjekRetribusiResource($tarif);
    }

    public function update(Request $request, $id)
    {
        $tarif = TarifObjekRetribusi::findOrFail($id);
        $tarif->update($request->all());
        return new TarifObjekRetribusiResource($tarif);
    }

    public function destroy($id)
    {
        $tarif = TarifObjekRetribusi::findOrFail($id);
        $tarif->update(['isDeleted' => true]);
        return response()->json(['message' => 'Data deleted logically.']);
    }
}
