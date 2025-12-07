<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $artistStats = Artist::select([
                'artists.id',
                'artists.code',
                'artists.name',
                'artists.image',
                DB::raw('COUNT(albums.id) as total_albums'),
                DB::raw('COALESCE(SUM(albums.sales), 0) as total_sales')
            ])
            ->leftJoin('albums', function ($join) {
                $join->on('artists.id', '=', 'albums.artist_id')
                     ->whereNull('albums.deleted_at');
            })
            ->groupBy('artists.id', 'artists.code', 'artists.name', 'artists.image')
            ->orderByDesc('total_sales')
            ->get();

        $topArtist = $artistStats->first();

        $searchedAlbums = collect();
        $searchedArtist = null;
        
        if ($request->filled('artist_search')) {
            $searchTerm = $request->artist_search;
            
            $searchedArtist = Artist::where('name', 'like', "%{$searchTerm}%")
                ->orWhere('code', 'like', "%{$searchTerm}%")
                ->first();
            
            if ($searchedArtist) {
                $searchedAlbums = Album::where('artist_id', $searchedArtist->id)
                    ->with('artist:id,name,code')
                    ->orderByDesc('sales')
                    ->get();
            }
        }

        $allArtists = Artist::select('id', 'name', 'code')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/dashboard-page', [
            'artistStats' => $artistStats,
            'topArtist' => $topArtist,
            'searchedAlbums' => $searchedAlbums,
            'searchedArtist' => $searchedArtist,
            'allArtists' => $allArtists,
            'filters' => [
                'artist_search' => $request->artist_search,
            ],
        ]);
    }
}

