<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisStatus;
use Illuminate\Http\Request;

class JenisStatusController extends Controller
{
    public function index()
    {
        return JenisStatus::where('isDeleted', 0)->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'jenisStatus' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);
    
        $data['isDeleted'] = 0;
        $data['createAt'] = now(); // tambah ini!
        $data['updateAt'] = now(); // tambah ini!
    
        return JenisStatus::create($data);
    }
    

    public function show($id)
    {
        return JenisStatus::where('idJenisStatus', $id)->where('isDeleted', 0)->firstOrFail();
    }

    public function update(Request $request, $id)
    {
        $item = JenisStatus::where('idJenisStatus', $id)->firstOrFail();

        $data = $request->validate([
            'jenisStatus' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $data['updateAt'] = now();

        $item->update($data);

        return $item;
    }

    public function destroy($id)
    {
        $item = JenisStatus::where('idJenisStatus', $id)->firstOrFail();

        $item->update([
            'isDeleted' => 1,
            'updateAt' => now()
        ]);

        return response()->noContent();
    }
}