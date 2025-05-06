<?php
namespace App\Http\Controllers\Api;

use App\Models\JenisPermohonan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JenisPermohonanController extends Controller
{
    public function index()
    {
        return response()->json(JenisPermohonan::all());
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'jenisPermohonan' => 'required|string|max:255',
        'keterangan' => 'nullable|string',
    ]);

    $validated['parentId'] = null;
    $validated['createAt'] = now();
    $validated['updateAt'] = now();
    $validated['isDeleted'] = 0;

    return response()->json(JenisPermohonan::create($validated), 201);
}



    public function show($id)
    {
        return response()->json(JenisPermohonan::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $item = JenisPermohonan::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = JenisPermohonan::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}