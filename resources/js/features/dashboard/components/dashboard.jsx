import React, { useState, useEffect } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import { Users, Disc3, TrendingUp, BarChart3 } from "lucide-react";
import { PageHeader, DashboardSkeleton } from "../../../components";
import StatsCard from "./stats-card";
import TopArtistSpotlight from "./top-artist-spotlight";
import ArtistStatsTable from "./artist-stats-table";
import AlbumSearchSection from "./album-search-section";
import { useCurrency } from "../../../hooks";

function Dashboard() {
    const {
        artistStats,
        topArtist,
        searchedAlbums,
        searchedArtist,
        allArtists,
        filters,
    } = usePage().props;

    const formatCurrency = useCurrency();
    const [selectedArtistId, setSelectedArtistId] = useState(
        filters?.artist_search || ""
    );

    useEffect(() => {
        if (filters?.artist_search) {
            const artist = allArtists?.find(
                (a) =>
                    a.name
                        .toLowerCase()
                        .includes(filters.artist_search.toLowerCase()) ||
                    a.code
                        .toLowerCase()
                        .includes(filters.artist_search.toLowerCase())
            );
            if (artist) {
                setSelectedArtistId(artist.id);
            }
        }
    }, [filters?.artist_search, allArtists]);

    const handleArtistSelect = (artistId) => {
        setSelectedArtistId(artistId);

        if (artistId) {
            const artist = allArtists?.find((a) => a.id === artistId);
            if (artist) {
                router.get(
                    "/dashboard",
                    { artist_search: artist.name },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    }
                );
            }
        } else {
            router.get(
                "/dashboard",
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }
    };

    const formatSales = (sales) => formatCurrency(sales);
    const formatFullSales = (sales) => formatCurrency(sales);

    const totalArtists = artistStats?.length || 0;
    const totalAlbums =
        artistStats?.reduce(
            (sum, a) => sum + (parseInt(a.total_albums) || 0),
            0
        ) || 0;
    const totalSales =
        artistStats?.reduce(
            (sum, a) => sum + (parseFloat(a.total_sales) || 0),
            0
        ) || 0;

    if (!artistStats && !topArtist) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="container mx-auto px-4">
            <Head title="MuSync - Dashboard" />

            <PageHeader
                title="Dashboard"
                subtitle="Overview of your music catalog performance"
                icon={BarChart3}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatsCard
                    title="Total Artists"
                    value={totalArtists}
                    icon={Users}
                />
                <StatsCard
                    title="Total Albums"
                    value={totalAlbums}
                    icon={Disc3}
                />
                <StatsCard
                    title="Total Sales"
                    value={formatSales(totalSales)}
                    icon={TrendingUp}
                />
            </div>

            <TopArtistSpotlight
                artist={topArtist}
                formatFullSales={formatFullSales}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <AlbumSearchSection
                    allArtists={allArtists}
                    selectedArtistId={selectedArtistId}
                    onArtistSelect={handleArtistSelect}
                    searchedArtist={searchedArtist}
                    searchedAlbums={searchedAlbums}
                />

                <ArtistStatsTable
                    artistStats={artistStats}
                    formatSales={formatSales}
                />
            </div>
        </div>
    );
}

export default Dashboard;
