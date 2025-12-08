<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Models\Album;
use App\Traits\ApiResponse;

class AlbumController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $albums = Album::select('id', 'artist_id', 'year', 'name', 'sales', 'updated_at')->paginate(10);
        return $this->successResponse($albums, 'Albums fetched successfully');
    }

    public function store(StoreAlbumRequest $request)
    {
        $album = Album::create($request->validated());
        return $this->successResponse($album, 'Album created successfully', 201);
    }

    public function show(Album $album)
    {
        return $this->successResponse($album, 'Album fetched successfully');
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $album->update($request->validated());
        return $this->successResponse($album, 'Album updated successfully');
    }

    public function delete(Album $album)
    {
        $album->delete();
        return $this->successResponse(null, 'Album deleted successfully');
    }
}
