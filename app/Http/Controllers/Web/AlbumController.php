<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Models\Album;
use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AlbumController extends Controller
{

    public function index(Request $request)
    {
        $albums = Album::select('id', 'artist_id', 'image', 'year', 'name', 'sales', 'updated_at', 'created_at')
            ->with('artist:id,code,name')
            ->orderBy('name', $request->get('sort_order', 'asc'))
            ->latest()
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhereHas('artist', function ($artistQuery) use ($search) {
                          $artistQuery->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->simplePaginate(12)
            ->withQueryString();

        $artists = Artist::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('albums/album-page', [
            'albums' => $albums,
            'artists' => $artists,
        ]);
    }


    public function store(StoreAlbumRequest $request)
    {
        $data = $request->validated();
        unset($data['image']);

        $album = Album::create($data);

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs(
                "albums/{$album->id}",
                $filename,
                'public'
            );
            $album->update(['image' => $path]);
        }

        return redirect()->route('albums.index')
            ->with('success', 'Album created successfully.');
    }

    public function show(Album $album)
    {
        $album->load('artist:id,code,name');

        return Inertia::render('albums/album-show', [
            'album' => $album,
        ]);
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image directory if exists
            if ($album->image) {
                Storage::disk('public')->deleteDirectory("albums/{$album->id}");
            }
            $filename = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs(
                "albums/{$album->id}",
                $filename,
                'public'
            );
            $data['image'] = $path;
        }

        $album->update($data);

        return redirect()->route('albums.index')
            ->with('success', 'Album updated successfully.');
    }

    public function delete(Album $album)
    {
        // Delete image directory if exists
        if ($album->image) {
            Storage::disk('public')->deleteDirectory("albums/{$album->id}");
        }

        $album->delete();

        return redirect()->route('albums.index')
            ->with('success', 'Album deleted successfully.');
    }
}
