<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Models\Album;
use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index(Request $request)
    {
        $albums = Album::select('id', 'artist_id', 'year', 'name', 'sales', 'updated_at')
            ->with('artist:id,code,name')
            ->when($request->has('search'), function ($query) use ($request) {
                $query->whereFullText('name', $request->search);
            })
            ->paginate(10);

        return Inertia::render('Album/Index', [
            'albums' => $albums,
        ]);
    }


    public function store(StoreAlbumRequest $request)
    {
        Album::create($request->validated());

        return redirect()->route('albums.index')
            ->with('success', 'Album created successfully.');
    }

    public function show(Album $album)
    {
        $album->load('artist:id,code,name');

        return Inertia::render('Album/Show', [
            'album' => $album,
        ]);
    }
    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $album->update($request->validated());

        return redirect()->route('albums.index')
            ->with('success', 'Album updated successfully.');
    }

    public function delete(Album $album)
    {
        $album->delete();

        return redirect()->route('albums.index')
            ->with('success', 'Album deleted successfully.');
    }
}
