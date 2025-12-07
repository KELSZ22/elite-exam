<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ArtistController extends Controller
{
    public function index(Request $request)
    {
        $artists = Artist::withCount('albums')
            ->when($request->filled('sort_order'), function ($query) use ($request) {
                $query->orderBy('name', $request->sort_order);
            }, function ($query) {
                $query->latest();
            })
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
        $data = $request->validated();
        unset($data['image']);

        $artist = Artist::create($data);

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs(
                "artists/{$artist->id}",
                $filename,
                'public'
            );
            $artist->update(['image' => $path]);
        }

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
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($artist->image) {
                Storage::disk('public')->deleteDirectory("artists/{$artist->id}");
            }
            $filename = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs(
                "artists/{$artist->id}",
                $filename,
                'public'
            );
            $data['image'] = $path;
        }

        $artist->update($data);

        return redirect()->route('artists.index')
            ->with('success', 'Artist updated successfully.');
    }

    public function delete(Artist $artist)
    {
        if ($artist->image) {
            Storage::disk('public')->deleteDirectory("artists/{$artist->id}");
        }

        $artist->delete();

        return redirect()->route('artists.index')
            ->with('success', 'Artist deleted successfully.');
    }
}
