<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ArtistController extends Controller
{
    public function index(Request $request)
    {
        $artists = Artist::withCount('albums')
            ->orderBy('name', $request->get('sort_order', 'asc'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->paginate(10)
            ->withQueryString();

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
        $artist->with('albums:id,artist_id,year,name,sales,updated_at')->get();

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
