<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Models\Artist;
use App\Traits\ApiResponse;

class ArtistController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $artists = Artist::with(['albums:id,artist_id,year,name,sales,updated_at'])->paginate(10);
        return $this->successResponse($artists, 'Artists fetched successfully');
    }

    public function store(StoreArtistRequest $request)
    {
        $artist = Artist::create($request->validated());
        return $this->successResponse($artist, 'Artist created successfully', 201);
    }

    public function show(Artist $artist)
    {
        $artistWithAlbums = $artist->with('albums:id,artist_id,year,name,sales,updated_at')->get();
        return $this->successResponse($artistWithAlbums, 'Artist fetched successfully');
    }

    public function update(UpdateArtistRequest $request, Artist $artist)
    {
        $artist->update($request->validated());
        return $this->successResponse($artist, 'Artist updated successfully');
    }

    public function delete(Artist $artist)
    {
        $artist->delete();
        return $this->successResponse(null, 'Artist deleted successfully');
    }
}
