import React from "react";
import PropTypes from "prop-types";
import { SearchSelect, TableComponent } from "../../../components";
import {
    Users,
    Disc3,
    Music2,
    Calendar,
    TrendingUp,
    Headphones,
} from "lucide-react";
import { useCurrency } from "../../../hooks";

function AlbumSearchSection({
    allArtists,
    selectedArtistId,
    onArtistSelect,
    searchedArtist,
    searchedAlbums,
}) {
    const formatCurrency = useCurrency();

    const columns = [
        {
            key: "name",
            label: "Album",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Disc3 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                        {row.name}
                    </span>
                </div>
            ),
        },
        {
            key: "year",
            label: "Year",
            render: (value, row) => (
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary/70" />
                    <span className="text-muted-foreground">
                        {row.year || "N/A"}
                    </span>
                </div>
            ),
        },
        {
            key: "sales",
            label: "Sales",
            render: (value, row) => (
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary/70" />
                    <span className="font-medium text-primary">
                        {formatCurrency(row.sales)}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Music2 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                    Search Albums by Artist
                </h2>
            </div>
            <div className="mb-6">
                <SearchSelect
                    name="artist_search"
                    placeholder="Select an artist to view their albums..."
                    searchPlaceholder="Search artists..."
                    options={allArtists || []}
                    value={selectedArtistId}
                    onChange={onArtistSelect}
                    valueKey="id"
                    labelKey="name"
                />
            </div>

            {searchedArtist ? (
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">
                                {searchedArtist.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {searchedAlbums?.length || 0} album(s) found
                            </p>
                        </div>
                    </div>
                    <div className="rounded-xl border border-primary/20 overflow-hidden flex-1">
                        <TableComponent
                            columns={columns}
                            data={searchedAlbums || []}
                            emptyMessage="No albums found for this artist."
                        />
                    </div>
                </div>
            ) : selectedArtistId ? (
                <div className="flex-1">
                    <EmptyState icon={Users} message="Artist not found." />
                </div>
            ) : (
                <div className="flex-1">
                    <EmptyState
                        icon={Music2}
                        message="Select an artist above to view their albums."
                        dashed
                    />
                </div>
            )}
        </div>
    );
}

function EmptyState({ message, dashed = false }) {
    return (
        <div
            className={`flex flex-col items-center justify-center py-12 text-center h-full rounded-xl border bg-gradient-to-br from-background to-primary/5 ${
                dashed ? "border-dashed border-primary/30" : "border-primary/20"
            }`}
        >
            <Headphones className="w-12 h-12 text-primary/30 mb-3" />
            <p className="text-muted-foreground">{message}</p>
        </div>
    );
}

EmptyState.propTypes = {
    icon: PropTypes.elementType.isRequired,
    message: PropTypes.string.isRequired,
    dashed: PropTypes.bool,
};

AlbumSearchSection.propTypes = {
    allArtists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })
    ),
    selectedArtistId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onArtistSelect: PropTypes.func.isRequired,
    searchedArtist: PropTypes.shape({
        name: PropTypes.string,
    }),
    searchedAlbums: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
};

export default AlbumSearchSection;
