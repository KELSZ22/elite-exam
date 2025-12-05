<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Models\Album;

class AlbumController extends Controller
{
      public function index()
    {
        $albums = Album::select('id', 'artist_id', 'year', 'name', 'sales', 'updated_at')->paginate(10);;
        return response()->json([
            'success' => true,
            'message' => 'Albums fetched successfully',
            'data' => $albums
        ], 200);
    }

    public function store(StoreAlbumRequest $request)
    {
        $album = Album::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Album created successfully',
            'data' => $album
        ], 201);
    }

    public function show(Album $album)
    {
        return response()->json([
            'success' => true,
            'message' => 'Album fetched successfully',
            'data' => $album
        ], 200);
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $album->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Album updated successfully',
            'data' => $album
        ], 200);
    }

    public function delete(Album $album)
    {
        $album->delete();
        return response()->json([
            'success' => true,
            'message' => 'Album deleted successfully'
        ], 200);
    }
}
