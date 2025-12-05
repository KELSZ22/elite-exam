<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Models\Artist;

class ArtistController extends Controller
{
     public function index()
    {
        $artists = Artist::with(['albums:id,artist_id,year,name,sales,updated_at'])->paginate(10);
        return response()->json([
            'success' => true,
            'message' => 'Artists fetched successfully',
            'data' => $artists
        ], 200);
    }
    public function store(StoreArtistRequest $request)
    {
        $artist = Artist::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Artist created successfully',
            'data' => $artist
        ], 201);
    }

    public function show(Artist $artist)
    {
        $artistWithAlbums = $artist->with('albums:id,artist_id,year,name,sales,updated_at')->get();

        return response()->json([
            'success' => true,
            'message' => 'Artist fetched successfully',
            'data' => $artistWithAlbums
        ], 200);
    }

    public function update(UpdateArtistRequest $request, Artist $artist)
    {
        $artist->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Artist updated successfully',
            'data' => $artist
        ], 200);
    }

    public function delete(Artist $artist)
    {
        $artist->delete();
        return response()->json([
            'success' => true,
            'message' => 'Artist deleted successfully'
        ], 200);
    }
}
