<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Models\Artist;
use Inertia\Inertia;


class ArtistController extends Controller
{
    public function index()
    {
        $artists = Artist::with(['albums:id,artist_id,year,name,sales,updated_at'])
            ->paginate(10);

        return Inertia::render('artists/artist-page', [
            'artists' => $artists,
        ]);
    }
    public function store(StoreArtistRequest $request)
    {
        Artist::create($request->validated());

        return redirect()->route('artists.index')
            ->with('success', 'Artist created successfully.');
    }

    public function show(Artist $artist)
    {
        $artist->load('albums:id,artist_id,year,name,sales,updated_at');

        return Inertia::render('Artist/Show', [
            'artist' => $artist,
        ]);
    }
    public function update(UpdateArtistRequest $request, Artist $artist)
    {
        $artist->update($request->validated());

        return redirect()->route('artists.index')
            ->with('success', 'Artist updated successfully.');
    }

    public function delete(Artist $artist)
    {
        $artist->delete();

        return redirect()->route('artists.index')
            ->with('success', 'Artist deleted successfully.');
    }
}
