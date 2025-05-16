<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    // Menampilkan semua data user
public function index()
{
    $users = User::all();
    return UserResource::collection($users);
}

public function trashed()
{
    $trashedUsers = User::onlyTrashed()->get();
    return UserResource::collection($trashedUsers);
}

public function store(Request $request)
{
    // Validasi dan create seperti sebelumnya...
    $user = User::create([
        'username' => $request->username,
        'password' => bcrypt($request->password),
        'email'    => $request->email,
        'keterangan' => $request->keterangan,
    ]);

    return new UserResource($user);
}

public function show($id)
{
    $user = User::findOrFail($id);
    return new UserResource($user);
}

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);
    $user->update([
        'username' => $request->username,
        'password' => $request->password ? bcrypt($request->password) : $user->password,
        'email'    => $request->email,
        'keterangan' => $request->keterangan,
    ]);

    return new UserResource($user);
}

public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'User berhasil dihapus']);
}

public function restore($id)
{
    $user = User::onlyTrashed()->findOrFail($id);
    $user->restore();

    return new UserResource($user);
}

public function forceDelete($id)
{
    $user = User::onlyTrashed()->findOrFail($id);
    $user->forceDelete();

    return response()->json(['message' => 'User dihapus permanen']);
}
}
