<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class DashboardController extends Controller
{
    use ApiResponse;

    public function stats()
    {
        $artistStats = $this->getArtistStats();
        $stats = [
            'total_artists' => $artistStats->count(),
            'total_albums' => $artistStats->sum('total_albums'),
            'total_sales' => $artistStats->sum('total_sales'),
        ];

        return $this->successResponse($stats, 'Dashboard statistics fetched successfully');
    }

    public function artists()
    {
        $artistStats = $this->getArtistStats();

        return $this->successResponse($artistStats, 'Artist statistics fetched successfully');
    }

    public function topArtist()
    {
        $artistStats = $this->getArtistStats();
        $topArtist = $artistStats->first();

        return $this->successResponse($topArtist, 'Top artist fetched successfully');
    }

    public function search(Request $request)
    {
        $request->validate([
            'artist_search' => ['required', 'string'],
        ]);

        $searchTerm = $request->artist_search;
        $searchedArtist = Artist::where('name', 'like', "%{$searchTerm}%")
            ->orWhere('code', 'like', "%{$searchTerm}%")
            ->first();

        if (!$searchedArtist) {
            return $this->successResponse([
                'artist' => null,
                'albums' => collect(),
            ], 'No artist found');
        }

        $searchedAlbums = $searchedArtist->albums()
            ->with('artist:id,name,code')
            ->orderByDesc('sales')
            ->get();

        return $this->successResponse([
            'artist' => $searchedArtist,
            'albums' => $searchedAlbums,
        ], 'Search results fetched successfully');
    }

    public function allArtists()
    {
        $allArtists = Artist::select('id', 'name', 'code')
            ->orderBy('name')
            ->get();

        return $this->successResponse($allArtists, 'All artists fetched successfully');
    }

    private function getArtistStats(): Collection
    {
        return Artist::withCount('albums')
            ->withSum('albums', 'sales')
            ->orderByDesc('albums_sum_sales')
            ->get()
            ->map(function ($artist) {
                return [
                    'id' => $artist->id,
                    'code' => $artist->code,
                    'name' => $artist->name,
                    'image' => $artist->image,
                    'total_albums' => $artist->albums_count ?? 0,
                    'total_sales' => (float) ($artist->albums_sum_sales ?? 0),
                ];
            });
    }
}

